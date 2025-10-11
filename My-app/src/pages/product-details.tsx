import { useSingleProduct } from "../hooks/useSingleProduct";

export default function ProductInfo() {
  const { product, loading, error } = useSingleProduct();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.title}</h1>
    </div>
  );
}
