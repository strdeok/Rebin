import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Markers from "./customMarker";
import ClusteredMarkers from "./markerCluster";
import UserMarker from "./userMarker";
import useGetNowLocation from "../../../../../util/getNowLocation";
import type { Dispatch, SetStateAction } from "react";
import type { Poi } from "../../../../../type/poi";
import MapCenter from "./mapCenterFunction";
import Polyline from "./mapPolyline";
import { useCategory } from "../../../../../state/categoryContext";

// https://visgl.github.io/react-google-maps/examples/directions : 오피셜 사이트

export const locations: Poi[] = [
  {
    name: "대한뒷고기",
    location: { lat: 37.38501415202262, lng: 126.64185143053245 },
    category: "battery",
  },
  {
    name: "스타벅스",
    location: { lat: 37.38461116774087, lng: 126.64118149998412 },
    category: "bottle",
  },  {
    name: "차이홍",
    location: { lat:  37.38753152837655, lng:  126.64451565765982 },
    category: "bottle",
  },  {
    name: "송도캐슬파크",
    location: { lat:  37.38522499895747, lng: 126.64155684493942 },
    category: "bottle",
  },
  {
    name: "송도퍼스트 내과의원",
    location: { lat: 37.38403157650678, lng: 126.64167529076617 },
    category: "pill",
  },
];

export default function GoogleMap({
  isCenter,
  selectedLocation,
  isInfoVisible,
  setIsInfoVisible,
  likeLocation,
  setSelectedLocation,
  setIsCenter,
  showPath,
}: {
  isCenter: boolean;
  selectedLocation: Poi;
  isInfoVisible: boolean;
  setIsInfoVisible: Dispatch<SetStateAction<boolean>>;
  likeLocation: { name: string; location: object; category: string }[];
  setSelectedLocation: Dispatch<SetStateAction<Poi>>;
  setIsCenter: Dispatch<SetStateAction<boolean>>;
  showPath: boolean;
}) {
  const location = useGetNowLocation(); // 실제 위치 가져오기
  console.log(location);

  const userLocation = {
    lat: 37.38696794167395,
    lng: 126.63989992959323,
  };
 const { selectedCategory } = useCategory();
 

  const filteredLocations =
    selectedCategory === "whole"
      ? locations
      : locations.filter((loc) => loc.category === selectedCategory);

  return (
    <APIProvider
      apiKey={import.meta.env.VITE_PUBLIC_MAP_KEY}
      libraries={["marker"]}
    >
      <Map
        mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
        style={{ width: "100vw", height: "100%" }}
        defaultCenter={userLocation || { lat: 37.386196, lng: 126.639404 }}
        defaultZoom={17}
        gestureHandling="greedy"
        disableDefaultUI
        onClick={() => setIsInfoVisible(false)}
        onDrag={() => setIsCenter(false)}
      >
        <MapCenter
          isCenter={isCenter}
          location={userLocation}
          setIsCenter={setIsCenter}
        />
        {showPath && <Polyline />}
      </Map>
      <UserMarker userLocation={userLocation} />
      <ClusteredMarkers pois={filteredLocations} />
      <Markers
        pois={filteredLocations}
        selectedLocation={selectedLocation}
        isInfoVisible={isInfoVisible}
        setIsInfoVisible={setIsInfoVisible}
        likeLocation={likeLocation}
        setSelectedLocation={setSelectedLocation}
      />
    </APIProvider>
  );
}
