import React from "react";
import { useSelector } from "react-redux";

import {
  selectCycle,
  selectWorkingMode,
} from "../../store/slices/timer/timer.selector";

const PomodoroDisplay = () => {
  const cycle = useSelector(selectCycle);
  const workingMode = useSelector(selectWorkingMode);

  return (
    <div className="mb-4 flex w-full justify-around">
      <div className="text-xl">
        State: {workingMode.charAt(0).toUpperCase() + workingMode.slice(1)}
      </div>
      <div className="text-xl">Cycle: {cycle}</div>
    </div>
  );
};

export default PomodoroDisplay;
