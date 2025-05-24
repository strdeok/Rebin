import { useNavigate } from "react-router-dom";
import Close from "../../../../assets/icons/Close.svg?react";
import type { Dispatch } from "react";

export default function AuthModal({
  setActiveModal,
}: {
  setActiveModal: Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full absolute top-0 z-50 backdrop-blur-sm bg-[#00000040] flex items-center justify-center">
      <div className="relative w-80 h-[30rem]  bg-white">
        <Close
          className="absolute right-4 top-4"
          onClick={() => {
            setActiveModal(false);
          }}
        />
        <div className="h-7 top-8 left-6  font-semibold  text-2xl absolute">
          폐기물 인증 제한 안내
        </div>

        <p className="top-[5.75rem] left-6 font-normal  text-xl absolute">
          <span className="font-normal text-xl">
            인증 남용을 막기 위해 <br />
          </span>

          <span className="font-bold">
            품목당 하루 1개
            <br />
          </span>

          <span className="font-normal text-black text-xl">
            제한하고 있습니다.
          </span>
        </p>

        <div className="h-6 top-48 left-6  font-semibold text-xl whitespace-nowrap absolute">
          남은 횟수:
        </div>

        <p className="top-60 left-6 font-semibold  text-xl absolute ">
          <span className="text-black">
            폐건전지: 1 / 1<br />
            폐의약품: 1 / 1<br />
            폐식용유: 1 / 1<br />
            공병:{" "}
          </span>

          <span className="text-[#ff0000]">0</span>

          <span className="text-black"> / 1</span>
        </p>

        <div className="top-[386px] left-[103px] [font-family:'Pretendard_Variable-Medium',Helvetica] font-medium text-black text-base whitespace-nowrap absolute tracking-[0] leading-[normal]">
          진행하시겠습니까?
        </div>

        <button
          className="absolute w-64 h-11 top-[25.875rem] left-8 bg-[#0087ff] rounded-lg font-semibold text-white"
          onClick={() => {
            navigate("/scanning-qr");
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}
