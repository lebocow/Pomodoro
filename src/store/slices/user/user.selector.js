import { createSelector } from "@reduxjs/toolkit";

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.currentUser
);
export const selectPomDocRef = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.pomDocRef
);
