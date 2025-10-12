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
    <>
      <div>
        <img src={product.image} alt={product.title} />
        <h1>{product.title}</h1>
        <p>{formatCurrency(product.price)}</p>
        <button onClick={handleClick}>Details</button>
      </div>
    </>
  );
}
