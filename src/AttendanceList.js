import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/attendance.css";

function AttendanceList() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance");
      setAttendance(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAttendance = async (id) => {
    if (!window.confirm("Are you sure you want to delete this attendance?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/attendance/${id}`);
      alert("Attendance Deleted Successfully");
      fetchAttendance();
    } catch (err) {
      console.log(err);
      alert("Error deleting attendance");
    }
  };

  return (
    <div className="attendance-container">
      <h2>Attendance List</h2>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {attendance.length > 0 ? (
              attendance.map((item) => (
                <tr key={item._id}>
                  <td>{item.studentName}</td>
                  <td>{item.class}</td>
                  <td>
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="attendance-btn"
                      onClick={() => deleteAttendance(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Attendance Records Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceList;