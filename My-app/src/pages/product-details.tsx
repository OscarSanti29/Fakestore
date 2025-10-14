import { useSingleProduct } from "../hooks/useSingleProduct";

export default function ProductInfo() {
  const { product, loading, error } = useSingleProduct();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1 className="text-5xl font-bold text-center italic m-10">
        {product.title}
      </h1>
      <div>
        <img src={product.image} alt={product.title} className="m-auto" />
        <div className="p-10 text-2xl font-semibold m-auto bg-[#b6ffa5] text-[#105800] mt-5 border-[#105800] border-t-2">
          <p className="text-5xl border-b-2 border-[#105800] m-5 p-4 ">
            Price: {product.price}
          </p>
          <h2 className="text-5xl border-b-2 border-[#105800] m-5 p-4">
            Description: <p className="text-3xl">{product.description}</p>
          </h2>
          <p className="text-5xl border-b-2 border-[#105800] m-5 p-4">
            Rating: {product.rating.rate} out of 5
          </p>
        </div>
      </div>
    </div>
  );
}
