import { useDispatch, useSelector } from "react-redux";

import { selectReportType } from "../../store/slices/reports/reports.selector";
import { setReportType } from "../../store/slices/reports/reports.slice";

const ReportSelector = () => {
  const reportType = useSelector(selectReportType);
  const dispatch = useDispatch();

  const handleReportType = (event) => {
    dispatch(setReportType(event.target.value));
  };

  return (
    <div className="mb-2 -mt-2">
      <select
        className="p-3 outline-none bg-white/80 text-black w-52 rounded-sm"
        onChange={handleReportType}
        value={reportType}
      >
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
    </div>
  );
};

export default ReportSelector;
