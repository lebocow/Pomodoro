import { createSlice } from "@reduxjs/toolkit";

import aggresiveSfx from "../../../sounds/aggresive.mp3";
import tweetBirdSfx from "../../../sounds/tweetBird.mp3";
import boxingBellSfx from "../../../sounds/boxingBell.mp3";

const soundEffects = [aggresiveSfx, tweetBirdSfx, boxingBellSfx];
const themesColors = ["bg-red-700/80", "bg-blue-700/80", "bg-green-700/80"];

const initialState = {
  sounds: soundEffects,
  userSound: soundEffects[0],
  userWorkingMinutes: 25,
  userShortBreakMinutes: 5,
  userLongBreakMinutes: 15,
  userMaxCycles: 4,
  themesColors: themesColors,
  userThemesColors: {
    working: themesColors[0],
    shortBreak: themesColors[1],
    longBreak: themesColors[2],
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setUserWorkingMinutes: (state, action) => {
      state.userWorkingMinutes = action.payload;
    },
    setUserShortBreakMinutes: (state, action) => {
      state.userShortBreakMinutes = action.payload;
    },
    setUserLongBreakMinutes: (state, action) => {
      state.userLongBreakMinutes = action.payload;
    },
    setUserMaxCycles: (state, action) => {
      state.userMaxCycles = action.payload;
    },
    setUserSound: (state, action) => {
      state.userSound = action.payload;
    },
    setUserThemesColors: (state, action) => {
      state.userThemesColors[action.payload.mode] = action.payload.color;
      // dispatch(setUserThemesColors, { mode: "Working", color: "bg-pink" });
    },
  },
});

export const {
  setUserWorkingMinutes,
  setUserShortBreakMinutes,
  setUserLongBreakMinutes,
  setUserMaxCycles,
  setUserSound,
} = settingsSlice.actions;

export default settingsSlice.reducer;
