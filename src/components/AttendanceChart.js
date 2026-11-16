import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "../styles/chart.css";

const data = [
  { month: "Jan", attendance: 82 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 91 },
  { month: "Apr", attendance: 85 },
  { month: "May", attendance: 95 },
  { month: "Jun", attendance: 89 },
];

function AttendanceChart() {
  return (
    <div className="chart-wrapper">

      <div className="chart-title">
        <h3>Attendance</h3>
        <span>2026</span>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="attendance"
            radius={[8, 8, 0, 0]}
            fill="#2563eb"
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default AttendanceChart;