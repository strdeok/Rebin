import { getAuth, signOut } from "firebase/auth";

export function logoutUser() {
  const auth = getAuth();
  signOut(auth)
    .catch(() => {
      alert("다시 시도해주세요.")
    });
}
