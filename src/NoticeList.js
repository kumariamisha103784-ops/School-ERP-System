import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/notice.css";

function NoticeList() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notices");
      setNotices(res.data.data || []);
    } catch (err) {
      console.log(err);
      alert("Error Fetching Notices");
    }
  };

  const deleteNotice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/notices/${id}`);
      alert("Notice Deleted Successfully");
      fetchNotices();
    } catch (err) {
      console.log(err);
      alert("Error Deleting Notice");
    }
  };

  return (
    <div className="notice-container">
      <h2>Notice List</h2>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {notices.length > 0 ? (
              notices.map((notice) => (
                <tr key={notice._id}>
                  <td>{notice.title}</td>
                  <td>{notice.message}</td>
                  <td>
                    {notice.date
                      ? new Date(notice.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <button
                      className="notice-btn"
                      onClick={() => deleteNotice(notice._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Notices Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NoticeList;