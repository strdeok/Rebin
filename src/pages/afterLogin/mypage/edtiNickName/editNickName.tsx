import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../../../assets/icons/User.svg?react";
import { changeNickName } from "../../../../api/changeNickName";

export default function EditNickName() {
  const [warning, setWarning] = useState<"safe" | "already" | "empty">("safe");
  const nicknameRef = useRef("");
  const navigate = useNavigate();

  const putChangeNickName = () => {
    changeNickName(nicknameRef.current)
      .then((res) => {
        if (res.success === true) {
          setTimeout(() => {
            navigate("/mypage");
          }, 3000);
        } else {
          setWarning("already");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* <SuccessModal /> */}
      <div className="flex flex-col items-center gap-5 mt-8">
        <div className="relative bg-[#d1d1d6] size-32 rounded-full flex items-center justify-center border-4 border-[#19824f]">
          <User fill="#7D8C8B" className="size-24" />
        </div>

        <div className="ml-6">
          <span className="font-semibold text-2xl ml-2">닉네임 변경</span>

          <input
            type="text"
            placeholder="변경할 닉네임을 입력해주세요."
            className={`border rounded-lg py-2 px-4 mt-2 w-[calc(100%-2rem)] ${
              warning !== "safe" && "border-red-600"
            }`}
            onChange={(e) => {
              nicknameRef.current = e.target.value.trim();
            }}
          />
          {warning === "empty" ? (
            <p className="text-red-600 ml-4 mt-2 text-xs">
              닉네임을 입력해주세요.
            </p>
          ) : warning === "already" ? (
            <p className="text-red-600 ml-4 mt-2 text-xs">
              이미 존재하는 닉네임입니다.
            </p>
          ) : null}
        </div>
      </div>

      <button
        className="fixed w-[calc(100%-2rem)] left-4 bottom-24 bg-[#19824f] text-white py-4 px-4 rounded-lg"
        onClick={() => {
          if (nicknameRef.current === "") {
            setWarning("empty");
          } else {
            putChangeNickName();
          }
        }}
      >
        수정하기
      </button>
    </>
  );
}
