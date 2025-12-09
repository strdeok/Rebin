import { createContext, useContext, useEffect, useState } from "react";

type Location = { lat: number; lng: number };

type LocationContextType = {
  userLocation: Location;
  setUserLocation: (loc: Location) => void;
  isExperienceMode: boolean;
  setIsExperienceMode: (mode: boolean) => void;
};

const LocationContext = createContext<LocationContextType>({
  userLocation: { lat: 0, lng: 0 },
  setUserLocation: () => {},
  isExperienceMode: false,
  setIsExperienceMode: () => {},
});

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userLocation, setUserLocation] = useState<Location>({
    lat: 0,
    lng: 0,
  });
  const [isExperienceMode, setIsExperienceMode] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation || isExperienceMode) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error("초기 위치 조회 실패:", err),
      { enableHighAccuracy: true, timeout: 5000 }
    );

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error("위치 추적 실패:", err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [isExperienceMode]);

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        setUserLocation,
        isExperienceMode,
        setIsExperienceMode,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useUserLocation = () => useContext(LocationContext);
