import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import type { Poi } from "../../types/poi";

export const createLikeLocations = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 상태가 아님");

  await setDoc(doc(db, "favoritesLocations", user.uid), {
    id: user.uid,
    locations: [],
    createdAt: new Date(),
  });
};

export const addLikeLocation = async (location: Poi | undefined) => {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 상태가 아님");

  const ref = doc(db, "favoritesLocations", user.uid);
  await updateDoc(ref, {
    locations: arrayUnion(location),
  });
};

export const getLikeLocation = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 상태가 아님");

  const docRef = doc(db, "favoritesLocations", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const removeLikeLocation = async (location: string | undefined) => {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인 상태가 아님");

  const ref = doc(db, "favoritesLocations", user.uid);
  await updateDoc(ref, {
    locations: arrayRemove(location),
  });
};
