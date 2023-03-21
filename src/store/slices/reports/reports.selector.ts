import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectReports = (state: RootState) => state.reports;

export const selectReportData = createSelector(
  [selectReports],
  (reports) => reports.data
);

export const selectRankingData = createSelector(
  [selectReports],
  (reports) => reports.ranking
);

export const selectReportType = createSelector(
  [selectReports],
  (reports) => reports.reportType
);
