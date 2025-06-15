import CurrenLocation from "../../../../assets/icons/CurrentLocation.svg?react";
import Heart from "../../../../assets/icons/FillHeart.svg?react";

export default function SideController({
  setIsCenter,
  showLikedOnly,
  setShowLikedOnly,
}: {
  setIsCenter: (value: boolean) => void;
  showLikedOnly: boolean;
  setShowLikedOnly: (value: boolean) => void;
}) {
  return (
    <div className="absolute z-40 flex flex-col right-4 top-20 gap-y-6">
      <button
        className="bg-white size-14 rounded-2xl shadow-md flex justify-center items-center"
        onClick={() => {
          setIsCenter(true);
        }}
      >
        <CurrenLocation stroke="#0088ff" />
      </button>
      <button
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
