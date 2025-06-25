import { motion } from "framer-motion";
import { useEffect, useState, type Dispatch } from "react";
import type { Poi } from "../../../../types/poi";
import OutlineHeart from "../../../../assets/icons/OutlineHeart.svg?react";
import FilledHeart from "../../../../assets/icons/FillHeart.svg?react";
import {
  addLikeLocation,
  removeLikeLocation,
} from "../../../../utils/firebase/manageLikeLocations";
import { getWalkingDistance } from "../../../../api/getWalkingTimeDistance";
import { useUserLocation } from "../../../../state/nowLocationContext";

export default function PlaceInfo({
  like,
  setLike,
  likeLocation,
  setLikeLocation,
  isInfoVisible,
  selectedLocation,
  showPath,
  setShowPath,
}: {
  like: boolean;
  setLike: Dispatch<React.SetStateAction<boolean>>;
  likeLocation: Poi[];
  setLikeLocation: Dispatch<React.SetStateAction<Poi[]>>;
  isInfoVisible: boolean;
  selectedLocation: Poi | null;
  showPath: boolean;
  setShowPath: Dispatch<React.SetStateAction<boolean>>;
}) {
  const likeLocationNames = likeLocation.map((item) => item);
  const [routeInfo, setRouteInfo] = useState<{
    distance: number;
    duration: number;
  } | null>(null);
  const { userLocation } = useUserLocation();

  useEffect(() => {
    if (!selectedLocation) return;
    const info = async () => {
      try {
        const result = await getWalkingDistance(
          [userLocation.lng, userLocation.lat],
          [selectedLocation?.location.lng, selectedLocation?.location.lat]
        );
        const data = result.routes[0].summary;
        console.log(data);
        setRouteInfo({
          distance: data.distance,
          duration: data.duration,
        });
      } catch (error) {
        console.error(error);
      }
    };

    info();
  }, [selectedLocation?.name]);

  if (isInfoVisible) {
    return (
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.1 }}
        className="absolute bottom-0 z-50 right-0 w-full h-64 bg-white rounded-[32px_32px_0px_0px] overflow-hidden shadow-md"
      >
        {likeLocationNames.find(
          (item) => item.name === selectedLocation?.name
        ) || like ? (
          <FilledHeart
            fill="red"
            className="absolute w-9 h-9 top-[30px] right-8"
            onClick={() => {
              removeLikeLocation(selectedLocation?.name);
              const filteredLocations = likeLocation.filter(
                (item) => item.name !== selectedLocation?.name
              );
              setLikeLocation(filteredLocations);
            }}
          />
        ) : (
          <OutlineHeart
            className="absolute w-9 h-9 top-[30px] right-8"
            onClick={() => {
              setLike(true);
              addLikeLocation(selectedLocation!);
            }}
          />
        )}

        <div className="mt-8 ml-11  font-semibold text-black text-2xl w-65">
          {selectedLocation?.name}
          <span className="font-normal text-[#7d8c8b] text-base tracking-[0] leading-[normal] whitespace-nowrap ml-2">
            {routeInfo?.distance?.toFixed(0)}m (약{" "}
            {((routeInfo?.duration ?? 0) / 60).toFixed(0)}분)
          </span>
        </div>

        <div className="mt-4 ml-11 font-normal">
          영업시간
          <br />
          {selectedLocation?.time}
        </div>
        <div className="w-full justify-around text-white mt-12 flex flex-row">
          {!showPath ? (
            <>
              <button
                className="bg-[#19824f] w-full mx-4 h-14 rounded-lg"
                onClick={() => {
                  setShowPath(true);
                }}
              >
                길찾기
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-[#D92B04] w-full mx-4 h-14 top rounded-lg"
                onClick={() => {
                  setShowPath(false);
                }}
              >
                길찾기 종료
              </button>
            </>
          )}
        </div>
      </motion.div>
    );
  }
}
