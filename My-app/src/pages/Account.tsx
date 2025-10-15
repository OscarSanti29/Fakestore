import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export function Profile() {
  const auth = useContext(AuthContext);

  if (!auth?.user) return <p>No user logged in</p>;

  const { name, email, username, phone } = auth.user;
  return (
    <>
      <div>
        <div className="flex flex-col text-3xl font-semibold items-center">
          <h1 className="text-8xl m-10 capitalize">
            Welcome, {name.firstname} {name.lastname}
          </h1>
          <div className="w-64 h-64 rounded-full bg-[#105800] flex items-center justify-center">
            <i className="fa-solid fa-user text-[#b6ffa5] text-9xl" />
          </div>
          <div>
            {" "}
            <ul className="text-5xl text-[#105800]">
              <li className="m-5">Username: {username}</li>
              <li className="m-5">Email {email}</li>
              <li className="m-5">Phone {phone}</li>
            </ul>
          </div>

          <button
            onClick={auth.logout}
            className="bg-[#b6ffa5] cursor-pointer rounded-lg p-2 font-semibold shadow-xl hover:bg-[#105800] hover:text-white transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
