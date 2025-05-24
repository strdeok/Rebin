import OutlineHeart from "../../../assets/icons/OutlineHeart.svg?react";
// import FillHeart from "../../../assets/icons/FillHeart.svg?react";
import Battery from "../../../assets/icons/Battery.svg?react";
// import Bottle from "../../../assets/icons/Bottle.svg?react";
// import Pill from "../../../assets/icons/Pill.svg?react";

const Container = () => {
  return (
    <div className="flex flex-row items-center w-full h-24 px-4">
      <Battery fill="black" />

      <div className="ml-6">
        <span className="text-xl">온누리 약국</span>
        <span className="text-sm text-[#7D8C8B]">(1.2km, 약 10분)</span>
        <br />
        <span>09:00 - 19:00</span>
      </div>

      <div className="flex flex-col absolute right-4 items-end gap-4">
        <OutlineHeart />
        <button className="w-[6.563rem] h-8 bg-[#007aff] text-white rounded-lg ">길찾기 시작</button>
      </div>
    </div>
  );
};

export default function AroundTrash() {
  return (
    <div className="relative flex flex-col items-center pb-20">
      <Container /><Container /><Container /><Container /><Container /><Container /><Container /><Container /><Container />
    </div>
  );
}
