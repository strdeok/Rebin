import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import TrashBin from "../../../../assets/icons/TrashBin.svg?react";
import Pill from "../../../../assets/icons/Pill.svg?react";
import Close from "../../../../assets/icons/Close.svg?react";
import Bottle from "../../../../assets/icons/Bottle.svg?react";
import type { CategoryType } from "../../../../types/categoryType";
import { useCategory } from "../../../../state/categoryContext";

interface CategoryItem {
  title: string;
  icon: any;
  value: CategoryType;
}

const categories: CategoryItem[] = [
  { title: "폐의약품", icon: <Pill fill="white" />, value: "pill" },
  { title: "공병", icon: <Bottle fill="white" />, value: "bottle" }
];

export default function ScreenNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<CategoryType | null>(null);
  const { setSelectedCategory } = useCategory();

  const handleMainClick = () => {
    setIsOpen((prev) => !prev);
    if (selected) {
      setSelected(null);
      setSelectedCategory("whole");
    }
  };

  const handleCategorySelect = (category: CategoryType) => {
    if (selected === category) {
      // 다시 클릭 시 전체로 복귀
      setSelected(null);
      setSelectedCategory("whole");
      setIsOpen(true);
    } else {
      setSelected(category);
      setSelectedCategory(category);
      setIsOpen(false);
    }
  };

  const CircleButton = ({
    onClick,
    children,
    isSelected,
    id,
  }: {
    onClick: () => void;
    children: React.ReactNode;
    isSelected?: boolean;
    id?: string;
  }) => (
    <motion.button
      id={id}
      onClick={onClick}
      layout
      className={`size-[3.5rem] bg-[#19824F] rounded-full flex flex-col items-center justify-center shadow-md z-30 border-4 
        ${isSelected ? "border-red-500" : "border-transparent"}`}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  );

  return (
    <>
      {/* Sub Buttons */}
      <AnimatePresence>
        {!selected && isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="flex fixed w-full gap-10 justify-center bottom-24 z-30"
          >
            {categories.map(({ title, icon, value }) => (
              <motion.div
                key={value}
                className="flex flex-col items-center text-[#19824F] font-medium"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4 }}
              >
                <span>{title}</span>
                <CircleButton
                  onClick={() => handleCategorySelect(value)}
                  isSelected={false}
                >
                  {icon}
                </CircleButton>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Button Center */}
      {selected && (
        <motion.div
          layout
          className="flex fixed w-full justify-center bottom-24 z-30"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative">
            {/* 닫기 아이콘 (왼쪽 상단 고정 위치) */}
            <button
              className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1"
              onClick={() => {
                setSelected(null);
                setIsOpen(true);
                setSelectedCategory("whole");
              }}
            >
              <Close className="w-4 h-4" fill="white" />
            </button>

            <CircleButton
              onClick={() => handleCategorySelect(selected)}
              isSelected={true}
            >
              {categories.find((cat) => cat.value === selected)?.icon}
            </CircleButton>
          </div>
        </motion.div>
      )}

      {/* Main Button */}
      <div className="flex-1 flex flex-col items-center z-30 text-[#19824F] font-semibold">
        <CircleButton id="main-button" onClick={handleMainClick}>
          <TrashBin fill="white" />
        </CircleButton>
      </div>
    </>
  );
}
