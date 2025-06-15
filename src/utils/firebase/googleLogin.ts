// utils/firebase/googleLogin.ts
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  signInWithRedirect,
} from "firebase/auth";
import { app } from "../../../firebase";

export default async function signIn() {
  app;
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    await setPersistence(auth, browserSessionPersistence);
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("리디렉션 로그인 실패:", error);
    throw error;
  }
}
