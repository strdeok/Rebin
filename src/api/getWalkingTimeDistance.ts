export async function getWalkingDistance(start: any, end: any) {
  const apiKey = import.meta.env.VITE_PUBLIC_OPENROUTESERVICE_API_KEY; // 발급받은 키 입력

  const response = await fetch(
    "https://api.openrouteservice.org/v2/directions/foot-walking",
    {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [
          [start.lng, start.lat],
          [end.lng, end.lat],
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("경로를 불러오는 데 실패했습니다.");
  }

  const data = await response.json();

  return data;
}
