import React, { useState } from "react";
import axios from "axios";
import "./styles/class.css";

function ClassForm() {
  const [classData, setClassData] = useState({
    className: "",
    section: "",
    classTeacher: "",
    roomNumber: "",
  });

  const handleChange = (e) => {
    setClassData({
      ...classData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/classes",
        classData
      );

      alert("Class Added Successfully");

      setClassData({
        className: "",
        section: "",
        classTeacher: "",
        roomNumber: "",
      });

    } catch (error) {
      console.log(error);
      alert("Error Adding Class");
    }
  };

  return (
    <div>
      <h2>Add Class</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="className"
          placeholder="Class Name"
          value={classData.className}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={classData.section}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="classTeacher"
          placeholder="Class Teacher"
          value={classData.classTeacher}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          value={classData.roomNumber}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Class
        </button>

      </form>
    </div>
  );
}

export default ClassForm;