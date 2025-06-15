import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { app } from "../../../firebase";

export default async function signIn() {
  app;
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    await setPersistence(auth, browserSessionPersistence);
    const result = signInWithPopup(auth, provider);
    return await result;
  } catch {
    return "error";
  }
}
