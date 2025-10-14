import { useUsers } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { userLogin } from "../api/authentication";
import React, { useContext, useState } from "react";

export function Login() {
  const { users, loading, error } = useUsers();
  const auth = useContext(AuthContext);
  const nav = useNavigate();
  const [openindex, setOpenindex] = useState(null);

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

  const toggle = (index: any) => {
    setOpenindex(openindex === index ? null : index);
  };

  return (
    <div className="flex justify-between ">
      {" "}
      <div className=" w-1/2 bg-[#b6ffa5] h-dvh p-2 border-[#105800] border-r-4">
        <h1 className="text-black text-3xl text-center font-bold">
          User log ins
        </h1>
        <p className="text-black text-xl text-center font-semibold italic">
          Since this a FakeApi and no real users can be made and stored within
          the API. Here is a list of the hardcoded users of the UsersAPI from
          the FakestoreAPI
        </p>
        <div className="flex flex-col items-center ">
          {users.map((u, index) => (
            <div
              key={index}
              className="border rounded-xl shadow-2xl bg-white text-center w-1/2 m-3"
            >
              <button
                onClick={() => toggle(index)}
                className=" text-2xl m-2 font-semibold"
              >
                Name: {u.name.firstname} {u.name.lastname}
                {openindex === index ? (
                  <i className="fa-solid fa-chevron-up cursor-pointer"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down cursor-pointer"></i>
                )}
              </button>
              {openindex === index && (
                <div className="text-xl">
                  <p>Username:{u.username}</p>
                  <p>Password: {u.password}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="m-auto">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-3 bg-white  p-6 rounded-xl shadow-md w-80"
        >
          <h2 className="text-5xl font-bold ">Log in</h2>
          <label className="flex flex-col">
            <span className="text-md font-semibold mb-1">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="border rounded-lg p-2"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-md font-semibold mb-1">Password</span>
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
            className="bg-[#b6ffa5] rounded-lg py-2 font-semibold shadow-xl hover:bg-[#105800] hover:text-white transition"
          >
            {loadingLogin ? "Logging in..." : "Log in"}
          </button>{" "}
          <button
            onClick={handleGuest}
            className="bg-[#105800] text-white font-semibold rounded-lg py-2 shadow-xl hover:bg-[#b6ffa5] hover:text-black transition"
          >
            Continue as guest
          </button>
        </form>
      </div>
    </div>
  );
}
