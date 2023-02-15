import { combineReducers } from "redux";
import timerReducer from "./slices/timerSlice";
import settingsReducer from "./slices/settingsSlice";

export const rootReducer = combineReducers({
  timer: timerReducer,
  settings: settingsReducer,
});
