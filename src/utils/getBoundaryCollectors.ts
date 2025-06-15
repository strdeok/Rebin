import GetPillLocation from "../api/getPillLocations";

export function getBoundaryCollectors(userLocation: any): {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  time: string;
  category: string;
}[] {
  const bins = GetPillLocation();

  const toKm = 111000;

  const distance = (coord1: any, coord2: any) => {
    const latDiff = (coord1.lat - coord2.lat) * toKm;
    const lngDiff =
      (coord1.lng - coord2.lng) * toKm * Math.cos((coord1.lat * Math.PI) / 180);
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff); // 미터 단위 거리
  };

  // 1km (1000m) 이내 수거함 필터링 후 반환
  return bins.filter(
    (bin: any) => bin.location && distance(userLocation, bin.location) <= 500
  );
}
