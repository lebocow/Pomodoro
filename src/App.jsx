import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectWorkingMode } from "./store/slices/timer/timer.selector";
import { selectUserThemesColors } from "./store/slices/settings/settings.selector";

export default function App() {
  const workingMode = useSelector(selectWorkingMode);
  const backgroundColor = useSelector(selectUserThemesColors)[workingMode]
    .background;

  return (
    <div
      className={`flex flex-col min-h-screen ${backgroundColor} items-center transition-colors duration-300 text-slate-50`}
    >
      <Outlet />
    </div>
  );
}
