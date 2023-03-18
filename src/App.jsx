import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Outlet } from "react-router-dom";

import { auth } from "./utils/firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";

import { setCurrentUser } from "./store/slices/user/user.slice";

import { selectWorkingMode } from "./store/slices/timer/timer.selector";
import { selectUserThemesColors } from "./store/slices/settings/settings.selector";

export default function App() {
  const workingMode = useSelector(selectWorkingMode);
  const backgroundColor = useSelector(selectUserThemesColors)[workingMode]
    .background;
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen ${backgroundColor} items-center transition-colors duration-300 text-slate-50`}
    >
      <Outlet />
    </div>
  );
}
