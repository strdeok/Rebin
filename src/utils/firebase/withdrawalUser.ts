import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

export async function withdrawalUser() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    alert("로그인이 필요합니다.");
    return;
  }

  const db = getFirestore();

  try {
    // 1) 사용자 프로필 삭제 (users 컬렉션의 프로필 문서)
    await deleteDoc(doc(db, "users", user.uid));

    // 2) 찜한 장소 삭제
    await deleteDoc(doc(db, "favoritesLocations", user.uid));

    // 3) Firebase Authentication에서 사용자 계정 삭제
    await deleteUser(user);

    alert("회원 탈퇴가 완료되었습니다.");
  } catch (error) {
    console.error("회원 탈퇴 실패:", error);
    alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
}
