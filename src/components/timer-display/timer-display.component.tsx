import React from "react";
import { useSelector } from "react-redux";
import {
  selectMinutes,
  selectSeconds,
} from "../../store/slices/timer/timer.selector";

const TimerDisplay = () => {
  const minutes = useSelector(selectMinutes);
  const seconds = useSelector(selectSeconds);

  return (
    <span className="text-7xl">
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </span>
  );
};

export default TimerDisplay;
