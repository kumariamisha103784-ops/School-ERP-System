import React, { useState } from "react";
import axios from "axios";
import "./styles/attendance.css";

function AttendanceForm() {
  const [attendance, setAttendance] = useState({
    studentName: "",
    class: "",
    date: "",
    status: "Present",
  });

  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/attendance",
        attendance
      );

      alert("Attendance Added Successfully");

      setAttendance({
        studentName: "",
        class: "",
        date: "",
        status: "Present",
      });
    } catch (error) {
      console.log(error);
      alert("Error Adding Attendance");
    }
  };

  return (
    <div className="attendance-container">
      <h2>Add Attendance</h2>

      <form className="attendance-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={attendance.studentName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="class"
          placeholder="Class"
          value={attendance.class}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={attendance.date}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={attendance.status}
          onChange={handleChange}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button className="attendance-btn" type="submit">
          Add Attendance
        </button>

      </form>
    </div>
  );
}

export default AttendanceForm;