import { createContext, useEffect, useState, type ReactNode } from "react";
import { currentUser } from "../api/authentication";
import type { User } from "../types/Types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (id: string, token: string) => Promise<void>;
  logout: () => void;
}

// Create and export the context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []); // ✅ only run once

  const login = async (id: string, token: string) => {
    const data = await currentUser(id, token);
    setUser(data);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
