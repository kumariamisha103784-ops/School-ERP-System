import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "./api/api";
import "./styles/attendance.css";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const attendancePerPage = 10;

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await API.get("/attendance");

      if (res.data.success) {
        setAttendance(res.data.data || []);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  const deleteAttendance = async (id) => {
    if (!window.confirm("Delete this attendance record?")) return;

    try {
      await API.delete(`/attendance/${id}`);
      alert("Attendance Deleted Successfully");
      fetchAttendance();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const filteredAttendance = attendance.filter((item) => {
    const studentName =
      item.student?.name || item.studentName || "";

    return studentName
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const lastIndex = currentPage * attendancePerPage;
  const firstIndex = lastIndex - attendancePerPage;

  const currentAttendance = filteredAttendance.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredAttendance.length / attendancePerPage
  );

  return (
    <div className="attendance-page">

      <div className="attendance-header">

        <h2>Attendance Management</h2>

        <Link to="/attendanceform">
          <button className="add-attendance-btn">
            + Add Attendance
          </button>
        </Link>

      </div>

      <div className="search-container">

        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

      </div>

            {loading ? (
        <h2 className="loading">
          Loading Attendance...
        </h2>
      ) : (
        <div className="attendance-table-container">

          <table className="attendance-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {currentAttendance.length > 0 ? (
                currentAttendance.map((item) => (
                  <tr key={item._id}>

                    <td>
                      {item.student?.name ||
                        item.studentName ||
                        "N/A"}
                    </td>

                    <td>
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          (item.status || "").toLowerCase()
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">

                        <Link
                          to={`/attendanceedit/${item._id}`}
                        >
                          <button className="edit-btn">
                            Edit
                          </button>
                        </Link>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteAttendance(item._id)
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="no-data"
                  >
                    No Attendance Records Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="pagination">

          <button
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

export default Attendance;