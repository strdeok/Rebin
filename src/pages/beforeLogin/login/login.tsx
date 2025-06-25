import {
  getAdditionalUserInfo,
  getRedirectResult,
  type UserCredential,
} from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import signIn from "../../../utils/firebase/googleLogin";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthFlow = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const userInfo = getAdditionalUserInfo(result as UserCredential);
          if (userInfo?.isNewUser) {
            navigate("/signup");
          } else {
            navigate("/main");
          }
        } else {
          signIn();
        }
      } catch (error) {
        console.error("인증 처리 에러:", error);
      }
    };

    handleAuthFlow();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-full">로그인 중...</div>
  );
}
