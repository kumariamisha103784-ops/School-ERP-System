import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/teacherList.css";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teachers");
      setTeachers(res.data.data || []);
    } catch (err) {
      console.log(err);
      alert("Error Fetching Teachers");
    }
  };

  const deleteTeacher = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      alert("Teacher Deleted Successfully");
      fetchTeachers();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="teacher-list-container">

      <div className="teacher-header">

        <h2>Teacher List</h2>

        <Link to="/teacherform">
          <button className="add-btn">
            + Add Teacher
          </button>
        </Link>

      </div>

      <input
        type="text"
        className="search-box"
        placeholder="Search Teacher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="teacher-table">

        <thead>

          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Qualification</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {filteredTeachers.length > 0 ? (

            filteredTeachers.map((teacher) => (

              <tr key={teacher._id}>

                <td>

                  {teacher.photo ? (

                    <img
                      src={`http://localhost:5000/uploads/${teacher.photo}`}
                      alt="Teacher"
                      className="teacher-photo"
                    />

                  ) : (

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="Teacher"
                      className="teacher-photo"
                    />

                  )}

                </td>

                <td>{teacher.name}</td>

                <td>{teacher.subject}</td>

                <td>{teacher.qualification}</td>

                <td>{teacher.mobile}</td>

                <td>{teacher.email}</td>

                <td>

                  <Link to={`/teacherform/${teacher._id}`}>
                    <button className="edit-btn">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTeacher(teacher._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="7">
                No Teachers Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default TeacherList;