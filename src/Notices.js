import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles/notice.css";

function Notices() {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notices");

      setNotices(res.data.data || []);
    } catch (error) {
      console.log(error);
      alert("Error Loading Notices");
    } finally {
      setLoading(false);
    }
  };

  const deleteNotice = async (id) => {
    if (!window.confirm("Delete this notice?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/notices/${id}`
      );

      alert("Notice Deleted Successfully");

      loadNotices();
    } catch (error) {
      console.log(error);
      alert("Error Deleting Notice");
    }
  };

  const editNotice = (id) => {
    navigate(`/noticeedit/${id}`);
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="notice-container">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Notice Board</h2>

        <Link to="/noticeform">
          <button className="notice-btn">
            + Add Notice
          </button>
        </Link>
      </div>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Posted By</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {notices.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Notices Found
              </td>
            </tr>
          ) : (
            notices.map((notice) => (
              <tr key={notice._id}>
                <td>{notice.title}</td>
                <td>{notice.description}</td>
                <td>
                  {notice.noticeDate
                    ? new Date(
                        notice.noticeDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>{notice.postedBy}</td>

                <td>
                                    <button
                    className="notice-btn"
                    onClick={() => editNotice(notice._id)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>

                  <button
                    className="notice-btn"
                    onClick={() => deleteNotice(notice._id)}
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

export default Notices;

