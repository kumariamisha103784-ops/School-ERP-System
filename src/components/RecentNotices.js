import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBullhorn } from "react-icons/fa";
import "../styles/recent.css";

function RecentNotices() {

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/notices"
      );

      setNotices(res.data.data || []);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="recent-card">

      <div className="recent-header">

        <h3>
          <FaBullhorn /> Recent Notices
        </h3>

      </div>

      <div className="recent-list">
        {notices.length === 0 ? (

          <p className="no-data">
            No Notices Available
          </p>

        ) : (

          notices.slice(0, 5).map((notice) => (

            <div
              className="recent-item"
              key={notice._id}
            >

              <div className="recent-avatar">
                <FaBullhorn />
              </div>

              <div className="recent-info">

                <h4>{notice.title}</h4>

                <p>
                  {notice.description}
                </p>

              </div>

              <span className="status active">
                New
              </span>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default RecentNotices;
  