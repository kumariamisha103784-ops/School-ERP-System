import React, { useEffect, useState } from "react";
import axios from "axios";

function ClassList() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/classes");
      setClasses(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Error Fetching Classes");
    }
  };

  const deleteClass = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/classes/${id}`);
      alert("Class Deleted Successfully");
      fetchClasses();
    } catch (err) {
      console.log(err);
      alert("Error Deleting Class");
    }
  };

  return (
    <div>
      <h2>Class List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Class</th>
            <th>Section</th>
            <th>Class Teacher</th>
            <th>Room No.</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {classes.length > 0 ? (
            classes.map((item) => (
              <tr key={item._id}>
                <td>{item.className}</td>
                <td>{item.section}</td>
                <td>{item.classTeacher}</td>
                <td>{item.roomNumber}</td>
                <td>
                  <button onClick={() => deleteClass(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Classes Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClassList;