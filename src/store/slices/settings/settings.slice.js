import { createSlice } from "@reduxjs/toolkit";

import aggresiveSfx from "../../../sounds/aggresive.mp3";
import tweetBirdSfx from "../../../sounds/tweetBird.mp3";

const soundEffects = [aggresiveSfx, tweetBirdSfx];

const initialState = {
  sounds: soundEffects,
  userSound: soundEffects[0],
  userWorkingMinutes: 25,
  userShortBreakMinutes: 5,
  userLongBreakMinutes: 15,
  userMaxCycles: 4,
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
