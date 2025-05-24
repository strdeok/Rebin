import { Outlet } from "react-router-dom";
import BottomNavigation from "./_components/bottomNavigation";
import Header from "./_components/header";
import { CategoryProvider } from "../../state/categoryContext";

export default function MainLayout() {
  return (
    <CategoryProvider>
      <Header />
      <div className="relative h-[calc(100%-7.5rem)] top-12">
        <Outlet />
      </div>
      <BottomNavigation />
    </CategoryProvider>
  );
}
