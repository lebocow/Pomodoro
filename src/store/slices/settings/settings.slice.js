import { createSlice } from "@reduxjs/toolkit";

import aggresiveSfx from "../../../sounds/aggresive.mp3";
import tweetBirdSfx from "../../../sounds/tweetBird.mp3";
import boxingBellSfx from "../../../sounds/boxingBell.mp3";

const soundEffects = [aggresiveSfx, tweetBirdSfx, boxingBellSfx];
const themesColors = {
  initial: {
    background: "bg-red-700/80",
    border: "border-b-red-700/80",
    text: "text-red-500",
  },
  working: {
    background: "bg-red-700/80",
    border: "border-b-red-700/80",
    text: "text-red-500",
  },
  shortbreak: {
    background: "bg-blue-700/80",
    border: "border-b-blue-700/80",
    text: "text-blue-500",
  },
  longbreak: {
    background: "bg-green-700/80",
    border: "border-b-green-700/80",
    text: "text-green-500",
  },
  finished: {
    background: "bg-orange-700/80",
    border: "border-b-orange-700/80",
    text: "text-orange-500",
  },
};

const initialState = {
  sounds: soundEffects,
  userSound: { sound: soundEffects[0], volume: 0.5 },
  userWorkingMinutes: 25,
  userShortBreakMinutes: 5,
  userLongBreakMinutes: 15,
  userMaxCycles: 4,
  themesColors: themesColors,
  userThemesColors: {
    initial: themesColors.initial,
    working: themesColors.working,
    shortbreak: themesColors.shortbreak,
    longbreak: themesColors.longbreak,
    finished: themesColors.finished,
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
      state.userSound.sound = action.payload;
    },
    setUserThemesColors: (state, action) => {
      state.userThemesColors[action.payload.mode] = {
        background: action.payload.background,
        border: action.payload.border,
        text: action.payload.text,
      };
    },
    setUserVolume: (state, action) => {
      state.userSound.volume = action.payload;
    },
  },
});

export const {
  setUserWorkingMinutes,
  setUserShortBreakMinutes,
  setUserLongBreakMinutes,
  setUserMaxCycles,
  setUserSound,
  setUserVolume,
} = settingsSlice.actions;

export default settingsSlice.reducer;
