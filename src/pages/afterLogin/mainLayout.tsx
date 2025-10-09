import { Outlet, useNavigate } from "react-router-dom";
import BottomNavigation from "./_components/bottomNavigation";
import Header from "./_components/header";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

export default function MainLayout() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <>
      <Header />
      <div className="relative h-[calc(100%-7.5rem)] top-12">
        <Outlet />
      </div>
      <BottomNavigation />
    </>
  );
}
