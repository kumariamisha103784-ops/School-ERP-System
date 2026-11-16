import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles/class.css";

function Classes() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/classes");
      setClasses(res.data.data || []);
    } catch (error) {
      console.log(error);
      alert("Error Loading Classes");
    } finally {
      setLoading(false);
    }
  };

  const deleteClass = async (id) => {
    if (!window.confirm("Delete this class?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/classes/${id}`);
      alert("Class Deleted Successfully");
      loadClasses();
    } catch (error) {
      console.log(error);
      alert("Error Deleting Class");
    }
  };

  const editClass = (id) => {
    navigate(`/classedit/${id}`);
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="class-container">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Class Management</h2>

        <Link to="/classform">
          <button className="class-btn">
            + Add Class
          </button>
        </Link>
      </div>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Class</th>
            <th>Section</th>
            <th>Class Teacher</th>
            <th>Room No</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {classes.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Classes Found
              </td>
            </tr>
          ) : (
            classes.map((item) => (
              <tr key={item._id}>
                <td>{item.className}</td>
                <td>{item.section}</td>
                <td>{item.classTeacher}</td>
                <td>{item.roomNo}</td>
                <td>
                                    <button
                    className="class-btn"
                    onClick={() => editClass(item._id)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>

                  <button
                    className="class-btn"
                    onClick={() => deleteClass(item._id)}
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Classes;
              