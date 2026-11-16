import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaSchool,
  FaBullhorn,
  FaCog,
  FaSignOutAlt,
  FaGraduationCap,
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar({ sidebarOpen }) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <aside className={sidebarOpen ? "sidebar active" : "sidebar"}>

      <div className="sidebar-top">

        <div className="logo-box">

          <FaGraduationCap className="logo-icon" />

          <div>
            <h2>School ERP</h2>
            <p>Admin Panel</p>
          </div>

        </div>

      </div>

      <nav className="sidebar-menu">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaUserGraduate />
          <span>Students</span>
        </NavLink>

        <NavLink
          to="/teachers"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaChalkboardTeacher />
          <span>Teachers</span>
        </NavLink>

                <NavLink
          to="/classes"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaSchool />
          <span>Classes</span>
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaClipboardCheck />
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="/fees"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaMoneyBillWave />
          <span>Fees</span>
        </NavLink>

        <NavLink
          to="/notices"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaBullhorn />
          <span>Notices</span>
        </NavLink>

        <NavLink
          to="/dashboard"
          className="menu-item"
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </nav>

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={logout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;