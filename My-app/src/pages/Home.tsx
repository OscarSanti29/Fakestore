import { useState, useEffect } from "react";
import { ProductCard } from "../components/Product-card";
import { useProducts } from "../hooks/useProducts";
import { getProductsbyCategory } from "../api/products";
import { Categories } from "../components/Category";

export function Home() {
  const { products, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Always sync filteredProducts with products
  useEffect(() => {
    if (!selectedCategory) {
      // Show all products if no category selected
      setFilteredProducts(products);
    }
  }, [products, selectedCategory]);

  async function handleCategorySelect(category: string) {
    setSelectedCategory(category);

    if (category === "") {
      // Show all products
      setFilteredProducts(products);
      return;
    }

    try {
      const productsByCategory = await getProductsbyCategory(category);
      setFilteredProducts(productsByCategory);
    } catch (err) {
      console.error("Error loading category:", err);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Categories dropdown */}
      <Categories onSelectCategory={handleCategorySelect} />

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center">No products found.</p>
        ) : (
          filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </div>
  );
}
