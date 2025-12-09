import { useShallow } from "zustand/shallow";
import CurrenLocation from "../../../../assets/icons/CurrentLocation.svg?react";
import Heart from "../../../../assets/icons/FillHeart.svg?react";
import { useMapStore } from "../../../../store/store";

export default function SideController({}: {}) {
  const { setIsCenter, showLikedOnly, setShowLikedOnly } = useMapStore(
    useShallow((state) => ({
      setIsCenter: state.setIsCenter,
      showLikedOnly: state.showLikedOnly,
      setShowLikedOnly: state.setShowLikedOnly,
    }))
  );
  return (
    <div className="absolute z-40 flex flex-col right-4 top-20 gap-y-6">
      <button
        aria-label="to-my-position-button"
        className="bg-white size-14 rounded-2xl shadow-md flex justify-center items-center"
        onClick={() => {
          setIsCenter(true);
        }}
      >
        <CurrenLocation stroke="#0088ff" />
      </button>
      <button
        aria-label="like-button"
        className={`size-14 rounded-2xl shadow-md flex justify-center items-center ${
          showLikedOnly ? "bg-[#ff7e7e]" : "bg-white"
        }`}
        onClick={() => {
          setShowLikedOnly(!showLikedOnly);
        }}
      >
        <Heart />
      </button>
    </div>
  );
}
