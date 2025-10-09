import { motion } from "framer-motion";
import OutlineHeart from "../../../../assets/icons/OutlineHeart.svg?react";
import FilledHeart from "../../../../assets/icons/FillHeart.svg?react";
import {
  addLikeLocation,
  removeLikeLocation,
} from "../../../../utils/firebase/manageLikeLocations";
import { useMapStore } from "../../../../store/store";
import { useFetchLocationInfo } from "../../../../hooks/useFetchLocationInfo";
import Loading from "../../../../components/loading";

export default function PlaceInfo({}: {}) {
  const {
    likeLocation,
    selectedLocation,
    isInfoVisible,
    setShowPath,
    setLike,
    setLikeLocation,
    showPath,
    like,
  } = useMapStore();
  const likeLocationNames = likeLocation.map((item) => item);

  const { data: locationInfo, isLoading } = useFetchLocationInfo();

  const distance = locationInfo?.routes[0]?.summary?.distance;
  const duration = locationInfo?.routes[0]?.summary?.duration;

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
          {isLoading ? (
            <Loading />
          ) : (
            <span className="font-normal text-[#7d8c8b] text-base tracking-[0] leading-[normal] whitespace-nowrap ml-2">
              {distance?.toFixed(0)}m (약 {((duration ?? 0) / 60).toFixed(0)}분)
            </span>
          )}
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
