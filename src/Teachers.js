import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Teachers() {
  const [teachers, setTeachers] = useState([]);

  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
    assignedClass: "",
    mobile: "",
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teachers");
      setTeachers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/teachers", teacher);

      alert("Teacher Added Successfully");

      setTeacher({
        name: "",
        subject: "",
        assignedClass: "",
        mobile: "",
      });

      fetchTeachers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeacher = async (id) => {
    if (window.confirm("Delete this Teacher?")) {
      try {
        await axios.delete(`http://localhost:5000/api/teachers/${id}`);
        fetchTeachers();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="teachers">
      <h1>Teacher Management</h1>

      <h3>Add / Edit / View Teacher Profiles</h3>

      <form className="teacher-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Teacher Name"
          value={teacher.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="subject"
          placeholder="Enter Subject"
          value={teacher.subject}
          onChange={handleChange}
        />

        <input
          type="text"
          name="assignedClass"
          placeholder="Enter Assigned Class"
          value={teacher.assignedClass}
          onChange={handleChange}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Enter Phone Number"
          value={teacher.mobile}
          onChange={handleChange}
        />

        <button type="submit">
          Add Teacher
        </button>
      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Assigned Class</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((t) => (
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.subject}</td>
              <td>{t.assignedClass}</td>
              <td>{t.mobile}</td>
              <td>
                <button>Edit</button>

                <button onClick={() => deleteTeacher(t._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teachers;