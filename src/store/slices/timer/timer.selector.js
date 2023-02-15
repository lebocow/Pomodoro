import { createSelector } from "@reduxjs/toolkit";

const selectTimerReducer = (state) => state.timer;

export const selectWorkingTypes = createSelector(
  [selectTimerReducer],
  (timerSlice) => timerSlice.workingTypes
);
export const selectWorkingMode = createSelector(
  [selectTimerReducer],
  (timerSlice) => timerSlice.workingMode
);
export const selectMinutes = createSelector(
  [selectTimerReducer],
  (timerSlice) => timerSlice.minutes
);
export const selectSeconds = createSelector(
  [selectTimerReducer],
  (timerSlice) => timerSlice.seconds
);
export const selectIsRunning = createSelector(
  [selectTimerReducer],
  (timerSlice) => timerSlice.isRunning
);
export const selectCycle = createSelector(
  [selectTimerReducer],
  (timerSlice) => timerSlice.cycle
);
export const selectMaxCycles = createSelector(
  [selectTimerReducer],
  (timerSlice) => timerSlice.maxCycles
);
