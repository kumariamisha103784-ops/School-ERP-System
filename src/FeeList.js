import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "./api/api";
import "./styles/fee.css";

function FeeList() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const feesPerPage = 10;

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await API.get("/fees");

      if (res.data.success) {
        setFees(res.data.data || []);
      }
    } catch (error) {
      console.log(error);
      alert("Error Loading Fee Records");
    } finally {
      setLoading(false);
    }
  };

  const deleteFee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fee record?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/fees/${id}`);

      alert("Fee Deleted Successfully");

      fetchFees();
    } catch (error) {
      console.log(error);
      alert("Error Deleting Fee");
    }
  };

  const filteredFees = fees.filter((fee) => {
    return (
      (fee.student?.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (fee.student?.class || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (fee.feeType || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (fee.status || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const lastIndex = currentPage * feesPerPage;
  const firstIndex = lastIndex - feesPerPage;

  const currentFees = filteredFees.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredFees.length / feesPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="fee-page">

      <div className="fee-header">

        <h2>Fee Management</h2>

        <Link to="/feeform">
          <button className="add-fee-btn">
            + Add Fee
          </button>
        </Link>

      </div>

      <div className="search-container">

        <input
          type="text"
          placeholder="Search by Student, Class, Fee Type or Status..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

      </div>

      {loading ? (
        <h2 className="loading">
          Loading Fee Records...
        </h2>
      ) : (
        <div className="fee-table-container">

          <table className="fee-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Fee Type</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
                            {currentFees.length > 0 ? (
                currentFees.map((fee) => (
                  <tr key={fee._id}>
                    <td>
                      {fee.student?.name || "-"}
                    </td>

                    <td>
                      {fee.student?.class || "-"}
                    </td>

                    <td>{fee.feeType}</td>

                    <td>₹ {fee.amount}</td>

                    <td>
                      {fee.paymentDate
                        ? new Date(
                            fee.paymentDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${(
                          fee.status || ""
                        ).toLowerCase()}`}
                      >
                        {fee.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">

                        <Link
                          to={`/feeedit/${fee._id}`}
                        >
                          <button className="edit-btn">
                            Edit
                          </button>
                        </Link>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteFee(fee._id)
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="no-data"
                  >
                    No Fee Records Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="pagination">

          <button
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

export default FeeList;
          