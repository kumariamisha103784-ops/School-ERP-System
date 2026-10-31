import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/teacherForm.css";

function TeacherForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
    qualification: "",
    mobile: "",
    email: "",
  });

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (id) {
      fetchTeacher();
    }
  }, [id]);

  const fetchTeacher = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/teachers/${id}`
      );

      setTeacher({
        name: res.data.data.name,
        subject: res.data.data.subject,
        qualification: res.data.data.qualification,
        mobile: res.data.data.mobile,
        email: res.data.data.email,
      });
    } catch (err) {
      console.log(err);
      alert("Teacher Not Found");
    }
  };

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (id) {
      await axios.put(
        `http://localhost:5000/api/teachers/${id}`,
        teacher
      );

      alert("Teacher Updated Successfully");
    } else {
      await axios.post(
        "http://localhost:5000/api/teachers",
        teacher
      );

      alert("Teacher Added Successfully");
    }

    navigate("/teachers");
  } catch (err) {
    console.log(err.response?.data || err);
    alert("Something Went Wrong");
  }
};

    return (
    <div className="teacher-form-container">
      <h2>{id ? "Update Teacher" : "Add Teacher"}</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <input
          type="text"
          name="name"
          placeholder="Teacher Name"
          value={teacher.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={teacher.subject}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={teacher.qualification}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={teacher.mobile}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={teacher.email}
          onChange={handleChange}
          required
        />

        {/* <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handlePhoto}
        /> */}

        <button type="submit">
          {id ? "Update Teacher" : "Add Teacher"}
        </button>

      </form>
    </div>
  );
}

export default TeacherForm;