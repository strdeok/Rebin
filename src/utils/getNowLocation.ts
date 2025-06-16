import { useEffect, useState } from "react";

export default function useGetNowLocation() {
  const [location, setLocation] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    // 초기 위치 1회 조회 (빠름)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.error("초기 위치 조회 실패:", err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    );

    // 이후 지속적인 위치 추적
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.error("위치 추적 실패:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return location;
}
