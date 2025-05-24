import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

export default function Polyline() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const path = [
      { lat: 37.38696794167395, lng: 126.63989992959323 },
      { lat: 37.38643123286098, lng: 126.6397020665826 },
      { lat: 37.38447104062444, lng: 126.64102690918341 },
    ];

    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: "#19824F",
      strokeOpacity: 1,
      strokeWeight: 7,
    });

    polyline.setMap(map);

    return () => {
      polyline.setMap(null); // 컴포넌트 unmount 시 제거
    };
  }, [map]);

  return null;
}
