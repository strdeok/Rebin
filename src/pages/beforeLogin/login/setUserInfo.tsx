// 예: AfterLoginForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../utils/firebase/registerUser";
import { createLikeLocations } from "../../../utils/firebase/manageLikeLocations";
import Next from "../../../assets/icons/Next.svg?react";

export default function SetUserInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<{
    name: string;
    phone: string;
    agree: boolean;
  }>({
    name: "",
    phone: "",
    agree: false,
  });

  const isValidPhone = (phone: string) => {
    const onlyNumber = phone.replace(/-/g, "");
    return /^010\d{8}$/.test(onlyNumber);
  };

  const requirements: boolean =
    inputValue.name.trim().length > 0 &&
    isValidPhone(inputValue.phone) &&
    inputValue.agree;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await createLikeLocations();
      await registerUser(inputValue.name, inputValue.phone.replace(/\D/g, ""));
      navigate("/main");
    } catch (err) {
      console.error("handleSubmit error:", err); // 에러 로그 찍기
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <p className="text-2xl font-semibold mb-4">환영합니다!</p>

      <input
        placeholder="닉네임을 입력해주세요."
        value={inputValue!.name}
        onChange={(e) =>
          setInputValue({ ...inputValue!, name: e.target.value })
        }
        className="border p-2.5 w-full rounded-md"
      />
      <input
        placeholder="전화번호를 입력해주세요."
        value={inputValue.phone}
        onChange={(e) =>
          setInputValue({
            ...inputValue,
            phone: e.target.value,
          })
        }
        className="border p-2.5 mt-2 w-full rounded-md"
      />

      <button
        className="flex flex-row items-center w-full mt-4"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <div className="inline-flex items-center mr-4 ">
          <label className="flex items-center cursor-pointer relative">
            <input
              type="checkbox"
              checked={inputValue!.agree}
              onClick={(e) => {
                e.stopPropagation();
                setInputValue({ ...inputValue!, agree: false });
              }}
              className="peer h-5 w-5  cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
              id="check1"
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
        </div>
        개인정보 동의 <Next />
      </button>

      {isModalOpen && (
        <div className="absolute w-5/6 bg-white border rounded-lg p-4 flex flex-col gap-2">
          <p className="font-semibold text-xl">개인정보 수집 및 이용 동의</p>
          <p>
            본 서비스는 Google 로그인을 통해 아래와 같은 개인정보를 수집 및
            이용합니다.
          </p>

          <strong>1. 수집 항목</strong>
          <ul>
            <li>이름, 이메일 주소, 프로필 사진 (Google 로그인 시 자동 수집)</li>
            <li>포인트 교환 시: 수령자 이름, 연락처</li>
          </ul>

          <strong>2. 이용 목적</strong>
          <ul>
            <li>회원 식별 및 서비스 제공</li>
            <li>포인트 적립 및 상품권 교환</li>
            <li>상품권 발송 및 고객 문의 응대</li>
          </ul>

          <strong>3. 보유 기간</strong>
          <ul>
            <li>회원 탈퇴 시까지 또는 관계 법령에 따른 보관 기간</li>
          </ul>

          <p className="mt-4">
            귀하는 동의를 거부할 권리가 있으나, 동의하지 않을 경우 서비스 이용이
            제한될 수 있습니다.
          </p>

          <label className="text-sm text-center mt-6">
            위 내용을 확인하였으며, 개인정보 수집 및 이용에 동의합니다.
          </label>
          <button
            className="bg-blue-500 text-white p-2 mt-2"
            onClick={() => {
              setIsModalOpen(false);
              setInputValue({ ...inputValue!, agree: true });
            }}
          >
            동의하기
          </button>
        </div>
      )}
      <button
        disabled={!requirements}
        onClick={handleSubmit}
        className={`${
          !requirements ? "bg-gray-300" : "bg-blue-500"
        } text-white p-2 mt-2 w-full rounded-lg`}
      >
        제출
      </button>
    </div>
  );
}
