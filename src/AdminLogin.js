import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css"; 

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login Successful");
      navigate("/dashboard");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Admin Login</h1>
        <p>School / Coaching Institute ERP System</p>

        <form onSubmit={handleLogin}>
          <label>Username</label>
          <br />

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <br />
          <br />

          <label>Password</label>
          <br />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <br />

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;