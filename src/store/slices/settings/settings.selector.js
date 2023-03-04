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
export const selectSounds = createSelector(
  [selectSettingsReducer],
  (settingsSlice) => settingsSlice.sounds
);
export const selectUserSound = createSelector(
  [selectSettingsReducer],
  (settingsSlice) => settingsSlice.userSound
);
export const selectUserThemesColors = createSelector(
  [selectSettingsReducer],
  (settingsSlice) => settingsSlice.userThemesColors
);
export const selectThemesColors = createSelector(
  [selectSettingsReducer],
  (settingsSlice) => settingsSlice.themesColors
);
