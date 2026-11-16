import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import API from "./api/api";
import "./styles/login.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await API.post("/admin/login", {
        email,
        password,
      });

      if (res.data.success) {

        localStorage.setItem("token", res.data.token);

        if (remember) {
          localStorage.setItem(
            "admin",
            JSON.stringify(res.data.admin)
          );
        }

        alert("Login Successful");

        navigate("/dashboard");
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

    setLoading(false);

  };

  return (

    <div className="login-container">

      <div className="bg-circle bg1"></div>
      <div className="bg-circle bg2"></div>
      <div className="bg-circle bg3"></div>

      <div className="login-card">

        <div className="lock-box">
          <FaLock />
        </div>

        <h2>School ERP</h2>

        <p>
          Welcome Back Admin
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-box">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-box">

            <FaLock className="input-icon" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >

              {showPassword
                ? <FaEyeSlash/>
                : <FaEye/>}

            </span>

          </div>
                    <div className="login-options">

            <label className="remember-me">

              <input
                type="checkbox"
                checked={remember}
                onChange={(e) =>
                  setRemember(e.target.checked)
                }
              />

              <span>Remember Me</span>

            </label>

            <span className="forgot-password">
              Forgot Password?
            </span>

          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "LOGIN"}
          </button>

        </form>

      </div>

    </div>

  );
}

export default AdminLogin;