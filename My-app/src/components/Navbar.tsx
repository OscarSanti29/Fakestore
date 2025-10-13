import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
export function Navbar() {
  const auth = useContext(AuthContext);
  return (
    <>
      <div>
        {auth?.user ? (
          <>
            <span> Hello, {auth.user.name.firstname}!</span>
            <button onClick={auth.logout}>Logout</button>
          </>
        ) : (
          <div>
            <span>Please log in to access other features</span>
            <Link to="/"> Log in </Link>
          </div>
        )}
        <Link to="/products">Home</Link>

        <Link to="/profile">Profile</Link>
      </div>
    </>
  );
}
