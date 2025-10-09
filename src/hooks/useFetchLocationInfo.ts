import { useQuery } from "@tanstack/react-query";
import { getWalkingDistance } from "../api/getWalkingTimeDistance";
import { useMapStore } from "../store/store";
import { useShallow } from "zustand/shallow";

export const useFetchLocationInfo = () => {
  const { userLocation, selectedLocation } = useMapStore(
    useShallow((state) => ({
      userLocation: state.userLocation,
      selectedLocation: state.selectedLocation,
    }))
  );
  return useQuery({
    queryKey: ["locationInfo", userLocation, selectedLocation?.name],
    queryFn: () => {
      if (!selectedLocation) {
        return null;
      }
      return getWalkingDistance(userLocation, selectedLocation.location);
    },

    enabled: !!userLocation && !!selectedLocation,
  });
};
