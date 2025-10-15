import type { Product } from "../types/Types";

const API = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API}/products`);
  if (!res.ok) throw new Error("Faied to get data");
  return res.json();
}

export async function getSingleProduct(id: string): Promise<Product> {
  const res = await fetch(`${API}/products/${id}`);
  if (!res.ok) throw new Error("Failed to find item");
  return res.json();
}

export async function getCategory(): Promise<string[]> {
  const res = await fetch(`${API}/products/categories`);
  if (!res.ok) throw new Error(`Failed to get categories`);
  return res.json();
}

export async function getProductsbyCategory(category: string) {
  const res = await fetch(`${API}/products/category/${category}`);
  if (!res.ok) throw new Error(`Failed to get products for ${category}`);
  return res.json();
}
