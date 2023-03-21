import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Outlet } from "react-router-dom";

import { auth } from "./utils/firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";

import { setCurrentUser } from "./store/slices/user/user.slice";

import { selectWorkingMode } from "./store/slices/timer/timer.selector";
import { selectUserThemesColors } from "./store/slices/settings/settings.selector";

export default function App() {
  const workingMode = useSelector(selectWorkingMode);
  const { background } = useSelector(selectUserThemesColors)[workingMode] as {
    background: string;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen ${background} items-center transition-colors duration-300 text-slate-50`}
    >
      <Outlet />
    </div>
  );
}
