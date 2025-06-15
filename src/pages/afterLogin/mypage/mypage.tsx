import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RankModal from "./_components/rankModal";
import WithdrawModal from "./_components/withdrawModal";
import Recycle from "../../../assets/icons/Recycle.svg?react";
import Heart from "../../../assets/icons/OutlineHeart.svg?react";
import CustomerService from "../../../assets/icons/CustomerService.svg?react";
import getUserInfo from "../../../utils/firebase/getUserInfo";
import type { UserType } from "../../../types/userType";
import { logoutUser } from "../../../utils/firebase/logoutUser";

export default function Mypage() {
  const navigate = useNavigate();
  const [isRankModalopen, setRankModalopen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType>();

  useEffect(() => {
    getUserInfo()
      .then((user) => {
        setUserInfo(user);
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  return (
    <>
      {isRankModalopen && <RankModal setRankModalopen={setRankModalopen} />}
      {isWithdrawModalOpen && (
        <WithdrawModal setIsWithdrawModalOpen={setIsWithdrawModalOpen} />
      )}
      <div className="px-4 pt-2 bg-[#F9F9F9] flex flex-col items-center gap-4 pb-20">
        <div
          id="user"
          className="w-full bg-white mt-2 rounded-lg shadow-xl h-60 flex flex-col items-center justify-center gap-4"
        >
          <div className="relative bg-white size-32 rounded-full flex items-center justify-center border-4 border-[#19824f]">
            <img src={userInfo?.photo} className="size-28  rounded-full" />
          </div>

          <div>
            <p className="font-semibold text-2xl flex flex-row items-center">
              {userInfo?.name}
            </p>
          </div>
        </div>

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
          <button id="서비스" className="flex items-center py-2 h-1/2"
          onClick={()=>{
            window.open("https://open.kakao.com/o/sEsZl0Bh")
          }}>
            <CustomerService className="ml-4" />
            <span className="ml-5">1대1 문의 / 리뷰 남기기</span>
          </button>
        </div>

        <div
          id="로그아웃/탈퇴"
          className="relative w-full h-32 bg-white rounded-lg shadow-xl font-medium flex flex-col"
        >
          <button
            id="로그아웃"
            className="flex items-center py-2 border-b h-1/2 pl-5"
            onClick={() => {
              logoutUser();
              navigate("/");
            }}
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
