import { combineReducers } from "redux";
import timerReducer from "./slices/timer/timer.slice";
import settingsReducer from "./slices/settings/settings.slice";
import userReducer from "./slices/user/user.slice";

export const rootReducer = combineReducers({
  timer: timerReducer,
  settings: settingsReducer,
  user: userReducer,
});
