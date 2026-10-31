import React, { useState } from "react";
import axios from "axios";
import "./styles/notice.css";

function NoticeForm() {
  const [notice, setNotice] = useState({
    title: "",
    message: "",
    date: "",
  });

  const handleChange = (e) => {
    setNotice({
      ...notice,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/notices", notice);

      alert("Notice Added Successfully");

      setNotice({
        title: "",
        message: "",
        date: "",
      });
    } catch (error) {
      console.log(error);
      alert("Error Adding Notice");
    }
  };

  return (
    <div className="notice-container">
      <h2>Add Notice</h2>

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
          name="message"
          placeholder="Notice Message"
          value={notice.message}
          onChange={handleChange}
          rows="5"
          required
        />

        <input
          type="date"
          name="date"
          value={notice.date}
          onChange={handleChange}
          required
        />

        <button className="notice-btn" type="submit">
          Add Notice
        </button>

      </form>
    </div>
  );
}

export default NoticeForm;