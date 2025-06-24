import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signInWithRedirect,
} from "firebase/auth";
import { app } from "../../../firebase";

export default async function signIn() {
  app;
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  await setPersistence(auth, browserLocalPersistence);
  await signInWithRedirect(auth, provider);
}
