import type { User } from "../types/Types";
import type { Cart } from "../types/Types";

const API = "https://fakestoreapi.com";

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API}/users`);
  if (!res.ok) throw new Error("Failed to get data");
  return res.json();
}

export async function userLogin(
  username: string,
  password: string
): Promise<{ token: string }> {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Login Failed: ${res.status} ${message}`);
  }

  return res.json(); // { token: string }
}

export async function currentUser(id: string, token: string): Promise<User> {
  try {
    const res = await fetch(`${API}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(`Failed to find user: ${res.status} ${message}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}

export async function getCart(userId: number): Promise<Cart[]> {
  const res = await fetch(`${API}/carts/user/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch carts");
  return res.json();
}
