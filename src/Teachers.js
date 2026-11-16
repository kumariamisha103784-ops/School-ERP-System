import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "./api/api";
import "./styles/teachers.css";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const teachersPerPage = 10;

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await API.get("/teachers");

      if (res.data.success) {
        setTeachers(res.data.data || []);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load teachers");
    } finally {
      setLoading(false);
    }
  };

  const deleteTeacher = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/teachers/${id}`);
      alert("Teacher Deleted Successfully");
      fetchTeachers();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      (teacher.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (teacher.subject || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (teacher.assignedClass || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const lastIndex = currentPage * teachersPerPage;
  const firstIndex = lastIndex - teachersPerPage;

  const currentTeachers = filteredTeachers.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredTeachers.length / teachersPerPage
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
    <div className="teachers-page">

      <div className="teachers-header">
        <h2>Teacher Management</h2>

        <Link to="/teacherform">
          <button className="add-teacher-btn">
            + Add Teacher
          </button>
        </Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name, Subject or Class..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
            {loading ? (
        <h2 className="loading">
          Loading Teachers...
        </h2>
      ) : (
        <div className="teachers-table-container">
          <table className="teachers-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Assigned Class</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentTeachers.length > 0 ? (
                currentTeachers.map((teacher) => (
                  <tr key={teacher._id}>
                    <td>{teacher.name}</td>

                    <td>{teacher.subject}</td>

                    <td>{teacher.assignedClass}</td>

                    <td>{teacher.mobile}</td>

                    <td>
                      <div className="action-buttons">

                        <Link to={`/teacheredit/${teacher._id}`}>
                          <button className="edit-btn">
                            Edit
                          </button>
                        </Link>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteTeacher(teacher._id)
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
                    colSpan="5"
                    className="no-data"
                  >
                    No Teachers Found
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

export default Teachers;