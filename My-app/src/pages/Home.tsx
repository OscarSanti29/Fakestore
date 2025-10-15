import { useState, useEffect } from "react";
import { ProductCard } from "../components/Product-card";
import { useProducts } from "../hooks/useProducts";
import { getProductsbyCategory } from "../api/products";
import { Categories } from "../components/Category";
import { SearchBar } from "../components/Searchbar";

export function Home() {
  const { products, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  //  Sync products when category or search changes
  useEffect(() => {
    let result = products;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery]);

  //  Category select handler
  async function handleCategorySelect(category: string) {
    setSelectedCategory(category);
    if (category === "") setFilteredProducts(products);
    else {
      try {
        const productsByCategory = await getProductsbyCategory(category);
        setFilteredProducts(productsByCategory);
      } catch (err) {
        console.error("Error loading category:", err);
      }
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex m-5">
        <SearchBar onSearch={setSearchQuery} />
        <Categories onSelectCategory={handleCategorySelect} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5 place-items-center">
        {" "}
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center">No products found.</p>
        ) : (
          filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </div>
  );
}
