import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PomodoroData,
  RankingData,
} from "../../../utils/firebase/firebase.utils";

type ReportState = {
  data: PomodoroData[];
  ranking: RankingData[];
  reportType: string;
};

const initialState: ReportState = {
  data: [],
  ranking: [],
  reportType: "Weekly",
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReportData: (state, action: PayloadAction<PomodoroData[]>) => {
      state.data = action.payload;
    },
    setRankingData: (state, action: PayloadAction<RankingData[]>) => {
      state.ranking = action.payload;
    },
    setReportType: (state, action: PayloadAction<string>) => {
      state.reportType = action.payload;
    },
  },
});

export const { setReportData, setRankingData, setReportType } =
  reportsSlice.actions;

export default reportsSlice.reducer;
