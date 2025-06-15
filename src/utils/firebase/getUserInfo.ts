import { getAuth, onAuthStateChanged } from "firebase/auth";
import getUserData from "./getUserData";

export default function getUserInfo(): Promise<any> {
  return new Promise((resolve, reject) => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // 메모리 누수 방지. 관찰 해제

      if (user) {
        resolve(getUserData(user.uid));
      } else {
        reject("error");
      }
    });
  });
}
