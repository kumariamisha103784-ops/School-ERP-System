import React, { useState, useEffect } from "react";
import API from "./api/api";
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
  const loadData = async () => {
    if (id) {
      await fetchTeacher();
    }
  };

  loadData();
}, [id]);

  const fetchTeacher = async () => {
    try {
  const res = await API.get(`/teachers/${id}`);

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
    const formData = new FormData();

    formData.append("name", teacher.name);
    formData.append("subject", teacher.subject);
    formData.append("qualification", teacher.qualification);
    formData.append("mobile", teacher.mobile);
    formData.append("email", teacher.email);

    if (photo) {
      formData.append("photo", photo);
    }

    if (id) {
      await API.put(`/teachers/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Teacher Updated Successfully");
    } else {
      await API.post("/teachers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Teacher Added Successfully");
    }

    navigate("/teachers");
  } catch (err) {
    console.log(err.response?.data || err);

    alert(
      err.response?.data?.message ||
      err.message
    );
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

        <input
           type="file"
           accept="image/*"
           onChange={handlePhoto}
        />

        <button type="submit">
          {id ? "Update Teacher" : "Add Teacher"}
        </button>

      </form>
    </div>
  );
}

export default TeacherForm;