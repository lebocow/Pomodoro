import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectWorkingMode } from "./store/slices/timer/timer.selector";
import { selectUserThemesColors } from "./store/slices/settings/settings.selector";
import { useEffect } from "react";
import { auth } from "./utils/firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import { setCurrentUser } from "./store/slices/user/user.slice";

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
