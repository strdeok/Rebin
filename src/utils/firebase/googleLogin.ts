import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithRedirect,
  browserSessionPersistence,
} from "firebase/auth";
import { app } from "../../../firebase";

export default async function signIn() {
  app;
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  await setPersistence(auth, browserSessionPersistence);
  await signInWithRedirect(auth, provider);
}
