import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  ranking: [],
  reportType: "Weekly",
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReportData: (state, action) => {
      state.data = action.payload;
    },
    setRankingData: (state, action) => {
      state.ranking = action.payload;
    },
    setReportType: (state, action) => {
      state.reportType = action.payload;
    },
  },
});

export const { setReportData, setRankingData, setReportType } =
  reportsSlice.actions;

export default reportsSlice.reducer;
