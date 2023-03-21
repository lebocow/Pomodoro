import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const workingTypes = [
  "working",
  "shortbreak",
  "longbreak",
  "finished",
  "initial",
];

type TimerState = {
  workingTypes: string[];
  workingMode: string;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  cycle: number;
};

const initialState: TimerState = {
  workingTypes,
  workingMode: workingTypes[4],
  minutes: 25,
  seconds: 0,
  isRunning: false,
  cycle: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState: initialState,
  reducers: {
    setWorkingMode: (state, action: PayloadAction<string>) => {
      state.workingMode = action.payload;
    },
    setMinutes: (state, action: PayloadAction<number>) => {
      state.minutes = action.payload;
    },
    setSeconds: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setCycle: (state, action: PayloadAction<number>) => {
      state.cycle = action.payload;
    },
    decrementMinutes: (state) => {
      state.minutes -= 1;
    },
    decrementSeconds: (state) => {
      state.seconds -= 1;
    },
  },
});

export const {
  setWorkingMode,
  setMinutes,
  setSeconds,
  setIsRunning,
  setCycle,
  decrementMinutes,
  decrementSeconds,
} = timerSlice.actions;

export default timerSlice.reducer;
