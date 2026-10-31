import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <h1>Admin Dashboard</h1>
      <p>Welcome to School / Coaching Institute ERP System</p>

      <div className="dashboard-container">

        <div className="card">
          <h2>👨‍🎓 Students</h2>
          <p>Total Students</p>
          <Link to="/students">
            <button>View</button>
          </Link>
        </div>

        <div className="card">
          <h2>👩‍🏫 Teachers</h2>
          <p>Total Teachers</p>
          <Link to="/teachers">
            <button>View</button>
          </Link>
        </div>

        <div className="card">
          <h2>📅 Attendance</h2>
          <p>Student & Staff Attendance</p>
          <Link to="/attendance">
            <button>View</button>
          </Link>
        </div>

        <div className="card">
          <h2>💰 Fees</h2>
          <p>Fee Management</p>
          <Link to="/fees">
            <button>View</button>
          </Link>
        </div>

        <div className="card">
          <h2>🏫 Classes</h2>
          <p>Class & Timetable</p>
          <Link to="/classes">
            <button>View</button>
          </Link>
        </div>

        <div className="card">
          <h2>📢 Notices</h2>
          <p>Notice Board</p>
          <Link to="/notices">
            <button>View</button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;