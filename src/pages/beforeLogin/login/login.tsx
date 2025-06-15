import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRedirectResult,
  getAuth,
  type UserCredential,
  getAdditionalUserInfo,
} from "firebase/auth";
import signIn from "../../../utils/firebase/googleLogin";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      const auth = getAuth();

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
          await signIn();
        }
      } catch (err) {
        console.error("로그인 에러:", err);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate("/");
      }
    };

    handleLogin();
  }, []);

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      로그인 중...
    </div>
  );
}
