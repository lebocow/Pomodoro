import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
});

export const {
  setUserWorkingMinutes,
  setUserShortBreakMinutes,
  setUserLongBreakMinutes,
  setUserMaxCycles,
} = settingsSlice.actions;

export default settingsSlice.reducer;
