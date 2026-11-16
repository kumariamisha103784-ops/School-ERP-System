import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#4facfe,#00f2fe)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          textAlign: "center",
          width: "500px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h1>🎓 School ERP System</h1>

        <p style={{ margin: "20px 0" }}>
          Student • Teacher • Attendance • Fees • Classes • Notices
        </p>

        <Link to="/adminlogin">
          <button className="btn">Admin Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;