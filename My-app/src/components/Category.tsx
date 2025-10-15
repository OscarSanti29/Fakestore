import { useState, useEffect } from "react";
import { getCategory } from "../api/products";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

export function Categories({ onSelectCategory }: CategoriesProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategory();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    // Pass empty string to Home for “All Categories”
    onSelectCategory(category === "All Categories" ? "" : category);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center text-xl gap-2 border-gray-300 bg-white text-[#105800] hover:bg-gray-50"
          >
            {selectedCategory}
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60 bg-white shadow-lg border rounded-lg text-[#105800]">
          <DropdownMenuItem
            onClick={() => handleSelect("All Categories")}
            className="text-xl font-semibold"
          >
            All Categories
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => handleSelect(category)}
              className="capitalize text-xl font-semibold"
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
