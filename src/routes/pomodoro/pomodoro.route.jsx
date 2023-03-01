import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserMaxCycles,
  selectUserSound,
} from "../../store/slices/settings/settings.selector";
import {
  selectCycle,
  selectIsRunning,
  selectMinutes,
  selectSeconds,
  selectWorkingMode,
  selectWorkingTypes,
} from "../../store/slices/timer/timer.selector";

import {
  decrementSeconds,
  decrementMinutes,
  setMinutes,
  setSeconds,
  setWorkingMode,
  setIsRunning,
  setCycle,
} from "../../store/slices/timer/timer.slice";

import useSound from "use-sound";
import CycleDisplay from "../../components/cycle-display/cycle-display.component";
import TimerDisplay from "../../components/timer-display/timer-display.component";
import PomodoroButton from "../../components/pomodoro-button/pomodoroButton.component";

const Pomodoro = () => {
  const dispatch = useDispatch();
  const workingTypes = useSelector(selectWorkingTypes);
  const workingMode = useSelector(selectWorkingMode);
  const minutes = useSelector(selectMinutes);
  const seconds = useSelector(selectSeconds);
  const isRunning = useSelector(selectIsRunning);
  const cycle = useSelector(selectCycle);
  const maxCycles = useSelector(selectUserMaxCycles);
  const [initialRender, setInitialRender] = useState(true);
  const { settings: settingsState } = useSelector((state) => state);
  const { sound, volume } = useSelector(selectUserSound);
  const [playSound] = useSound(sound, { volume: volume });

  const intervalRef = useRef(null);

  const intervalFn = useMemo(() => {
    return isRunning
      ? () => {
          intervalRef.current = setInterval(() => {
            dispatch(decrementSeconds());
          }, 25);
        }
      : () => clearInterval(intervalRef.current);
  }, [isRunning, intervalRef]);

  useEffect(() => {
    intervalFn();
    return () => clearInterval(intervalRef.current);
  }, [intervalFn, intervalRef]);

  useEffect(() => {
    if (seconds === -1) {
      dispatch(decrementMinutes());
      dispatch(setSeconds(59));
    }

    if (minutes < 0) {
      switch (workingMode) {
        case "longbreak": {
          dispatch(setWorkingMode(workingTypes[3]));
          break;
        }
        case "shortbreak": {
          dispatch(setWorkingMode(workingTypes[0]));
          break;
        }
        case "working": {
          dispatch(
            setWorkingMode(
              cycle === maxCycles ? workingTypes[2] : workingTypes[1]
            )
          );
          break;
        }
        case "finished": {
          dispatch(setWorkingMode(workingTypes[0]));
          break;
        }
        default: {
          break;
        }
      }
    }
  }, [seconds, minutes]);

  const handleWorkingMode = useMemo(
    () => () => {
      switch (workingMode) {
        case "working": {
          dispatch(setCycle(cycle < maxCycles ? cycle + 1 : cycle));
          dispatch(setMinutes(settingsState.userWorkingMinutes));
          break;
        }
        case "shortbreak": {
          dispatch(setMinutes(settingsState.userShortBreakMinutes));
          break;
        }
        case "longbreak": {
          dispatch(setMinutes(settingsState.userLongBreakMinutes));
          break;
        }
        case "finished": {
          dispatch(setMinutes(0));
          dispatch(setIsRunning(false));
          dispatch(setCycle(0));
          break;
        }
        default: {
          break;
        }
      }
    },
    [workingMode, cycle, maxCycles]
  );

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }

    handleWorkingMode();
    dispatch(setSeconds(0));
    playSound();
  }, [workingMode, settingsState]);

  return (
    <div className="h-full flex overflow-scroll shadow-xl">
      <div className="flex flex-col py-5 px-9 items-center justify-between h-72 bg-white/20 rounded-lg font-semibold w-[80vw] sm:w-[30rem]">
        <CycleDisplay />
        <TimerDisplay />
        <PomodoroButton />
      </div>
    </div>
  );
};

export default Pomodoro;
