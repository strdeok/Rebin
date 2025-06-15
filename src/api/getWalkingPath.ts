import axios from "axios";
import type { Poi } from "../types/poi";

export default async function GetWalkingPath({
  origin,
  destination,
}: {
  origin: { lat: number; lng: number };
  destination: Poi | null;
}) {
  try {
    const result = await axios.post(
      "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1",
      {
        startX: origin.lng,
        startY: origin.lat,
        endX: destination?.location.lng,
        endY: destination?.location.lat,
        startName: "%ED%98%84%EC%9E%AC%20%EC%9C%84%EC%B9%98%0A",
        endName: "%EB%AA%A9%EC%A0%81%EC%A7%80",
        searchOptions: 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
          appKey: import.meta.env.VITE_PUBLIC_TMAP_KEY,
        },
      }
    );

    const features = result.data.features;

    const keyPoints = features
      .filter(
        (point: any) =>
          point.geometry.type === "Point" &&
          ["SP", "GP", "EP"].includes(point.properties.pointType)
      )
      .map((point: any) => ({
        lat: point.geometry.coordinates[1],
        lng: point.geometry.coordinates[0],
      }));

    return keyPoints;
  } catch (err) {
    console.error("TMap API 호출 실패:", err);
    return {
      keyPoints: [],
      totalTime: 0,
      totalDistance: 0,
    };
  }
}
