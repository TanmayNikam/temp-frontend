import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PieChart = ({ totalStudents, shortStudents }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Short Attendance", "Attendance"],
    datasets: [
      {
        label: "# of Students",
        data: [shortStudents, totalStudents - shortStudents],
        backgroundColor: ["rgba(242, 2, 2,0.7)", "rgba(2, 196, 54,0.8)"],
        borderColor: ["rgba(242, 2, 2, 1)", "rgba(2, 196, 54, 1)"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <Pie
        data={data}
        options={{ maintainAspectRatio: false }}
        className="h-96"
      />
    </div>
  );
};

export default PieChart;
