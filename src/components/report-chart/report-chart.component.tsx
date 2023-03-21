import React from "react";
import { useSelector } from "react-redux";

import { selectReportData } from "../../store/slices/reports/reports.selector";
import { selectWorkingMode } from "../../store/slices/timer/timer.selector";
import { selectUserThemesColors } from "../../store/slices/settings/settings.selector";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ReportChart = () => {
  const currentUserData = useSelector(selectReportData);
  const workingMode = useSelector(selectWorkingMode);
  const { chartFill } = useSelector(selectUserThemesColors)[workingMode] as {
    chartFill: string;
  };

  const maxYValue = currentUserData.reduce(
    (max, entry) => Math.max(max, entry.totalWorkTime),
    0
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        className="p-4 rounded-lg"
        data={currentUserData}
        margin={{ top: 0, right: 10, left: -30, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255, 255, 255, 0.2)"
        />
        <XAxis dataKey="displayDate" tick={{ fill: "white" }} />
        <YAxis tick={{ fill: "white" }} domain={[0, maxYValue]} />
        <Tooltip />
        <Legend
          wrapperStyle={{
            paddingTop: "1.5rem",
            paddingLeft: "5rem",
            width: "100%",
          }}
        />
        <Bar dataKey="totalWorkTime" fill={chartFill} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportChart;
