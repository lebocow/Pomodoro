import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectTimerReducer = (state: RootState) => state.timer;

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
