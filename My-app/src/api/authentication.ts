import type { User } from "../types/Types";

const API = "https://fakestoreapi.com";

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API}/users`);
  if (!res.ok) throw new Error("Failed to get data");
  return res.json();
}
