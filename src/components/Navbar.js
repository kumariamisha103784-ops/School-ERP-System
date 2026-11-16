import React, { useState } from "react";
import {
  FaBars,
  FaMoon,
  FaSun,
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

import "../styles/navbar.css";

function Navbar({ toggleSidebar }) {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-theme");
    setDarkMode(!darkMode);
  };

  return (

    <header className="navbar">

      {/* Left */}

      <div className="navbar-left">

        <div>

          <h2>Dashboard</h2>

          <p>Welcome Back Administrator</p>

        </div>

      </div>

      {/* Right */}

      <div className="navbar-right">

        <button
          className="menu-btn"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <button
          className="theme-btn"
          onClick={toggleDarkMode}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="nav-icon">

          <FaEnvelope />

          <span className="badge">
            2
          </span>

        </div>

        <div className="nav-icon">

          <FaBell />

          <span className="badge">
            5
          </span>

        </div>

                <div className="profile">

          <FaUserCircle className="profile-icon" />

          <div className="profile-details">

            <h4>Admin</h4>

            <span>Administrator</span>

          </div>

          <FaChevronDown className="down-icon" />

        </div>

      </div>

    </header>

  );

}

export default Navbar;