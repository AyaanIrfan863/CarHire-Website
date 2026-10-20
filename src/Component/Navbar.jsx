import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check karo user login hai ya nahi
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    // Jab bhi login/logout ho toh auto update karo
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
        Car <sub>Hire</sub>
      </NavLink>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${menuOpen ? "menu-open" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/gallery" onClick={closeMenu}>
          Gallery
        </NavLink>

        <NavLink to="/services" onClick={closeMenu}>
          Services
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>

        {/* <NavLink to="/blog" onClick={closeMenu}>
          Blog
        </NavLink> */}

        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>

        {/* ===== Yahan magic hai ===== */}
        {user ? (
          <NavLink
            to="/id"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "login-btn active" : "login-btn"
            }
          >
            ID
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "login-btn active" : "login-btn"
            }
          >
            sign up
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;