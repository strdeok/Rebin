import { Link, useLocation } from "react-router-dom";
import Map from "../../../assets/icons/Map.svg?react";
import Radar from "../../../assets/icons/Radar.svg?react";
import Store from "../../../assets/icons/Store.svg?react";
import User from "../../../assets/icons/User.svg?react";
import ScreenNav from "../main/components/screenNav";
import Chat from "../../../assets/icons/Chat.svg?react"

export default function BottomNavigation() {
  const pathname = useLocation().pathname;
  return (
    <div className="fixed max-w-[440px] bottom-0 flex flex-row items-center justify-around w-full h-[4.5rem] border-t-2 border-t-gray-300 z-30 bg-white p-2 ">
      <Link
        to="/main"
        className={`flex-1 h-full flex flex-col items-center text-[#7D8C8B]
          ${pathname === "/main" && "text-[#19824F]"}`}
      >
        <Map fill={pathname === "/main" ? "#19824F" : "#7D8C8B"} />
        <p>맵</p>
      </Link>
      <Link
        to="/around-trash"
        className={`text-[#7D8C8B] whitespace-nowrap flex-1 h-full flex flex-col items-center
          ${pathname === "/around-trash" && "text-[#19824F]"}
          `}
      >
        <Radar
          className="w-full"
          fill={pathname === "/around-trash" ? "#19824F" : "#7D8C8B"}
        />
        <p>주위수거함</p>
      </Link>

      {pathname === "/main" && <ScreenNav />}

      <Link
        to="/chat-bot"
        className={`flex-1 h-full flex flex-col items-center text-[#7D8C8B]
          ${pathname === "/chat-bot" && "text-[#19824F]"}`}
      >
        <Chat stroke={pathname === "/chat-bot" ? "#19824F" : "#7D8C8B"} />
        <p>챗봇</p>
      </Link>

      <Link
        to="/mypage"
        className={`flex-1 h-full flex flex-col items-center text-[#7D8C8B]
          ${pathname.startsWith("/mypage") && "text-[#19824F]"}`}
      >
        <User fill={pathname.startsWith("/mypage") ? "#19824F" : "#7D8C8B"} />
        <p className="whitespace-nowrap">마이페이지</p>
      </Link>
    </div>
  );
}
