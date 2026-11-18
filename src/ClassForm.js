import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/class.css";

function ClassForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [classData, setClassData] = useState({
    className: "",
    section: "",
    classTeacher: "",
    roomNo: "",
  });

 useEffect(() => {
  const init = async () => {
    if (id) {
      await loadClass();
    }
  };

  init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

  const loadClass = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/classes/${id}`
      );

      const data = res.data.data;

      setClassData({
        className: data.className || "",
        section: data.section || "",
        classTeacher: data.classTeacher || "",
        roomNo: data.roomNo || "",
      });
    } catch (error) {
      console.log(error);
      alert("Error Loading Class");
    }
  };

  const handleChange = (e) => {
    setClassData({
      ...classData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
        e.preventDefault();

    try {
      if (id) {
        // Update Class
        await axios.put(
          `http://localhost:5000/api/classes/${id}`,
          classData
        );

        alert("Class Updated Successfully");
      } else {
        // Add Class
        await axios.post(
          "http://localhost:5000/api/classes",
          classData
        );

        alert("Class Added Successfully");
      }

      navigate("/classes");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation Failed");
    }
  };

  return (
    <div className="class-container">
      <h2>{id ? "Edit Class" : "Add Class"}</h2>

      <form className="class-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="className"
          placeholder="Class Name"
          value={classData.className}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={classData.section}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="classTeacher"
          placeholder="Class Teacher"
          value={classData.classTeacher}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="roomNo"
          placeholder="Room Number"
          value={classData.roomNo}
          onChange={handleChange}
        />

        <button className="class-btn" type="submit">
          {id ? "Update Class" : "Add Class"}
        </button>

      </form>
    </div>
  );
}

export default ClassForm;