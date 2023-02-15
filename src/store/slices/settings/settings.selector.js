import { createSelector } from "@reduxjs/toolkit";

const selectSettingsReducer = (state) => state.settings;

export const selectUserWorkingMinutes = createSelector(
  [selectSettingsReducer],
  (settingsSlice) => settingsSlice.userWorkingMinutes
);
export const selectUserShortBreakMinutes = createSelector(
  [selectSettingsReducer],
  (settingsSlice) => settingsSlice.userShortBreakMinutes
);
export const selectUserLongBreakMinutes = createSelector(
  [selectSettingsReducer],
  (settingsSlice) => settingsSlice.userLongBreakMinutes
);
export const selectUserMaxCycles = createSelector(
  [selectSettingsReducer],
  (settingsSlice) => settingsSlice.userMaxCycles
);
