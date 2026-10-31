import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/studentList.css";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");

      console.log(res.data);

      if (Array.isArray(res.data)) {
        setStudents(res.data);
      } else if (Array.isArray(res.data.data)) {
        setStudents(res.data.data);
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      alert("Student Deleted Successfully");
      fetchStudents();
    } catch (err) {
      console.log(err);
      alert("Error Deleting Student");
    }
  };

  // Export Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, "Students.xlsx");
  };

  // Print
  const printStudents = () => {
    window.print();
  };

  // Export PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Student List", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Name", "Roll No", "Class", "Section", "Mobile"]],
      body: students.map((student) => [
        student.name,
        student.rollNo,
        student.class,
        student.section,
        student.mobile,
      ]),
    });

    doc.save("Students.pdf");
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="student-page">

      <div className="student-header">

        <h2>👨‍🎓 Student Management</h2>

        <div style={{ display: "flex", gap: "10px" }}>

          <button
            className="add-btn"
            onClick={exportToExcel}
          >
            📊 Export Excel
          </button>

          <button
            className="add-btn"
            onClick={exportToPDF}
          >
            📄 Export PDF
          </button>

          <button
            className="add-btn"
            onClick={printStudents}
          >
            🖨️ Print
          </button>

          <Link to="/studentform">
            <button className="add-btn">
              + Add Student
            </button>
          </Link>

        </div>

      </div>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="🔍 Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

      </div>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Section</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {currentStudents.map((student) => (

            <tr key={student._id}>

              <td>

               <img
  src={
    student.photo
      ? `http://localhost:5000/uploads/${student.photo}`
      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  }
  alt="Student"
  style={{
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  }}
/>

              </td>

              <td>{student.name}</td>
              <td>{student.rollNo}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.mobile}</td>

              <td>

                <Link to={`/studentform/${student._id}`}>
                  <button>Edit</button>
                </Link>

                {" "}

                <button
                  onClick={() => deleteStudent(student._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          alignItems: "center",
        }}
      >

        <button
          className="add-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          className="add-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default StudentList;