import { useNavigate } from "react-router-dom";
import Google from "../../assets/icons/Google.svg?react";
import signIn from "../../utils/firebase/googleLogin";
import {
  browserSessionPersistence,
  getRedirectResult,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { useEffect } from "react";

export default function OnBoarding() {
  useEffect(() => {
    getRedirectResult(auth)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("실패");
      });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col px-8 font-semibold">
      <div className="mt-12 ml-4">
        <p className="text-[#19824F] text-5xl mb-2">리빈</p>
        <p className="text-2xl ">
          주변 수거함 찾고, <br />
          리워드까지 한번에!
        </p>
      </div>

      <img
        src="/images/온보딩 그림.png"
        alt="onboardin picture"
        className="mt-18"
      />

      <button
        className="mt-18 bg-[#19824F] h-16 flex flex-row items-center justify-center rounded-lg  text-white text-xl"
        onClick={async () => {
          // signIn();
          // navigate("/login");
          const provider = new GoogleAuthProvider();
          await setPersistence(auth, browserSessionPersistence);
          await signInWithPopup(auth, provider);
        }}
      >
        <Google className="mr-2" /> 로그인
      </button>
    </div>
  );
}
