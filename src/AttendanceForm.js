import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "./api/api";
import "./styles/attendance.css";

function AttendanceForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [students, setStudents] = useState([]);

  const [attendance, setAttendance] = useState({
    student: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
  const init = async () => {
    await fetchStudents();

    if (id) {
      await fetchAttendance();
    }
  };

  init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");

      if (res.data.success) {
        setStudents(res.data.data || []);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load students");
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await API.get("/attendance");

      if (res.data.success) {
        const selected = res.data.data.find(
          (item) => item._id === id
        );

        if (selected) {
          setAttendance({
            student:
              typeof selected.student === "object"
                ? selected.student._id
                : selected.student || "",
            date: selected.date
              ? selected.date.substring(0, 10)
              : "",
            status: selected.status || "Present",
          });
        }
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load attendance");
    }
  };

  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await API.put(`/attendance/${id}`, attendance);

        alert("Attendance Updated Successfully");
      } else {
        await API.post("/attendance", attendance);

        alert("Attendance Added Successfully");
      }

      navigate("/attendance");
    } catch (error) {
      console.log(error.response?.data || error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="attendance-form-container">

      <h2>
        {id ? "Update Attendance" : "Add Attendance"}
      </h2>

      <form
        className="attendance-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">
          <label>Select Student</label>

          <select
            name="student"
            value={attendance.student}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Student
            </option>

            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.name} ({student.rollNo})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            name="date"
            value={attendance.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Status</label>

          <select
            name="status"
            value={attendance.status}
            onChange={handleChange}
          >
            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>

            <option value="Leave">
              Leave
            </option>
          </select>
        </div>

        <div className="form-buttons">

          <button
            type="submit"
            className="save-btn"
          >
            {id
              ? "Update Attendance"
              : "Add Attendance"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              navigate("/attendance")
            }
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default AttendanceForm;