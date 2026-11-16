import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardCards from "./components/DashboardCards";
import AttendanceChart from "./components/AttendanceChart";
import FeeChart from "./components/FeeChart";
import RecentStudents from "./components/RecentStudents";
import RecentNotices from "./components/RecentNotices";

import "./styles/dashboard.css";

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    attendance: 0,
    fees: 0,
    notices: 0,
  });

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const [
        students,
        teachers,
        classes,
        attendance,
        fees,
        notices,
      ] = await Promise.all([
        axios.get("http://localhost:5000/api/students"),
        axios.get("http://localhost:5000/api/teachers"),
        axios.get("http://localhost:5000/api/classes"),
        axios.get("http://localhost:5000/api/attendance"),
        axios.get("http://localhost:5000/api/fees"),
        axios.get("http://localhost:5000/api/notices"),
      ]);

      setCounts({
        students: students.data.count || students.data.data.length,
        teachers: teachers.data.count || teachers.data.data.length,
        classes: classes.data.count || classes.data.data.length,
        attendance: attendance.data.count || attendance.data.data.length,
        fees: fees.data.count || fees.data.data.length,
        notices: notices.data.count || notices.data.data.length,
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
        <div
      className={
        sidebarOpen
          ? "dashboard-layout sidebar-open"
          : "dashboard-layout"
      }
    >
      <Sidebar sidebarOpen={sidebarOpen} />

      <div className="dashboard-main">

        <Navbar toggleSidebar={toggleSidebar} />

        <div className="dashboard-content">

          <div className="dashboard-header">

            <div>
              <h1 className="dashboard-title">
                School ERP Dashboard
              </h1>

              <p className="dashboard-subtitle">
                Welcome Back Administrator 👋
              </p>
            </div>

          </div>

          <DashboardCards counts={counts} />

          <div className="dashboard-row">

            <div className="dashboard-box">
              <h3>Attendance Overview</h3>
              <AttendanceChart />
            </div>

            <div className="dashboard-box">
              <h3>Fee Collection Overview</h3>
              <FeeChart />
            </div>

          </div>
                    <div className="dashboard-row">

            <div className="dashboard-box">
              <RecentStudents />
            </div>

            <div className="dashboard-box">
              <RecentNotices />
            </div>

          </div>

        </div>

      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
          </div>
  );
}

export default Dashboard;