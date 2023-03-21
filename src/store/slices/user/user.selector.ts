import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectUserReducer = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.currentUser
);
export const selectPomDocRef = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.pomDocRef
);
