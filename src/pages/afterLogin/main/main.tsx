import { useState } from "react";
import LikeBanner from "./components/likeBanner";
import GoogleMap from "./components/map/googleMap";
import PlaceInfo from "./components/placeInfo";
import SideController from "./components/sideController";
import type { Poi } from "../../../type/poi";
import AuthModal from "./components/authModal";

export default function Main() {
  const [like, setLike] = useState(false);
  const [likeLocation, setLikeLocation] = useState<
    { name: string; location: object; category: string }[]
  >([]);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Poi>({
    name: "",
    location: { lat: 0, lng: 0 },
    category: "battery",
  });
  const [isCenter, setIsCenter] = useState(false);
  const [showPath, setShowPath] = useState(false);
  const [isActiveModal, setActiveModal] = useState(false);

  return (
    <main className="w-full h-full">
      <LikeBanner like={like} setLike={setLike} />
      <GoogleMap
        isCenter={isCenter}
        setIsCenter={setIsCenter}
        selectedLocation={selectedLocation}
        isInfoVisible={isInfoVisible}
        setIsInfoVisible={setIsInfoVisible}
        likeLocation={likeLocation}
        setSelectedLocation={setSelectedLocation}
        showPath={showPath}
      />
      <SideController setIsCenter={setIsCenter} />
      <PlaceInfo
        setLike={setLike}
        likeLocation={likeLocation}
        setLikeLocation={setLikeLocation}
        isInfoVisible={isInfoVisible}
        selectedLocation={selectedLocation}
        showPath={showPath}
        setShowPath={setShowPath}
        setActiveModal={setActiveModal}
      />
      {isActiveModal && <AuthModal setActiveModal={setActiveModal} />}
    </main>
  );
}
