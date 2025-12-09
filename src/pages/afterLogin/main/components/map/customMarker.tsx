import React, { useEffect, useState, useCallback, type JSX } from "react";
import Bottle from "../../../../../assets/icons/Bottle.svg?react";
import Battery from "../../../../../assets/icons/Battery.svg?react";
import Pill from "../../../../../assets/icons/Pill.svg?react";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import type { Poi } from "../../../../../types/poi";
import { useMapStore } from "../../../../../store/store";
import { useShallow } from "zustand/shallow";

const categoryIcons: Record<string, JSX.Element> = {
  battery: <Battery fill="white" />,
  bottle: <Bottle fill="white" />,
  pill: <Pill fill="white" />,
};

const MemoizedMarker = React.memo(AdvancedMarker);

export default function Markers({ pois }: { pois: Poi[] }) {
  const { likeLocation, selectedLocation, isInfoVisible, showPath, setSelectedLocation, setIsInfoVisible } =
    useMapStore(
      useShallow((state) => ({
        likeLocation: state.likeLocation,
        selectedLocation: state.selectedLocation,
        isInfoVisible: state.isInfoVisible,
        showPath: state.showPath,
        setSelectedLocation: state.setSelectedLocation,
        setIsInfoVisible: state.setIsInfoVisible,
      }))
    );

  const map = useMap();
  const [visiblePois, setVisiblePois] = useState<Poi[]>([]);

  const updateVisibleMarkers = useCallback(() => {
    if (!map || pois.length === 0) return;

    const currentZoom = map.getZoom();

    if (currentZoom !== undefined && currentZoom <= 15) {
      setVisiblePois([]);
      return;
    }

    const bounds = map.getBounds();
    if (!bounds) return;

    const filteredPois = pois.filter((poi) => {
      return bounds.contains(poi.location);
    });

    setVisiblePois(filteredPois);
  }, [map, pois]);

  useEffect(() => {
    if (!map) return;

    updateVisibleMarkers();

    const listener = map.addListener("idle", updateVisibleMarkers);

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map, updateVisibleMarkers]);

  const poisToRender = showPath
    ? visiblePois.filter((poi) => poi.name === selectedLocation?.name)
    : visiblePois;

  return (
    <>
      {poisToRender.map((poi: Poi) => {
        const isLiked = likeLocation?.some((item) => item.name === poi.name);
        const isSelected = selectedLocation?.name === poi.name && isInfoVisible;

        return (
          <MemoizedMarker
            key={poi.name}
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
          </MemoizedMarker>
        );
      })}
    </>
  );
}
