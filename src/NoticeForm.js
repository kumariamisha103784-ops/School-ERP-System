import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/notice.css";

function NoticeForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [notice, setNotice] = useState({
    title: "",
    description: "",
    noticeDate: "",
  });

  useEffect(() => {
    if (id) {
      loadNotice();
    }
  }, [id]);

  const loadNotice = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/notices/${id}`
      );

      const data = res.data.data;

      setNotice({
        title: data.title || "",
        description: data.description || "",
        noticeDate: data.noticeDate
          ? data.noticeDate.substring(0, 10)
          : "",
      });
    } catch (error) {
      console.log(error);
      alert("Error Loading Notice");
    }
  };

  const handleChange = (e) => {
    setNotice({
      ...notice,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/notices/${id}`,
          notice
        );

        alert("Notice Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/notices",
          notice
        );

        alert("Notice Added Successfully");
      }

      navigate("/notices");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation Failed");
    }
  };

  return (
    <div className="notice-container">
      <h2>{id ? "Edit Notice" : "Add Notice"}</h2>

      <form className="notice-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Notice Title"
          value={notice.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Notice Description"
          value={notice.description}
          onChange={handleChange}
          rows="5"
          required
        />

        <input
          type="date"
          name="noticeDate"
          value={notice.noticeDate}
          onChange={handleChange}
          required
        />

        <button className="notice-btn" type="submit">
          {id ? "Update Notice" : "Add Notice"}
        </button>
      </form>
    </div>
  );
}

export default NoticeForm;