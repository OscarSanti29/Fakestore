import { useUsers } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { userLogin } from "../api/authentication";
import React, { useContext, useState } from "react";

export function Login() {
  const { users, loading, error } = useUsers();
  const auth = useContext(AuthContext);
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setLoadingLogin(true);

    try {
      const data = await userLogin(username, password);

      const matchedUser = users.find((u) => u.username === username);
      if (!matchedUser) throw new Error("user not found");

      await auth?.login(matchedUser.id.toString(), data.token);

      nav("/products");
    } catch (err: any) {
      setFormError(err.message || "Login Failed");
    } finally {
      setLoadingLogin(false);
    }
  }

  function handleGuest() {
    nav(`/products`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <button
        onClick={handleGuest}
        className="rounded-xl bg-orange-500 text-white p-2 mb-6 hover:bg-orange-600 transition"
      >
        Continue as guest
      </button>

      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 bg-white p-6 rounded-xl shadow-md w-80"
      >
        <label className="flex flex-col">
          <span className="text-sm mb-1">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="border rounded-lg p-2"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm mb-1">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="border rounded-lg p-2"
          />
        </label>

        {formError && <p className="text-red-500 text-sm">{formError}</p>}

        <button
          type="submit"
          disabled={loadingLogin}
          className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
        >
          {loadingLogin ? "Logging in..." : "Login"}
        </button>
      </form>

      <ul className="mt-6">
        {users.map((u) => (
          <li key={u.id}>
            {u.name.firstname} {u.name.lastname} {u.username} {u.password}
          </li>
        ))}
      </ul>
    </div>
  );
}
