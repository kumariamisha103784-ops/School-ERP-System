import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">
        <h2>🎓 School ERP</h2>
        <p>Admin Panel</p>
      </div>

      <ul>

        <li>
          <Link to="/dashboard">📊 Dashboard</Link>
        </li>

        <li>
          <Link to="/studentlist">👨‍🎓 Students</Link>
        </li>

        <li>
          <Link to="/teacherlist">👩‍🏫 Teachers</Link>
        </li>

        <li>
          <Link to="/attendancelist">📅 Attendance</Link>
        </li>

        <li>
          <Link to="/feelist">💰 Fees</Link>
        </li>

        <li>
          <Link to="/classes">🏫 Classes</Link>
        </li>

        <li>
          <Link to="/noticelist">📢 Notices</Link>
        </li>

        <li>
          <Link to="/adminlogin">🚪 Logout</Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;