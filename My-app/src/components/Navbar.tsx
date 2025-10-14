import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
export function Navbar() {
  const auth = useContext(AuthContext);
  return (
    <>
      <div className="flex bg-white justify-evenly shadow-xl text-[#105800] font-semibold p-2 mb-5">
        {auth?.user ? (
          <>
            <span className="text-2xl">
              {" "}
              Hello, {auth.user.name.firstname}!
            </span>
            <button
              onClick={auth.logout}
              className="text-2xl font-bold cursor-pointer"
            >
              Logout
            </button>
            <Link to="/carts/user/:id" className="text-2xl font-bold">
              Cart
            </Link>
          </>
        ) : (
          <div>
            <span className="text-2xl ">
              Please{" "}
              <Link
                to="/"
                className="font-bold italic p-1 rounded-lg hover:bg-[#105800] hover:text-white transition"
              >
                Log in
              </Link>{" "}
              to access other features
            </span>
          </div>
        )}
        <Link to="/products" className="text-2xl font-bold">
          Home
        </Link>

        <Link to="/profile" className="text-2xl font-bold">
          Profile
        </Link>
      </div>
    </>
  );
}
