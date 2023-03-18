import { createSlice } from "@reduxjs/toolkit";

import aggresiveSfx from "../../../sounds/aggresive.mp3";
import tweetBirdSfx from "../../../sounds/tweetBird.mp3";
import boxingBellSfx from "../../../sounds/boxingBell.mp3";

const soundEffects = [aggresiveSfx, tweetBirdSfx, boxingBellSfx];
const themesColors = {
  red: {
    background: "bg-red-700/80",
    border: "border-b-red-700/80",
    text: "text-red-500",
    chartFill: "rgb(185 28 28 / 0.8)",
  },
  blue: {
    background: "bg-blue-700/80",
    border: "border-b-blue-700/80",
    text: "text-blue-500",
    chartFill: "rgb(29 78 216 / 0.8)",
  },
  green: {
    background: "bg-green-700/80",
    border: "border-b-green-700/80",
    text: "text-green-500",
    chartFill: "rgb(21 128 61 / 0.8)",
  },
  orange: {
    background: "bg-orange-700/80",
    border: "border-b-orange-700/80",
    text: "text-orange-500",
    chartFill: "rgb(194 65 12 / 0.8)",
  },
  fuchsia: {
    background: "bg-fuchsia-700/80",
    border: "border-b-fuchsia-700/80",
    text: "text-fuchsia-500",
    chartFill: "rgb(162 28 175 / 0.8)",
  },
  purple: {
    background: "bg-purple-700/80",
    border: "border-b-purple-700/80",
    text: "text-purple-500",
    chartFill: "rgb(126 34 206 / 0.8)",
  },
  rose: {
    background: "bg-rose-700/80",
    border: "border-b-rose-700/80",
    text: "text-rose-500",
    chartFill: "rgb(190 18 60 / 0.8)",
  },
  cyan: {
    background: "bg-cyan-700/80",
    border: "border-b-cyan-700/80",
    text: "text-cyan-500",
    chartFill: "rgb(14 116 144 / 0.8)",
  },
  teal: {
    background: "bg-teal-700/80",
    border: "border-b-teal-700/80",
    text: "text-teal-500",
    chartFill: "rgb(15 118 110 / 0.8)",
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
    initial: themesColors.red,
    working: themesColors.red,
    shortbreak: themesColors.blue,
    longbreak: themesColors.green,
    finished: themesColors.orange,
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
        chartFill: action.payload.chartFill,
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
  setUserThemesColors,
} = settingsSlice.actions;

export default settingsSlice.reducer;
