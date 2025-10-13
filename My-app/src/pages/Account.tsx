import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export function Profile() {
  const auth = useContext(AuthContext);

  if (!auth?.user) return <p>No user logged in</p>;

  const { name, email, username, phone } = auth.user;
  return (
    <>
      <div>
        <div>
          <h1>
            Welcome, {name.firstname} {name.lastname}
          </h1>
          <ul>
            <li>
              <strong> Username: {username}</strong>
            </li>
            <li>
              <strong> Email {email}</strong>
            </li>
            <li>
              <strong> Phone {phone}</strong>
            </li>
          </ul>
          <button onClick={auth.logout}>Log Out</button>
        </div>
      </div>
    </>
  );
}
