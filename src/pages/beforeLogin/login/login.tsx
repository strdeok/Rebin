import { getRedirectResult, onAuthStateChanged, getAdditionalUserInfo } from "firebase/auth";
import { useEffect } from "react";
import { type UserCredential } from "firebase/auth";
import { auth } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import signIn from "../../../utils/firebase/googleLogin";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/main");
      }
    });

    const func = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const isNewUser = getAdditionalUserInfo(result as UserCredential);
          if (isNewUser?.isNewUser) {
            navigate("/signup");
          } else {
            navigate("/main");
          }
        } else {
          await signIn();
        }
      } catch (error) {
        console.error(error);
      }
    };
    func();
  }, []);

  return (
    <div className="flex justify-center items-center h-full">로그인 중...</div>
  );
}
