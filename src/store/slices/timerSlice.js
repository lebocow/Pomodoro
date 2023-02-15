import { createSlice } from "@reduxjs/toolkit";

const workingTypes = ["Working", "ShortBreak", "LongBreak", "Finished"];

const initialState = {
  workingTypes,
  workingMode: workingTypes[0],
  minutes: 25,
  seconds: 0,
  isRunning: false,
  cycle: 0,
  maxCycles: 4,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState: initialState,
  reducers: {
    setWorkingMode: (state, action) => {
      state.workingMode = action.payload;
    },
    setMinutes: (state, action) => {
      state.minutes = action.payload;
    },
    setSeconds: (state, action) => {
      state.seconds = action.payload;
    },
    setIsRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    setCycle: (state, action) => {
      state.cycle = action.payload;
    },
    setMaxCycles: (state, action) => {
      state.maxCycles = action.payload;
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
  setMaxCycles,
  decrementMinutes,
  decrementSeconds,
} = timerSlice.actions;

export default timerSlice.reducer;
