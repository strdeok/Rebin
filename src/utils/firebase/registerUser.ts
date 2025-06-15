import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase"; 

export const registerUser = async (name: string, phone: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 상태가 아님");

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    name,
    phone,
    photo: user.photoURL,
    createdAt: new Date(),
  });
};
