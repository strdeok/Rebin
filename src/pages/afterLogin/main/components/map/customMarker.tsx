import {
  useEffect,
  useState,
  type Dispatch,
  type JSX,
  type SetStateAction,
} from "react";
import Bottle from "../../../../../assets/icons/Bottle.svg?react";
import Battery from "../../../../../assets/icons/Battery.svg?react";
import Pill from "../../../../../assets/icons/Pill.svg?react";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import type { Poi } from "../../../../../type/poi";

const categoryIcons: Record<string, JSX.Element> = {
  battery: <Battery fill="white" />,
  bottle: <Bottle fill="white" />,
  pill: <Pill fill="white" />,
};

export default function Markers({
  pois,
  selectedLocation,
  isInfoVisible,
  setIsInfoVisible,
  likeLocation,
  setSelectedLocation,
}: {
  pois: Poi[];
  selectedLocation: Poi;
  isInfoVisible: boolean;
  setIsInfoVisible: Dispatch<SetStateAction<boolean>>;
  likeLocation: { name: string; location: object; category: string }[];
  setSelectedLocation: Dispatch<SetStateAction<Poi>>;
}) {
  const [zoom, setZoom] = useState<number | undefined>();
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const updateZoom = () => {
      const currentZoom = map.getZoom();
      if (currentZoom !== undefined) {
        setZoom(currentZoom);
      }
    };

    updateZoom(); // 초기 줌 설정

    const listener = map.addListener("zoom_changed", updateZoom);

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map]);

  if (zoom !== undefined && zoom <= 15) return null; // 줌 나가면 없앰

  return (
    <>
      {pois.map((poi: Poi, i: number) => {
        const isLiked = likeLocation.some((item) => item.name === poi.name); // 배열 안에 특정 조건을 만족하는 요소가 "하나라도" 있는지
        const isSelected = selectedLocation?.name === poi.name && isInfoVisible;

        return (
          <AdvancedMarker
            key={i}
            position={poi.location}
            onClick={() => {
              setSelectedLocation(poi);
              setIsInfoVisible(true);
            }}
          >
            <div className="relative">
              <img
                id={poi.name}
                className={isSelected ? "w-20" : "w-16"}
                src={isLiked ? "/images/LikedMarker.png" : "/images/Marker.png"}
                alt="marker"
              />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3">
                {categoryIcons[poi.category]}
              </span>
            </div>
          </AdvancedMarker>
        );
      })}
    </>
  );
}
