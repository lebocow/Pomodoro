import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  pomDocRef: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setPomDocRef: (state, action) => {
      state.pomDocRef = action.payload;
    },
  },
});

export const { setCurrentUser, setPomDocRef } = userSlice.actions;

export default userSlice.reducer;
