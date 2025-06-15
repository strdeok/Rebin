import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export default async function getUserData(user: string) {
  const userRef = doc(db, "users", user);

  const userData = await getDoc(userRef);

  if (userData.exists()) {
    return(userData.data())
  } else {
    return ("error")
  }
}
