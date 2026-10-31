import React from "react";
import "./App.css";

function Classes() {
  return (
    <div className="classes">
      <h1>Class / Batch & Timetable Management</h1>

      <h3>Manage Classes, Batches and Timetable</h3>

      <form className="class-form">
        <input
          type="text"
          placeholder="Enter Class Name"
        />

        <input
          type="text"
          placeholder="Enter Batch Name"
        />

        <input
          type="text"
          placeholder="Enter Subject"
        />

        <input
          type="text"
          placeholder="Enter Teacher Name"
        />

        <input
          type="time"
        />

        <button type="submit">
          Save Class
        </button>
      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Class</th>
            <th>Batch</th>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>10th</td>
            <td>A</td>
            <td>Mathematics</td>
            <td>Rahul Kumar</td>
            <td>09:00 AM</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>9th</td>
            <td>B</td>
            <td>Science</td>
            <td>Neha Singh</td>
            <td>10:30 AM</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Classes;