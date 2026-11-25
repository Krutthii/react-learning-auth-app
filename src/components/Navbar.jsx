import { NavLink, Link, useNavigate } from "react-router-dom";
import { logout } from "../auth";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const out = () => { logout(); setUser(null); navigate("/login"); };

  return (
    <header className="navbar">
      <Link to="/" className="brand">Acme</Link>
      <nav className="nav-links" aria-label="Main">
        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <button type="button" className="link-btn" onClick={out}>Log out</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}