import { useEffect } from "react";
import LikeBanner from "./components/likeBanner";
import GoogleMap from "./components/map/googleMap";
import PlaceInfo from "./components/placeInfo";
import SideController from "./components/sideController";
import { getLikeLocation } from "../../../utils/firebase/manageLikeLocations";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../firebase";
import { useLocation } from "react-router-dom";
import { useMapStore } from "../../../store/store";
import { useShallow } from "zustand/shallow";

export default function Main() {
  const {
    like,
    setLikeLocation,
    setIsInfoVisible,
    setSelectedLocation,
    setIsCenter,
    setShowPath,
    fetchUserLocation,
  } = useMapStore(
    useShallow((state) => ({
      like: state.like,
      setLikeLocation: state.setLikeLocation,
      setIsInfoVisible: state.setIsInfoVisible,
      setSelectedLocation: state.setSelectedLocation,
      setIsCenter: state.setIsCenter,
      setShowPath: state.setShowPath,
      fetchUserLocation: state.fetchUserLocation,
    }))
  );

  const location = useLocation();

  useEffect(() => {
    const isLikePlace = async () => {
      const result = await getLikeLocation();
      setLikeLocation(result?.locations);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        isLikePlace();
        fetchUserLocation();
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 정리
  }, [fetchUserLocation, setLikeLocation]);

  useEffect(() => {
    if (!like) return; // like가 업데이트 될 때
    const fetchLikedLocations = async () => {
      const result = await getLikeLocation();
      setLikeLocation(result?.locations);
    };
    fetchLikedLocations();
  }, [like]);

  useEffect(() => {
    if (location.state?.poi) {
      setSelectedLocation(location.state.poi);
      setIsCenter(true);
      setShowPath(true);
      setIsInfoVisible(true);
    }
  }, [location.state]);

  return (
    <main className="w-full h-full">
      <LikeBanner  />
      <GoogleMap />

      <SideController />

      <PlaceInfo />
    </main>
  );
}
