import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaBullhorn,
} from "react-icons/fa";

import "../styles/cards.css";

function DashboardCards({ counts }) {
  const cards = [
    {
      title: "Students",
      value: counts.students,
      icon: <FaUserGraduate />,
      color: "#2563eb",
    },
    {
      title: "Teachers",
      value: counts.teachers,
      icon: <FaChalkboardTeacher />,
      color: "#10b981",
    },
    {
      title: "Classes",
      value: counts.classes,
      icon: <FaSchool />,
      color: "#f59e0b",
    },
    {
      title: "Attendance",
      value: counts.attendance,
      icon: <FaClipboardCheck />,
      color: "#8b5cf6",
    },
        {
      title: "Fees",
      value: counts.fees,
      icon: <FaMoneyBillWave />,
      color: "#ef4444",
    },
    {
      title: "Notices",
      value: counts.notices,
      icon: <FaBullhorn />,
      color: "#06b6d4",
    },
  ];

  return (
    <div className="cards-container">

      {cards.map((card, index) => (

        <div
          className="card"
          key={index}
        >

          <div
            className="card-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div className="card-info">

            <h4>{card.title}</h4>

            <h2>{card.value}</h2>

          </div>

        </div>

      ))}

    </div>
  );
}

export default DashboardCards;