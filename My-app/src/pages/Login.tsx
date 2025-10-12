import { useUsers } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { users, loading, error } = useUsers();
  const nav = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  function handleClick() {
    nav(`/products`);
  }
  return (
    <div>
      <button
        onClick={handleClick}
        className="rounded-xl bg-orange-500 p-1 cursor-pointer"
      >
        Continue as guest
      </button>{" "}
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name.firstname} {u.name.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
}
