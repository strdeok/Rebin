import type { Dispatch, SetStateAction } from "react";
import { withdrawalUser } from "../../../../utils/firebase/deleteUser";
import { useNavigate } from "react-router-dom";

export default function WithdrawModal({
  setIsWithdrawModalOpen,
}: {
  setIsWithdrawModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        id="background"
        className="fixed top-0 bg-black/30 w-screen h-full z-40 backdrop-blur-xs"
      />
      <div className="w-84 h-70 bg-white z-50 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex flex-col font-medium text-xl p-8">
        <p className="text-2xl font-semibold">경고</p>
        <p className="mt-4">
          회원을 탈퇴할 시, <br />
          <span className="text-red-500">모든 정보가 사라집니다.</span>
          <br />
          정말 탈퇴하시겠습니까?
        </p>

        <div className="mt-8 flex justify-between text-white">
          <button
            className="bg-gray-400 px-6 py-3 rounded-lg font-medium"
            onClick={() => {
              setIsWithdrawModalOpen(false);
            }}
          >
            뒤로가기
          </button>
          <button
            className="bg-red-500 px-6 py-3 rounded-lg font-medium "
            onClick={() => {
              withdrawalUser();
              navigate("/");
            }}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </>
  );
}
