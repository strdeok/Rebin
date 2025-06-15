import { getLikeLocation } from "./firebase/manageLikeLocations";

export const isLikeLocation = async (name: string) => {
  const likeLocation = await getLikeLocation();
  return likeLocation?.locations?.includes(name) ?? false;
};
