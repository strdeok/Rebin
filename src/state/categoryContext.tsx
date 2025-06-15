import { createContext, useContext, useState } from "react";
import type { CategoryType } from "../types/categoryType";

interface CategoryContextType {
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
}

const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("whole");

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("useCategory must be used within CategoryProvider");
  return context;
};
