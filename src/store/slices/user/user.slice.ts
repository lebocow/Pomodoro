import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentReference } from "firebase/firestore";
import { User } from "firebase/auth";

type UserState = {
  currentUser: null | User;
  pomDocRef: null | DocumentReference;
};

const initialState: UserState = {
  currentUser: null,
  pomDocRef: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setPomDocRef: (state, action: PayloadAction<DocumentReference | null>) => {
      state.pomDocRef = action.payload;
    },
  },
});

export const { setCurrentUser, setPomDocRef } = userSlice.actions;

export default userSlice.reducer;
