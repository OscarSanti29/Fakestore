import { getUsers } from "../api/authentication";
import type { User } from "../types/Types";
import { useState, useEffect } from "react";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { users, error, loading };
}
