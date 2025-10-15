import { useEffect, useState } from "react";
import { getCart } from "../api/authentication";
import type { Cart, Product } from "../types/Types";
import { useAuth } from "../hooks/useAuth";
import { getSingleProduct } from "../api/products";

interface CartWithProducts extends Cart {
  detailedProducts: { product: Product; quantity: number }[];
}

export function UserCarts() {
  const { user } = useAuth();
  const [carts, setCarts] = useState<CartWithProducts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadCart() {
      setLoading(true);
      try {
        const userCarts = await getCart(user.id);

        const cartsWithDetails: CartWithProducts[] = await Promise.all(
          userCarts.map(async (cart) => {
            const detailedProducts = await Promise.all(
              (cart.products || []).map(async (p) => {
                const product = await getSingleProduct(p.productId.toString());
                return { product, quantity: p.quantity };
              })
            );

            return { ...cart, detailedProducts };
          })
        );

        setCarts(cartsWithDetails);
      } catch (err) {
        console.error("Error loading carts", err);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, [user]);

  if (!user) return <p>Please log in to view carts</p>;
  if (loading) return <p>Loading carts...</p>;

  return (
    <div className="p-6">
      <h1 className="text-5xl text-[#105800] font-semibold mb-4 capitalize">
        {user.name.firstname}'s Carts
      </h1>

      {carts.length === 0 && <p>No carts found.</p>}

      {carts.map((cart) => {
        const totalPrice = cart.detailedProducts.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        return (
          <div key={cart.id} className="border p-4 my-4 rounded-lg shadow-sm">
            <p className="text-gray-600 mb-2">
              {" "}
              Date: {new Date(cart.date).toLocaleDateString()}
            </p>

            <ul className="space-y-2">
              {cart.detailedProducts.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex items-center gap-4 border-b pb-2"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-gray-500 text-sm">
                      {product.category} — ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium">Qty: {quantity}</p>
                  <p className="font-medium">
                    ${(product.price * quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <p className="font-bold mt-2 text-right">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
