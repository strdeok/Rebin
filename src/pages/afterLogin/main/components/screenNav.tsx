import { useState} from "react";

import TrashBin from "../../../../assets/icons/TrashBin.svg?react";
import Battery from "../../../../assets/icons/Battery.svg?react";
import Pill from "../../../../assets/icons/Pill.svg?react";
import Bottle from "../../../../assets/icons/Bottle.svg?react";
import type { CategoryType } from "../../../../type/categoryType";
import { useCategory } from "../../../../state/categoryContext";

interface CategoryItem {
  title: string;
  icon: any;
  value: CategoryType;
}

const categories: CategoryItem[] = [
  { title: "폐의약품", icon: <Pill fill="white" />, value: "pill" },
  { title: "공병", icon: <Bottle fill="white" />, value: "bottle" },
  { title: "배터리", icon: <Battery fill="white" />, value: "battery" },
];

export default function ScreenNav() {
  const [isOpen, setIsOpen] = useState(false);
    const { setSelectedCategory } = useCategory();

  const handleMainClick = () => setIsOpen((prev) => !prev);

  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  const CircleButton = ({
    onClick,
    children,
    id,
  }: {
    onClick: () => void;
    children: React.ReactNode;
    id?: string;
  }) => (
    <button
      id={id}
      onClick={onClick}
      className="size-[4.5rem] bg-[#19824F] rounded-full flex flex-col items-center justify-center shadow-md z-30"
    >
      {children}
    </button>
  );

  return (
    <>
      {/* Sub Buttons */}
      <div
        className={`flex fixed w-full gap-10 justify-center transition-all duration-100 z-30
          ${isOpen ? "bottom-24" : "bottom-0 hidden"}`}
      >
        {categories.map(({ title, icon, value }) => (
          <div
            key={value}
            className="flex flex-col items-center text-[#19824F] font-medium"
          >
            {isOpen && <span>{title}</span>}
            <CircleButton onClick={() => handleCategorySelect(value)}>
              {icon}
            </CircleButton>
          </div>
        ))}
      </div>

      {/* Main Button */}
      <div className="flex flex-col items-center z-30 text-[#19824F] font-semibold">
        <CircleButton id="main-button" onClick={handleMainClick}>
          <TrashBin fill="white" />
        </CircleButton>
      </div>
    </>
  );
}
