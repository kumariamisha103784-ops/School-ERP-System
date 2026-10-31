import "./styles/studentForm.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    rollNo: "",
    class: "",
    section: "",
    mobile: "",
  });

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");

      const selectedStudent = res.data.data.find(
        (item) => item._id === id
      );

      if (selectedStudent) {
        setStudent(selectedStudent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", student.name);
      formData.append("rollNo", student.rollNo);
      formData.append("class", student.class);
      formData.append("section", student.section);
      formData.append("mobile", student.mobile);

      if (photo) {
        formData.append("photo", photo);
      }

      if (id) {
        await axios.put(
          `http://localhost:5000/api/students/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Student Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/students",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Student Added Successfully");
      }

      navigate("/studentlist");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "25px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {id ? "Update Student" : "Add Student"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="rollNo"
          placeholder="Roll No"
          value={student.rollNo}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="class"
          placeholder="Class"
          value={student.class}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={student.section}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={student.mobile}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          style={{ marginBottom: "15px" }}
        />

        {photo && (
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <img
              src={URL.createObjectURL(photo)}
              alt="Preview"
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "10px",
                objectFit: "cover",
                border: "2px solid #2563eb",
              }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {id ? "Update Student" : "Add Student"}
        </button>

      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "15px",
  boxSizing: "border-box",
};

export default StudentForm;