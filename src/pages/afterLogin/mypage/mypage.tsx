import { useNavigate } from "react-router-dom";
import User from "../../../assets/icons/User.svg?react";
import Edit from "../../../assets/icons/Edit.svg?react";
import Info from "../../../assets/icons/Info.svg?react";
import Next from "../../../assets/icons/Next.svg?react";
import Battery from "../../../assets/icons/Battery.svg?react";
import Pill from "../../../assets/icons/Pill.svg?react";
import Bottle from "../../../assets/icons/Bottle.svg?react";
import Recycle from "../../../assets/icons/Recycle.svg?react";
import TrashBin from "../../../assets/icons/TrashBin.svg?react";
import Heart from "../../../assets/icons/OutlineHeart.svg?react";
import CustomerService from "../../../assets/icons/CustomerService.svg?react";
import Receipt from "../../../assets/icons/Receipt.svg?react";
import RankModal from "./_components/rankModal";
import { useState } from "react";
import WithdrawModal from "./_components/withdrawModal";

export default function Mypage() {
  const navigate = useNavigate();
  const [isRankModalopen, setRankModalopen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <>
      {isRankModalopen && <RankModal setRankModalopen={setRankModalopen} />}
      {isWithdrawModalOpen && (
        <WithdrawModal setIsWithdrawModalOpen={setIsWithdrawModalOpen} />
      )}
      <div className="px-4 pt-2 bg-[#F9F9F9] flex flex-col items-center gap-4 pb-20">
        {/* 첫번째 섹션 */}
        <div
          id="user"
          className="w-full bg-white mt-2 rounded-lg shadow-xl h-60 flex items-center px-4"
        >
          <div className="relative bg-[#d1d1d6] size-32 rounded-full flex items-center justify-center border-4 border-[#19824f]">
            <User fill="#7D8C8B" className="size-24" />
            <div className="absolute rounded-full bg-[#19824F] size-8 flex items-center justify-center right-0 bottom-0">
              <Edit fill="white" />
            </div>
          </div>

          <div className="h-32 ml-7">
            <p className="font-semibold text-2xl flex flex-row">
              닉네임 🌱{" "}
              <button
                onClick={() => {
                  navigate("/mypage/edit-nickname");
                }}
              >
                <Next />
              </button>
            </p>

            <p className="relative mt-5">
              <p className="font-medium text-sm text-[#7D8C8B]">현재 포인트</p>
              <button
                className="absolute top-1 right-0"
                onClick={() => {
                  setRankModalopen(true);
                }}
              >
                <Info />
              </button>
              <span className="font-semibold text-4xl text-[#19824F]">
                5,000 P
              </span>
            </p>
          </div>
        </div>

        {/* 두번째 섹션 */}
        <div
          id="trash"
          className="relative w-full h-44 pt-4 bg-white rounded-lg shadow-xl font-medium"
        >
          <span className="ml-8">닉네임님은 오늘</span>

          <div className="flex flex-row items-center justify-center gap-10 text-xl mt-5">
            <div className="flex flex-col itmes-center gap-2">
              <Battery fill="black" />
              <span>1개</span>
            </div>
            <div className="h-[4.5rem] border border-[#7d8c8b]" />
            <div className="flex flex-col itmes-center gap-2">
              <Pill />
              <span>1개</span>
            </div>
            <div className="h-[4.5rem] border border-[#7d8c8b]" />
            <div className="flex flex-col itmes-center gap-2">
              <Bottle />
              <span>1개</span>
            </div>
          </div>

          <span className="absolute bottom-2 right-2">
            폐기물을 버리실 수 있습니다.
          </span>
        </div>

        {/* 세번째 섹션 */}
        <div id="chat-bot" className="w-full">
          <button
            className="bg-[#19824F] w-full h-24 rounded-lg text-white tracking-[0] leading-[normal] font-semibold flex items-center justify-center gap-1"
            onClick={() => {
              navigate("/mypage/chat-bot");
            }}
          >
            <Recycle fill="white" />
            리빈이 알려주는 올바른 폐기물 처리 방법!
          </button>
        </div>

        {/* 네번째 섹션 */}
        <button
          id="수거내역"
          className="relative w-full h-14 bg-white rounded-lg shadow-xl py-2 font-medium flex items-center"
          onClick={() => {
            navigate("/mypage/trash-history");
          }}
        >
          <TrashBin className="ml-4" />
          <span className="ml-5">수거 인증 내역</span>
        </button>

        {/* 다섯번째 섹션 */}
        <div
          id="찜+서비스"
          className="relative w-full h-32 bg-white rounded-lg shadow-xl font-medium flex flex-col"
        >
          <button
            id="찜"
            className="flex items-center py-2 h-1/2 border-b"
            onClick={() => {
              navigate("/mypage/favorites");
            }}
          >
            <Heart className="ml-4" />
            <span className="ml-5">내가 찜한 가게 확인하기</span>
          </button>
          <button id="서비스" className="flex items-center py-2 h-1/2">
            <CustomerService className="ml-4" />
            <span className="ml-5">1대1 문의 / 리뷰 남기기</span>
          </button>
        </div>

        {/* 여섯번째 섹션 */}
        <button
          id="결제내역"
          className="relative w-full h-14 bg-white rounded-lg shadow-xl py-2 font-medium flex items-center"
          onClick={() => {
            navigate("/mypage/payment-history");
          }}
        >
          <Receipt className="ml-4" />
          <span className="ml-5">결제 내역</span>
        </button>

        {/* 일곱번째 섹션 */}
        <div
          id="로그아웃/탈퇴"
          className="relative w-full h-32 bg-white rounded-lg shadow-xl font-medium flex flex-col"
        >
          <button
            id="로그아웃"
            className="flex items-center py-2 border-b h-1/2 pl-5"
          >
            로그아웃
          </button>
          <button
            id="탈퇴"
            className="flex items-center pl-5 py-2  h-1/2 text-[#ff0000]"
            onClick={() => {
              setIsWithdrawModalOpen(true);
            }}
          >
            탈퇴하기{" "}
          </button>
        </div>
      </div>
    </>
  );
}
