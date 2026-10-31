import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Nav() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>School / Coaching Institute ERP System</h2>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/adminlogin">Admin Login</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/students">Students</Link>
        </li>

        <li>
          <Link to="/teachers">Teachers</Link>
        </li>

        <li>
          <Link to="/attendance">Attendance</Link>
        </li>

        <li>
          <Link to="/fees">Fees</Link>
        </li>

        <li>
          <Link to="/classes">Classes</Link>
        </li>

        <li>
          <Link to="/notices">Notices</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;