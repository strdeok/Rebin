import { getAuth, deleteUser } from "firebase/auth";

export function withdrawalUser() {
  const auth = getAuth();
  const user = auth.currentUser;

  deleteUser(user!).catch(() => {
    alert("다시 시도해주세요.");
  });
}
