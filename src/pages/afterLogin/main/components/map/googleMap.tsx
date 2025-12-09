import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Markers from "./customMarker";
import ClusteredMarkers from "./markerCluster";
import UserMarker from "./userMarker";
// memo, useMemo, useCallback, useState, useEffect를 모두 import 합니다.
import { memo, useEffect, useMemo, useState, useCallback } from "react";
import type { Poi } from "../../../../../types/poi";
import MapCenter from "./mapCenterFunction";
import Polyline from "./mapPolyline";
import GetPillLocation from "../../../../../api/getPillLocations";
import { useMapStore } from "../../../../../store/store";
import { useShallow } from "zustand/shallow";

// 1. 가장 무거운 Map 컴포넌트를 React.memo로 감싸줍니다.
const MemoizedMap = memo(Map);

const SongDoBounds = {
  north: 37.427025044166236,
  south: 37.3411119498197,
  west: 126.58951155157007,
  east: 126.69771587807054,
};

export default function GoogleMap({}: {}) {
  // 상태 구독은 이미 최적화되어 있습니다. (Good!)
  const {
    likeLocation,
    selectedLocation,
    showPath,
    showLikedOnly,
    selectedCategory,
  } = useMapStore(
    useShallow((state) => ({
      likeLocation: state.likeLocation,
      selectedLocation: state.selectedLocation,
      showPath: state.showPath,
      showLikedOnly: state.showLikedOnly,
      selectedCategory: state.selectedCategory,
    }))
  );
  const {
    setIsInfoVisible,
    setIsCenter,
    setIsExperienceMode,
    setUserLocation,
  } = useMapStore();
  const userLocationForBounds = useMapStore((state) => state.userLocation);

  const [locations, setLocations] = useState<Poi[]>([]);
  const [isInBoundary, setIsInBoundary] = useState(true);

  const displayPois = useMemo(() => {
    const filteredLocations =
      selectedCategory === "whole"
        ? locations
        : locations.filter((loc) => loc.category === selectedCategory);
    return showLikedOnly ? likeLocation ?? [] : filteredLocations;
  }, [showLikedOnly, likeLocation, locations, selectedCategory]);

  // 2. Map에 전달할 객체 props들을 useMemo로 메모이제이션합니다.
  // 의존성이 없으므로(빈 배열 []), 최초 렌더링 시 단 한 번만 생성됩니다.
  const mapStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const mapRestriction = useMemo(
    () => ({
      latLngBounds: SongDoBounds,
      strictBounds: false,
    }),
    []
  );

  // 3. Map에 전달할 함수 props들을 useCallback으로 메모이제이션합니다.
  const handleMapClick = useCallback(() => {
    setIsInfoVisible(false);
  }, [setIsInfoVisible]);
  const handleMapDrag = useCallback(() => {
    setIsCenter(false);
  }, [setIsCenter]);

  // 체험모드 관련 함수들도 useCallback으로 감싸면 더 안정적입니다.
  const setExperience = useCallback(() => {
    setIsExperienceMode(true);
    setUserLocation({ lat: 37.386196, lng: 126.639404 });
  }, [setIsExperienceMode, setUserLocation]);
  const exitExperience = useCallback(() => {
    setIsExperienceMode(false);
  }, [setIsExperienceMode]);

  useEffect(() => {
    setLocations(GetPillLocation() as Poi[]);
  }, []);

  useEffect(() => {
    const loc = userLocationForBounds;
    const isOutOfBounds =
      loc.lat > SongDoBounds.north ||
      loc.lat < SongDoBounds.south ||
      loc.lng < SongDoBounds.west ||
      loc.lng > SongDoBounds.east;
    setIsInBoundary(!isOutOfBounds);
  }, [userLocationForBounds]);

  if (userLocationForBounds.lat === 0 && userLocationForBounds.lng === 0) {
    return <div>...위치 정보를 불러오는 중입니다...</div>;
  }

  if (!isInBoundary) {
    return (
      <div className="bg-gray-500 h-full flex flex-col items-center justify-center text-white">
        <p>서비스 지역을 벗어났습니다.</p>
        <p>송도 지역으로 진입하시면 정상적으로 이용하실 수 있습니다.</p>
        <button
          className="bg-[#0088FF] w-28 py-2 rounded-lg mt-4"
          onClick={setExperience}
        >
          체험해보기
        </button>
      </div>
    );
  } else {
    return (
      <>
        <div className="absolute w-full z-50 flex justify-center">
          <button
            className="bg-[#19824f] w-36 h-10 rounded-lg text-white"
            onClick={exitExperience}
          >
            체험종료
          </button>
        </div>
        <APIProvider
          apiKey={import.meta.env.VITE_PUBLIC_MAP_KEY}
          libraries={["marker"]}
        >
          <MemoizedMap
            mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
            style={mapStyle}
            defaultCenter={userLocationForBounds}
            defaultZoom={17}
            gestureHandling="greedy"
            disableDefaultUI
            onClick={handleMapClick}
            onDrag={handleMapDrag}
            restriction={mapRestriction}
          >
            <MapCenter />
            {showPath && (
              <Polyline
                origin={userLocationForBounds}
                destination={selectedLocation}
                showPath={showPath}
              />
            )}
          </MemoizedMap>

          <UserMarker />
          {showPath !== true && <ClusteredMarkers pois={displayPois} />}
          <Markers pois={displayPois} />
        </APIProvider>
      </>
    );
  }
}
