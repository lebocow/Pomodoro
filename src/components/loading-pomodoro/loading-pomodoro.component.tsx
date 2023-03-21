import React from "react";
import { useSelector } from "react-redux";

import { selectUserThemesColors } from "../../store/slices/settings/settings.selector";
import { selectWorkingMode } from "../../store/slices/timer/timer.selector";

import tomatoLogo from "../../assets/tomatoLogo.svg";

const LoadingPomodoro = () => {
  const workingMode = useSelector(selectWorkingMode);
  const { background } = useSelector(selectUserThemesColors)[workingMode] as {
    background: string;
  };

  return (
    <div
      className={`min-h-screen ${background} flex items-center justify-center`}
    >
      <img className="h-40 animate-bounce" src={tomatoLogo} />
    </div>
  );
};

export default LoadingPomodoro;
