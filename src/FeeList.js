import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/fee.css";

function FeeList() {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/fees");
      setFees(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this fee record?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/fees/${id}`);
      alert("Fee Deleted Successfully");
      fetchFees();
    } catch (err) {
      console.log(err);
      alert("Error Deleting Fee");
    }
  };

  return (
    <div className="fee-container">
      <h2>Fee List</h2>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {fees.length > 0 ? (
              fees.map((fee) => (
                <tr key={fee._id}>
                  <td>{fee.studentName}</td>
                  <td>{fee.class}</td>
                  <td>₹ {fee.amount}</td>
                  <td>
                    {fee.paymentDate
                      ? new Date(fee.paymentDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{fee.status}</td>
                  <td>
                    <button
                      className="fee-btn"
                      onClick={() => deleteFee(fee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Fee Records Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeeList;