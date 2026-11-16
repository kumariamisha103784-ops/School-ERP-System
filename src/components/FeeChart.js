import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    name: "Collected",
    value: 75,
  },
  {
    name: "Pending",
    value: 25,
  },
];

const COLORS = [
  "#2563eb",
  "#ef4444",
];

function FeeChart() {

  return (

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <PieChart>

        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={95}
          dataKey="value"
          label
        >

          {data.map((entry, index) => (

            <Cell
              key={index}
              fill={COLORS[index]}
            />

          ))}
                    </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            height={36}
          />

      </PieChart>

    </ResponsiveContainer>

  );

}

export default FeeChart;