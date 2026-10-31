import React from "react";
import "./App.css";

function Students() {
  return (
    <div className="students">
      <h1>Student Management</h1>

      <h3>Add / Edit / View Student Profiles</h3>

      <form className="student-form">
        <input
          type="text"
          placeholder="Enter Student Name"
        />

        <input
          type="text"
          placeholder="Enter Roll Number"
        />

        <input
          type="text"
          placeholder="Enter Class"
        />

        <input
          type="text"
          placeholder="Enter Batch"
        />

        <button type="submit">
          Add Student
        </button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Class</th>
            <th>Batch</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>101</td>
            <td>Amit Kumar</td>
            <td>10th</td>
            <td>A</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>102</td>
            <td>Priya Sharma</td>
            <td>9th</td>
            <td>B</td>
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

export default Students;
