import { useLocation, useNavigate } from "react-router-dom";
import Bell from "../../../assets/icons/Bell.svg?react";
import Previous from "../../../assets/icons/Previous.svg?react";

export default function Header() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  return (
    <div className="fixed max-w-[440px] top-0 bg-white z-30 w-full h-12 text-center px-2 flex items-center justify-between border-b border-[#D9D9D9]">
      <button
      className="w-6"
        onClick={() => {
          navigate(-1);
        }}
      >
        {pathname.startsWith("/mypage") && pathname !== "/mypage" && <Previous stroke="#7D8C8B" />}
      </button>
      <span className="font-semibold text-xl text-[#19824F]">리빈</span>
      <Bell></Bell>
    </div>
  );
}
