import React from "react";
import "./App.css";

function Attendance() {
  return (
    <div className="attendance">
      <h1>Attendance Management</h1>

      <h3>Student & Staff Attendance Tracking</h3>

      <form className="attendance-form">

        <input
          type="text"
          placeholder="Enter Name"
        />

        <select>
          <option>Select Role</option>
          <option>Student</option>
          <option>Teacher</option>
        </select>

        <input
          type="date"
        />

        <select>
          <option>Select Status</option>
          <option>Present</option>
          <option>Absent</option>
          <option>Leave</option>
        </select>

        <button type="submit">
          Mark Attendance
        </button>

      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Amit Kumar</td>
            <td>Student</td>
            <td>21-10-2026</td>
            <td>Present</td>
          </tr>

          <tr>
            <td>Rahul Kumar</td>
            <td>Teacher</td>
            <td>21-10-2026</td>
            <td>Present</td>
          </tr>

          <tr>
            <td>Priya Sharma</td>
            <td>Student</td>
            <td>21-10-2026</td>
            <td>Absent</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;