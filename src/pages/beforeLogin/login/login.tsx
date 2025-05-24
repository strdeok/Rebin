import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/login").then((response) => {
      if(response.status === 200){
        navigate("/main")
      }
});
  }, []);

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      로그인 중..
    </div>
  );
}
