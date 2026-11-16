import "./styles/studentForm.css";
import React, { useState, useEffect } from "react";
import API from "./api/api";
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
      const res = await API.get("/students");

      const selectedStudent = res.data.data.find(
        (item) => item._id === id
      );

      if (selectedStudent) {
        setStudent({
          name: selectedStudent.name || "",
          rollNo: selectedStudent.rollNo || "",
          class: selectedStudent.class || "",
          section: selectedStudent.section || "",
          mobile: selectedStudent.mobile || "",
        });
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load student");
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
        await API.put(`/students/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Student Updated Successfully");
      } else {
        await API.post("/students", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Student Added Successfully");
      }

      navigate("/students");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="student-form-container">
      <h2>{id ? "Update Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit}>
                <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
          required
          className="form-input"
        />

        <input
          type="text"
          name="rollNo"
          placeholder="Roll No"
          value={student.rollNo}
          onChange={handleChange}
          required
          className="form-input"
        />

        <input
          type="text"
          name="class"
          placeholder="Class"
          value={student.class}
          onChange={handleChange}
          required
          className="form-input"
        />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={student.section}
          onChange={handleChange}
          required
          className="form-input"
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={student.mobile}
          onChange={handleChange}
          required
          className="form-input"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="form-input"
        />

        {photo && (
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={URL.createObjectURL(photo)}
              alt="Preview"
              style={{
                width: "130px",
                height: "130px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "2px solid #2563eb",
              }}
            />
          </div>
        )}

        <button
          type="submit"
          className="submit-btn"
        >
          {id ? "Update Student" : "Add Student"}
        </button>

      </form>
    </div>
  );
}

export default StudentForm;