import React from "react";
import "./App.css";
import "./styles/notice.css";

function Notices() {
  return (
    <div className="notices">
      <h1>Notice Board / Announcements</h1>

      <h3>School & Coaching Institute Notices</h3>

      <form className="notice-form">
        <input
          type="text"
          placeholder="Enter Notice Title"
        />ho gaya
        

        <textarea
          rows="5"
          placeholder="Enter Notice Description"
        ></textarea>

        <input
          type="date"
        />

        <button type="submit">
          Publish Notice
        </button>
      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Notice Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Holiday Notice</td>
            <td>School will remain closed on Sunday.</td>
            <td>21-10-2026</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>Exam Schedule</td>
            <td>Unit Test starts from 01 November 2026.</td>
            <td>22-10-2026</td>
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

export default Notices;