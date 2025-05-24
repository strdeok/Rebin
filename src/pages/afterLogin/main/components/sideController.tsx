import CurrenLocation from "../../../../assets/icons/CurrentLocation.svg?react";
import Heart from "../../../../assets/icons/FillHeart.svg?react";

export default function SideController({
  setIsCenter,
}: {
  setIsCenter: (value: boolean) => void;
}) {
  return (
    <div className="fixed z-40 flex flex-col right-4 top-20 gap-y-6">
      <button
        className="bg-white size-14 rounded-2xl shadow-md flex justify-center items-center"
        onClick={() => {
          setIsCenter(true);
        }}
      >
        <CurrenLocation stroke="#0088ff" />
      </button>
      <button className="bg-white size-14 rounded-2xl shadow-md flex justify-center items-center">
        <Heart />
      </button>
    </div>
  );
}
