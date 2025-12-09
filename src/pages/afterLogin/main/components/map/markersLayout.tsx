import { useMemo } from "react";
import { useMapStore } from "../../../../../store/store";
import {  useShallow } from "zustand/shallow";
import ClusteredMarkers from "./markerCluster";
import Markers from "./customMarker";
import type { Poi } from "../../../../../types/poi";

export default function MarkersLayer({ locations }: { locations: Poi[] }) {
  const { showLikedOnly, likeLocation, selectedCategory } = useMapStore(
    useShallow((state) => ({
      showLikedOnly: state.showLikedOnly,
      likeLocation: state.likeLocation,
      selectedCategory: state.selectedCategory,
    }))
  );

  const filteredLocations = useMemo(
    () =>
      selectedCategory === "whole"
        ? locations
        : locations.filter((loc) => loc.category === selectedCategory),
    [locations, selectedCategory]
  );

  const displayPois = useMemo(
    () => (showLikedOnly ? likeLocation ?? [] : filteredLocations),
    [showLikedOnly, likeLocation, filteredLocations]
  );

  return (
    <>
      <ClusteredMarkers pois={displayPois} />
      <Markers pois={displayPois} />
    </>
  );
}
