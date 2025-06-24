import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { app } from "../../../firebase";

export default async function signIn() {
  app;
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch {
    return "error";
  }
}
