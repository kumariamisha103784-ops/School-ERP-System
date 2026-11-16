import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";

function RecentStudents() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/students"
      );

      setStudents(res.data.data || []);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="recent-card">

      <div className="recent-header">

        <h3>
          <FaUserGraduate /> Recent Students
        </h3>

      </div>

      <div className="recent-list">
                {students.length === 0 ? (

          <p className="no-data">
            No Students Found
          </p>

        ) : (

          students.slice(0, 5).map((student) => (

            <div
              className="recent-item"
              key={student._id}
            >

              <div className="recent-avatar">

                {student.photo ? (
                  <img
                    src={`http://localhost:5000/${student.photo}`}
                    alt={student.name}
                  />
                ) : (
                  <FaUserGraduate />
                )}

              </div>

              <div className="recent-info">

                <h4>{student.name}</h4>

                <p>
                  Class : {student.class} {student.section}
                </p>

              </div>

              <span className="status active">
                Active
              </span>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default RecentStudents;