import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "./api/api";
import "./styles/students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 10;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");

      if (res.data.success) {
        setStudents(res.data.data || []);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/students/${id}`);

      alert("Student Deleted Successfully");

      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const filteredStudents = students.filter((student) => {
    return (
      (student.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      String(student.rollNo || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      String(student.class || student.className || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const lastIndex = currentPage * studentsPerPage;
  const firstIndex = lastIndex - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="students-page">

      <div className="students-header">

        <h2>Student Management</h2>

        <Link to="/studentform">
          <button className="add-student-btn">
            + Add Student
          </button>
        </Link>

      </div>

      <div className="search-container">

        <input
          type="text"
          placeholder="Search by Name, Roll No or Class..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

      </div>

      {loading ? (
        <h2 className="loading">
          Loading Students...
        </h2>
      ) : (
        <div className="students-table-container">

          <table className="students-table">

            <thead>

              <tr>

                <th>Photo</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Section</th>
                <th>Mobile</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>
                            {currentStudents.length > 0 ? (
                currentStudents.map((student) => (
                  <tr key={student._id}>
                    <td>
                      <img
                        src={
                          student.photo
                            ? `http://localhost:5000/uploads/${student.photo}`
                            : "https://via.placeholder.com/45"
                        }
                        alt={student.name}
                        className="student-photo"
                      />
                    </td>

                    <td>{student.name}</td>

                    <td>{student.rollNo}</td>

                    <td>{student.class || student.className}</td>

                    <td>{student.section}</td>

                    <td>{student.mobile}</td>

                    <td>
                      <div className="action-buttons">

                        <Link to={`/studentedit/${student._id}`}>
                          <button className="edit-btn">
                            Edit
                          </button>
                        </Link>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteStudent(student._id)
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
                  <td colSpan="7" className="no-data">
                    No Students Found
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
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

export default Students;
            