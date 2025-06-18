// src/utils/getWalkingMatrix.ts
export async function getWalkingMatrix(
  userLocation: { lat: number; lng: number },
  destinations: {
    name: string;
    location: {
      lat: number;
      lng: number;
    };
    time: string;
    category: string;
  }[]
): Promise<{ distances: number[]; durations: number[] } | false> {
  const apiKey = import.meta.env.VITE_PUBLIC_OPENROUTESERVICE_API_KEY;

  const allCoords = [
    [userLocation.lng, userLocation.lat],
    ...destinations.map((loc) => [loc.location.lng, loc.location.lat]),
  ];

  try {
    const response = await fetch(
      "https://api.openrouteservice.org/v2/matrix/foot-walking",
      {
        method: "POST",
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locations: allCoords,
          metrics: ["distance", "duration"],
          sources: [0], // 출발지는 첫 번째 좌표
          destinations: destinations.map((_, idx) => idx + 1), // 목적지는 1번부터 시작
        }),
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    return {
      distances: data.distances[0], // 출발지 → 각 목적지 거리 (m)
      durations: data.durations[0], // 출발지 → 각 목적지 시간 (초)
    };
  } catch (error) {
    return false;
  }
}
