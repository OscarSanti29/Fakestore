import type { Product } from "../types/Types";
import { formatCurrency } from "../utils/formatcurrency";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const nav = useNavigate();

  function handleClick() {
    nav(`/products/${product.id}`);
  }

  return (
    <div className="group w-96 h-80 [perspective:1000px] cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* FRONT */}
        <div className="absolute w-full h-full bg-white rounded-xl shadow-xl flex flex-col items-center justify-center p-4 backface-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-48 h-48 object-contain mb-3"
          />

          <p className="text-2xl font-semibold text-[#105800]">
            {formatCurrency(product.price)}
          </p>
        </div>

        {/* BACK */}
        <div className="absolute w-full h-full bg-[#b6ffa5] rounded-xl shadow-xl flex flex-col items-center justify-center p-4 [transform:rotateY(180deg)] backface-hidden">
          <h1 className="text-center text-2xl font-semibold line-clamp-2">
            {product.title}
          </h1>
          <p className="text-lg text-gray-700 text-center line-clamp-4">
            Ordered this month: {product.rating.count}
          </p>
          <p className="text-lg text-gray-700 text-center line-clamp-4">
            Rating: {product.rating.rate} out of 5
          </p>
          <button
            onClick={handleClick}
            className="mt-4 px-4 py-2 font-semibold bg-white text-[#105800] rounded-lg hover:bg-[#105800] hover:text-white transition"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
