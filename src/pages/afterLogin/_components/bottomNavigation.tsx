import { Link, useLocation } from "react-router-dom";
import Map from "../../../assets/icons/Map.svg?react";
import Radar from "../../../assets/icons/Radar.svg?react";
import Store from "../../../assets/icons/Store.svg?react";
import User from "../../../assets/icons/User.svg?react";
import ScreenNav from "../main/components/screenNav";

export default function BottomNavigation() {
  const pathname = useLocation().pathname;
  return (
    <div className="fixed bottom-0 left-0 flex flex-row items-center justify-around w-full h-[4.5rem] border-t-2 border-t-gray-300 z-30 bg-white p-2 ">
      <Link
        to="/main"
        className={`flex-1/4 h-full flex flex-col items-center text-[#7D8C8B]
          ${pathname === "/main" && "text-[#19824F]"}`}
      >
        <Map fill={pathname === "/main" ? "#19824F" : "#7D8C8B"} />
        <p>맵</p>
      </Link>
      <Link
        to="/around-trash"
        className={`
          flex-1/4 h-full flex flex-col items-center`}
      >
        <Radar fill={pathname === "/around-trash" ? "#19824F" : "#7D8C8B"} />
        <p
          className={`text-[#7D8C8B]
          ${pathname === "/around-trash" && "text-[#19824F]"}`}
        >
          주위수거함
        </p>
      </Link>

      {pathname === "/main" && (
        <ScreenNav />
      )}

      <Link
        to="/store"
        className={`flex-1/4 h-full flex flex-col items-center text-[#7D8C8B]
          ${pathname === "/store" && "text-[#19824F]"}`}
      >
        <Store stroke={pathname === "/store" ? "#19824F" : "#7D8C8B"} />
        <p>상점</p>
      </Link>
      <Link
        to="/mypage"
        className={`flex-1/4 h-full flex flex-col items-center text-[#7D8C8B]
          ${pathname.startsWith("/mypage") && "text-[#19824F]"}`}
      >
        <User fill={pathname.startsWith("/mypage") ? "#19824F" : "#7D8C8B"} />
        <p>마이페이지</p>
      </Link>
    </div>
  );
}
