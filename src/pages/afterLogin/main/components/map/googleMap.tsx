import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Markers from "./customMarker";
import ClusteredMarkers from "./markerCluster";
import UserMarker from "./userMarker";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Poi } from "../../../../../types/poi";
import MapCenter from "./mapCenterFunction";
import Polyline from "./mapPolyline";
import { useCategory } from "../../../../../state/categoryContext";
import GetPillLocation from "../../../../../api/getPillLocations";

// https://visgl.github.io/react-google-maps/examples/directions : 오피셜 사이트

const SongDoBounds = {
  north: 37.427025044166236,
  south: 37.3411119498197,
  west: 126.58951155157007,
  east: 126.69771587807054,
};

export default function GoogleMap({
  userLocation,
  isCenter,
  selectedLocation,
  isInfoVisible,
  setIsInfoVisible,
  likeLocation,
  setSelectedLocation,
  setIsCenter,
  showPath,
  showLikedOnly,
}: {
  userLocation: google.maps.LatLngLiteral;
  isCenter: boolean;
  selectedLocation: Poi | null;
  setSelectedLocation: Dispatch<SetStateAction<Poi | null>>;
  isInfoVisible: boolean;
  setIsInfoVisible: Dispatch<SetStateAction<boolean>>;
  likeLocation: Poi[];
  setIsCenter: Dispatch<SetStateAction<boolean>>;
  showPath: boolean;
  showLikedOnly: boolean;
}) {
  const [locations, setLocations] = useState<Poi[]>([]);
  const [isInBoundary, setIsInBoundary] = useState(true);

  const { selectedCategory } = useCategory();

  const filteredLocations =
    selectedCategory === "whole"
      ? locations
      : locations.filter((loc) => loc.category === selectedCategory);

  const displayPois = showLikedOnly ? likeLocation ?? [] : filteredLocations;

  useEffect(() => {
    setLocations(GetPillLocation() as Poi[]);
  }, []);

  useEffect(() => {
    const isOutOfBounds =
      userLocation.lat > SongDoBounds.north ||
      userLocation.lat < SongDoBounds.south ||
      userLocation.lng < SongDoBounds.west ||
      userLocation.lng > SongDoBounds.east;

    if (isOutOfBounds) {
      setIsInBoundary(false);
    } else {
      setIsInBoundary(true);
    }
  }, [userLocation]);

  if (userLocation.lat === 0 && userLocation.lng === 0) {
    return (
      <div className="bg-white h-full flex flex-col items-center justify-center text-gray-700">
        <p>위치 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (!isInBoundary) {
    return (
      <div className="bg-gray-500 h-full flex flex-col items-center justify-center text-white">
        <p>서비스 지역을 벗어났습니다.</p>
        <p>송도 지역으로 진입하시면 정상적으로 이용하실 수 있습니다.</p>
      </div>
    );
  } else {
    return (
      <APIProvider
        apiKey={import.meta.env.VITE_PUBLIC_MAP_KEY}
        libraries={["marker"]}
      >
        <Map
          mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
          style={{ width: "100%", height: "100%" }}
          defaultCenter={userLocation || { lat: 37.386196, lng: 126.639404 }}
          defaultZoom={17}
          gestureHandling="greedy"
          disableDefaultUI
          onClick={() => setIsInfoVisible(false)}
          onDrag={() => setIsCenter(false)}
          restriction={{
            latLngBounds: SongDoBounds,
            strictBounds: false,
          }}
        >
          <MapCenter
            isCenter={isCenter}
            location={userLocation}
            setIsCenter={setIsCenter}
          />

          {showPath && (
            <Polyline
              origin={userLocation}
              destination={selectedLocation}
              showPath={showPath}
            />
          )}
        </Map>

        <UserMarker userLocation={userLocation} />

        {showPath !== true && (
          <ClusteredMarkers
            pois={displayPois}
            setSelectedLocation={setSelectedLocation}
            setIsInfoVisible={setIsInfoVisible}
          />
        )}

        <Markers
          pois={displayPois}
          selectedLocation={selectedLocation}
          isInfoVisible={isInfoVisible}
          setIsInfoVisible={setIsInfoVisible}
          likeLocation={likeLocation}
          setSelectedLocation={setSelectedLocation}
          showPath={showPath}
        />
      </APIProvider>
    );
  }
}
