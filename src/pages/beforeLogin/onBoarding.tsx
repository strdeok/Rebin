import { useNavigate } from "react-router-dom";
import Google from "../../assets/icons/Google.svg?react";
import {
  browserLocalPersistence,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { useEffect } from "react";

export default function OnBoarding() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else console.log(user);
    });
    const func = async () => {
      const result = await getRedirectResult(auth);
      if (result) {
        console.log(result);
      } else {
        console.log("실패");
      }
    };
    func();
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
          const provider = new GoogleAuthProvider();
          await setPersistence(auth, browserLocalPersistence);
          await signInWithRedirect(auth, provider);
        }}
      >
        <Google className="mr-2" /> 로그인
      </button>
    </div>
  );
}
