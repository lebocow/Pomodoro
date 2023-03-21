import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectUserSound,
  selectUserThemesColors,
} from "../../store/slices/settings/settings.selector";

import {
  selectIsRunning,
  selectWorkingMode,
  selectWorkingTypes,
} from "../../store/slices/timer/timer.selector";
import {
  setIsRunning,
  setWorkingMode,
} from "../../store/slices/timer/timer.slice";

import useSound from "use-sound";
import click from "../../sounds/click.mp3";

const PomodoroButton = () => {
  const dispatch = useDispatch();
  const isRunning = useSelector(selectIsRunning);
  const workingTypes = useSelector(selectWorkingTypes);
  const workingMode = useSelector(selectWorkingMode);
  const { volume } = useSelector(selectUserSound);
  const [playClick] = useSound(click, { volume: volume });
  const { border: borderColor, text: textColor } = useSelector(
    selectUserThemesColors
  )[workingMode] as { border: string; text: string };

  const handleButton = () => {
    playClick();
    if (workingMode === "initial" || workingMode === "finished") {
      dispatch(setWorkingMode(workingTypes[0]));
    }
    dispatch(setIsRunning(!isRunning));
  };

  return (
    <button
      onClick={handleButton}
      className={`bg-white w-1/2 ${textColor} mt-4 p-3 rounded-lg border-b-4 ${borderColor} hover:-translate-y-0.5 transition shadow-lg active:translate-y-0.5 active:shadow-md`}
    >
      {!isRunning ? "Start" : "Pause"}
    </button>
  );
};

export default PomodoroButton;
