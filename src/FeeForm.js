import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "./api/api";
import "./styles/fee.css";

function FeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [students, setStudents] = useState([]);

  const [fee, setFee] = useState({
    student: "",
    feeType: "",
    amount: "",
    paymentDate: "",
    status: "Pending",
  });

  useEffect(() => {
    loadStudents();

    if (id) {
      loadFee();
    }
  }, [id]);

  const loadStudents = async () => {
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

  const loadFee = async () => {
    try {
      const res = await API.get("/fees");

      if (res.data.success) {
        const selectedFee = res.data.data.find(
          (item) => item._id === id
        );

        if (selectedFee) {
          setFee({
            student:
              typeof selectedFee.student === "object"
                ? selectedFee.student._id
                : selectedFee.student || "",

            feeType: selectedFee.feeType || "",

            amount: selectedFee.amount || "",

            paymentDate: selectedFee.paymentDate
              ? selectedFee.paymentDate.substring(0, 10)
              : "",

            status: selectedFee.status || "Pending",
          });
        }
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load fee record");
    }
  };

  const handleChange = (e) => {
    setFee({
      ...fee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await API.put(`/fees/${id}`, fee);

        alert("Fee Updated Successfully");
      } else {
        await API.post("/fees", fee);

        alert("Fee Added Successfully");
      }

      navigate("/fees");
    } catch (error) {
      console.log(error.response?.data || error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="fee-form-container">

      <h2>
        {id ? "Update Fee" : "Add Fee"}
      </h2>

      <form
        className="fee-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">
          <label>Select Student</label>

          <select
            name="student"
            value={fee.student}
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
                {student.name} ({student.class})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Fee Type</label>

          <input
            type="text"
            name="feeType"
            placeholder="Monthly / Admission / Exam"
            value={fee.feeType}
            onChange={handleChange}
            required
          />
        </div>
                <div className="form-group">
          <label>Amount</label>

          <input
            type="number"
            name="amount"
            placeholder="Enter Fee Amount"
            value={fee.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Date</label>

          <input
            type="date"
            name="paymentDate"
            value={fee.paymentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Status</label>

          <select
            name="status"
            value={fee.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="save-btn"
          >
            {id ? "Update Fee" : "Add Fee"}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/fees")}
          >
            Cancel
          </button>
        </div>

      </form>

    </div>
  );
}

export default FeeForm;