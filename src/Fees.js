import React from "react";
import "./App.css";

function Fees() {
  return (
    <div className="fees">
      <h1>Fee Management</h1>

      <h3>Fee Structure, Payment Status & Receipts</h3>

      <form className="fees-form">
        <input
          type="text"
          placeholder="Enter Student Name"
        />

        <input
          type="text"
          placeholder="Enter Class"
        />

        <input
          type="number"
          placeholder="Enter Fee Amount"
        />

        <select>
          <option>Select Payment Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Unpaid</option>
        </select>

        <button type="submit">
          Save Fee
        </button>
      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class</th>
            <th>Fee Amount</th>
            <th>Status</th>
            <th>Receipt</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Amit Kumar</td>
            <td>10th</td>
            <td>₹15,000</td>
            <td>Paid</td>
            <td>Receipt-001</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>Priya Sharma</td>
            <td>9th</td>
            <td>₹12,000</td>
            <td>Pending</td>
            <td>Receipt-002</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Fees;