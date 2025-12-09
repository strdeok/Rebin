import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { useMapStore } from "../../../../../store/store";
import { useShallow } from "zustand/shallow";

export default function MapCenter() {
  const map = useMap();
  const { isCenter, setIsCenter, userLocation } = useMapStore(
    useShallow((state) => ({
      isCenter: state.isCenter,
      setIsCenter: state.setIsCenter,
      userLocation: state.userLocation,
    }))
  );

  // 지도 중심 이동
  useEffect(() => {
    if (userLocation && isCenter) {
      map?.panTo(userLocation as google.maps.LatLngLiteral);
      setIsCenter(false); // 다시 이동하지 않도록
    }
  }, [isCenter]);
  return null;
}
