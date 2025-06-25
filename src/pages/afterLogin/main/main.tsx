import { useEffect, useState } from "react";
import LikeBanner from "./components/likeBanner";
import GoogleMap from "./components/map/googleMap";
import PlaceInfo from "./components/placeInfo";
import SideController from "./components/sideController";
import type { Poi } from "../../../types/poi";
import { getLikeLocation } from "../../../utils/firebase/manageLikeLocations";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../firebase";
import { useLocation } from "react-router-dom";

export default function Main() {
  const [like, setLike] = useState(false);
  const [likeLocation, setLikeLocation] = useState<Poi[]>([]);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Poi | null>(null);
  const [isCenter, setIsCenter] = useState(false);
  const [showPath, setShowPath] = useState(false);
  const [showLikedOnly, setShowLikedOnly] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const isLikePlace = async () => {
      const result = await getLikeLocation();
      setLikeLocation(result?.locations);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        isLikePlace();
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 정리
  }, []);

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
      <LikeBanner like={like} />
      <GoogleMap
        isCenter={isCenter}
        setIsCenter={setIsCenter}
        selectedLocation={selectedLocation}
        isInfoVisible={isInfoVisible}
        setIsInfoVisible={setIsInfoVisible}
        likeLocation={likeLocation}
        setSelectedLocation={setSelectedLocation}
        showPath={showPath}
        showLikedOnly={showLikedOnly}
      />

      <SideController
        setIsCenter={setIsCenter}
        showLikedOnly={showLikedOnly}
        setShowLikedOnly={setShowLikedOnly}
      />

      <PlaceInfo
        like={like}
        setLike={setLike}
        likeLocation={likeLocation}
        setLikeLocation={setLikeLocation}
        isInfoVisible={isInfoVisible}
        selectedLocation={selectedLocation}
        showPath={showPath}
        setShowPath={setShowPath}
      />
    </main>
  );
}
