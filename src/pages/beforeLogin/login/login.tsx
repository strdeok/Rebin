import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import siginIn from "../../../utils/firebase/googleLogin";
import { getAdditionalUserInfo, type UserCredential } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    siginIn()
      .then((res) => {
        const userInfo = getAdditionalUserInfo(res as UserCredential);
        userInfo?.isNewUser ? navigate("/signup") : navigate("/main");
      })
      .catch((err) => {
        console.log(err)
        alert("로그인에 문제가 발생하였습니다. 다시 시도해주세요.");
        navigate("/");
      });
  }, []);

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      로그인 중...
    </div>
  );
}
