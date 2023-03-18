import { createSelector } from "@reduxjs/toolkit";

const selectReports = (state) => state.reports;

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
