import { motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import type { Poi } from "../../../../type/poi";
import OutlineHeart from "../../../../assets/icons/OutlineHeart.svg?react";
import FilledHeart from "../../../../assets/icons/FillHeart.svg?react";

export default function PlaceInfo({
  setLike,
  likeLocation,
  setLikeLocation,
  isInfoVisible,
  selectedLocation,
  showPath,
  setShowPath,
  setActiveModal,
}: {
  setLike: Dispatch<React.SetStateAction<boolean>>;
  likeLocation: { name: string; location: object; category: string }[];
  setLikeLocation: Dispatch<
    SetStateAction<{ name: string; location: object; category: string }[]>
  >;
  isInfoVisible: boolean;
  selectedLocation: Poi;
  showPath: boolean;
  setShowPath: Dispatch<React.SetStateAction<boolean>>;
  setActiveModal: Dispatch<React.SetStateAction<boolean>>;
}) {
  const likeLocationNames = likeLocation.map((item) => item.name);

  if (isInfoVisible) {
    return (
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.1 }}
        className="absolute bottom-0 z-50 right-0 w-full h-64 bg-white rounded-[32px_32px_0px_0px] overflow-hidden shadow-md"
      >
        {likeLocationNames.find((item) => item === selectedLocation.name) ? (
          <FilledHeart
            fill="red"
            className="absolute w-9 h-9 top-[30px] right-8"
            onClick={() => {
              const filteredLocations = likeLocation.filter(
                (item) => item.name !== selectedLocation.name
              );
              setLikeLocation(filteredLocations);
            }}
          />
        ) : (
          <OutlineHeart
            className="absolute w-9 h-9 top-[30px] right-8"
            onClick={() => {
              setLike(true);
              setLikeLocation((prev) => [...prev, selectedLocation]);
            }}
          />
        )}

        <div className="mt-8 ml-11  font-semibold text-black text-2xl ">
          {selectedLocation.name}
          <span className="font-normal text-[#7d8c8b] text-base tracking-[0] leading-[normal] whitespace-nowrap ml-2">
            00.00km (약 12분)
          </span>
        </div>

        <div className="mt-4 ml-11 font-normal">
          영업시간
          <br />
          09:00 ~ 18:00
        </div>
        <div className="w-full justify-around text-white mt-12 flex flex-row">
          {!showPath ? (
            <>
              <button
                id="reader"
                className="bg-[#0087ff] w-36 h-14 top rounded-lg"
                onClick={() => {
                  setActiveModal(true);
                }}
              >
                QR 인증하기
              </button>

              <button
                className="bg-[#19824f] w-36 h-14 rounded-lg"
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
                className="bg-[#D92B04] w-36 h-14 top rounded-lg"
                onClick={() => {
                  setShowPath(false);
                }}
              >
                길찾기 종료
              </button>

              <button
                className="bg-[#0088FF] w-36 h-14 rounded-lg"
                onClick={() => {
                  setActiveModal(true);
                }}
              >
                QR 인증하기
              </button>
            </>
          )}
        </div>
      </motion.div>
    );
  }
}
