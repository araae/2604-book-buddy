import { Link } from "react-router";
import { useAuth } from "./AuthContext";

//get the token and logout function from auth
//if logged in show books and account links
//if not logged in show books, register and login links
export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header>
      <Link to="/">Book Buddy</Link>
      <nav>
        <Link to="/">Books</Link>
        {token ? (
          <>
            <Link to="/account">Account</Link>
            <a onClick={() => logout()}>Log out</a>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
          </>
        )}
      </nav>
    </header>
  );
}
