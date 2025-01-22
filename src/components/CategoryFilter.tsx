import type { Category } from "../types/event";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const categories: Category[] = ["All", "Sport", "Music", "Food", "Art"];

  return (
    <div className="mb-2">
      <ScrollArea className="mt-8 max-w-[600px] lg:mt-10 lg:max-w-none">
        <div className="flex w-max space-x-2 pb-3 lg:space-x-5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors first-letter:uppercase ${
                activeCategory === category
                  ? "bg-orange-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category === "All" ? (
                category
              ) : (
                <span className="flex items-center gap-2">
                  {category === "Sport" && "🎯"}
                  {category === "Music" && "🎵"}
                  {category === "Food" && "🍽️"}
                  {category === "Art" && "🎨"}
                  {category}
                </span>
              )}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
