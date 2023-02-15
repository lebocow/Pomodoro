import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./storeReducer";

export const store = configureStore({
  reducer: rootReducer,
});
