import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
export function Navbar() {
  const auth = useContext(AuthContext);
  return (
    <>
      <div className="flex justify-between bg-[#105800] text-white">
        {auth?.user ? (
          <>
            <span className="text-xl font-semibold">
              {" "}
              Hello, {auth.user.name.firstname}!
            </span>
            <button onClick={auth.logout}>Logout</button>
            <Link to="/carts/user/:id">Cart</Link>
          </>
        ) : (
          <div>
            <span className="text-xl font-semibold">
              Please log in to access other features
            </span>
            <Link to="/"> Log in </Link>
          </div>
        )}
        <Link to="/products">Home</Link>

        <Link to="/profile">Profile</Link>
      </div>
    </>
  );
}
