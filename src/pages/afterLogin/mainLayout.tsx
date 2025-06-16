import { Outlet } from "react-router-dom";
import BottomNavigation from "./_components/bottomNavigation";
import Header from "./_components/header";
import { CategoryProvider } from "../../state/categoryContext";
import { LocationProvider } from "../../state/nowLocationContext";

export default function MainLayout() {
  return (
    <LocationProvider>
      <CategoryProvider>
        <Header />
        <div className="relative h-[calc(100%-7.5rem)] top-12">
          <Outlet />
        </div>
        <BottomNavigation />
      </CategoryProvider>
    </LocationProvider>
  );
}
