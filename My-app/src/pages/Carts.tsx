import { useEffect, useState } from "react";
import { getCart } from "../api/authentication";
import type { Cart } from "../types/Types";
import { useAuth } from "../hooks/useAuth";

export function UserCarts() {
  const { user } = useAuth(); // ✅ get logged-in user from context
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getCart(user.id)
      .then(setCarts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) return <p>Please log in to view carts</p>;
  if (loading) return <p>Loading carts...</p>;

  return (
    <div>
      <h1>{user.name.firstname}'s Carts</h1>
      {carts.map((cart) => (
        <div key={cart.id} className="border p-2 my-2 rounded">
          <p>Date: {cart.date}</p>
          <ul>
            {cart.products.map((product) => (
              <li key={product.productId}>
                Product ID: {product.productId}, Quantity: {product.quantity}{" "}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
