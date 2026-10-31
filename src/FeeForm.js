import React, { useState } from "react";
import axios from "axios";
import "./styles/fee.css";

function FeeForm() {
  const [fee, setFee] = useState({
    studentName: "",
    class: "",
    amount: "",
    paymentDate: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFee({
      ...fee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/fees", fee);

      alert("Fee Added Successfully");

      setFee({
        studentName: "",
        class: "",
        amount: "",
        paymentDate: "",
        status: "Pending",
      });
    } catch (error) {
      console.log(error);
      alert("Error Adding Fee");
    }
  };

  return (
    <div className="fee-container">
      <h2>Add Fee</h2>

      <form className="fee-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={fee.studentName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="class"
          placeholder="Class"
          value={fee.class}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Fee Amount"
          value={fee.amount}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="paymentDate"
          value={fee.paymentDate}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={fee.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>

        <button className="fee-btn" type="submit">
          Add Fee
        </button>

      </form>
    </div>
  );
}

export default FeeForm;