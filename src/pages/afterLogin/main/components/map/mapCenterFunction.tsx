import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

export default function MapCenter({
  isCenter,
  location,
  setIsCenter,
}: {
  isCenter: boolean;
  location: google.maps.LatLngLiteral;
  setIsCenter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const map = useMap();

  // 지도 중심 이동
  useEffect(() => {
    if (location && isCenter) {
      map?.panTo(location);
      setIsCenter(false); // 다시 이동하지 않도록
    }
  }, [isCenter]);
  return null;
}
