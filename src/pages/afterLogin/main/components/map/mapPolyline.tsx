import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import GetWalkingPath from "../../../../../api/getWalkingPath";
import type { Poi } from "../../../../../types/poi";

export default function Polyline({
  origin,
  destination,
  showPath,
}: {
  origin: { lat: number; lng: number };
  destination: Poi | null;
  showPath: boolean;
}) {
  const map = useMap();
  const [path, setPath] = useState<google.maps.LatLng[] | null>(null);

  useEffect(() => {
    if (!map) return;

    if (!showPath) {
      setPath(null); // 경로 숨기기
      return;
    }

    const fetchPath = async () => {
      const result = await GetWalkingPath({ origin, destination });
      setPath(result.length > 0 ? result : null);
    };

    fetchPath();
  }, [showPath]);

  useEffect(() => {
    if (!map) return;

    let polyline: google.maps.Polyline | null = null;

    if (path && path.length > 0) {
      polyline = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: "#19824F",
        strokeOpacity: 1,
        strokeWeight: 7,
      });
      polyline.setMap(map);
    }

    return () => {
      if (polyline) {
        polyline.setMap(null);
      }
    };
  }, [path]);

  return null;
}
