import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/slices/user/user.selector";

import {
  fetchRankingData,
  fetchReportData,
} from "../../utils/firebase/firebase.utils";
import { processReportData } from "../../utils/process-report-data.utils";

import { selectReportType } from "../../store/slices/reports/reports.selector";
import {
  setRankingData,
  setReportData,
} from "../../store/slices/reports/reports.slice";

import ReportSelector from "../../components/report-selector/report-selector.component";
import ReportChart from "../../components/report-chart/report-chart.component";
import SignInPrompt from "../../components/sign-in-prompt/sign-in-prompt.component";
import RankingList from "../../components/ranking-list/ranking-list.component";

const Reports = () => {
  const currentUser = useSelector(selectCurrentUser);
  const reportType = useSelector(selectReportType);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      (async () => {
        const userData = await fetchReportData(currentUser, reportType);
        const aggregatedData = processReportData(userData, reportType);
        const rankingData = await fetchRankingData();

        dispatch(setRankingData(rankingData));
        dispatch(setReportData(aggregatedData));
      })();
    }
  }, [currentUser, dispatch, reportType]);

  return currentUser ? (
    <>
      <ReportSelector />
      <div className="bg-white/10 text-white w-5/6 min-h-min rounded-sm p-3 mb-10">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {reportType} Reports
        </h1>
        <ReportChart />
      </div>
      <RankingList />
    </>
  ) : (
    <SignInPrompt />
  );
};

export default Reports;
