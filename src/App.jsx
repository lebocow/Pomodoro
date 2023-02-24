import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectWorkingMode } from "./store/slices/timer/timer.selector";

export default function App() {
  const workingMode = useSelector(selectWorkingMode);

  let backgroundClass = "bg-red-700/80";

  if (workingMode === "Working") {
    backgroundClass = "bg-red-700/80";
  } else if (workingMode === "ShortBreak") {
    backgroundClass = "bg-blue-700/80";
  } else if (workingMode === "LongBreak") {
    backgroundClass = "bg-green-700/80";
  } else if (workingMode === "Finished") {
    backgroundClass = "bg-orange-700/80";
  }

  return (
    <div
      className={`flex flex-col min-h-screen ${backgroundClass} items-center transition-colors duration-300 text-slate-50`}
    >
      <Outlet />
    </div>
  );
}
