import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCycle,
  selectIsRunning,
  selectMaxCycles,
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

const Pomodoro = () => {
  const workingTypes = useSelector(selectWorkingTypes);
  const workingMode = useSelector(selectWorkingMode);
  const minutes = useSelector(selectMinutes);
  const seconds = useSelector(selectSeconds);
  const isRunning = useSelector(selectIsRunning);
  const cycle = useSelector(selectCycle);
  const maxCycles = useSelector(selectMaxCycles);
  const [initialRender, setInitialRender] = useState(true);
  const { settings: settingsState } = useSelector((state) => state);
  const dispatch = useDispatch();

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        dispatch(decrementSeconds());
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === -1) {
      dispatch(decrementMinutes());
      dispatch(setSeconds(59));
    }

    if (minutes < 0) {
      switch (workingMode) {
        case "LongBreak": {
          dispatch(
            setWorkingMode(maxCycles ? workingTypes[3] : workingTypes[0])
          );
          dispatch(setIsRunning(cycle === maxCycles ? false : true));
          break;
        }
        case "ShortBreak": {
          dispatch(setWorkingMode(workingTypes[0]));
          dispatch(setCycle(cycle < maxCycles ? cycle + 1 : cycle));
          break;
        }
        case "Working": {
          dispatch(
            setWorkingMode(
              cycle === maxCycles ? workingTypes[2] : workingTypes[1]
            )
          );
          break;
        }
        case "Finished": {
          dispatch(setWorkingMode(workingTypes[0]));
          break;
        }
        default: {
          break;
        }
      }
    }
  }, [seconds, minutes]);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    console.log(`trigger`);
    switch (workingMode) {
      case "Working": {
        dispatch(setMinutes(settingsState.userWorkingMinutes));
        dispatch(setSeconds(0));
        break;
      }
      case "ShortBreak": {
        dispatch(setMinutes(settingsState.userShortBreakMinutes));
        dispatch(setSeconds(0));
        break;
      }
      case "LongBreak": {
        dispatch(setMinutes(settingsState.userLongBreakMinutes));
        dispatch(setSeconds(0));
        break;
      }
      case "Finished": {
        dispatch(setMinutes(0));
        dispatch(setSeconds(0));
        dispatch(setIsRunning(false));
        dispatch(setCycle(0));
        break;
      }
      default: {
        break;
      }
    }
  }, [workingMode, settingsState, dispatch]);

  return (
    <div className="flex flex-col py-5 px-9 mt-20 items-center justify-between h-72 bg-white/20 rounded-lg font-semibold w-[30rem]">
      <div className="text-xl mb-4">Cycle: {cycle}</div>
      <span className="text-7xl">
        {minutes.toString().padStart(2, 0)}:{seconds.toString().padStart(2, 0)}
      </span>
      <button
        onClick={() => dispatch(setIsRunning(!isRunning))}
        className="bg-white w-1/2 text-red-500 mt-4 p-3 rounded-lg border-b-4 border-b-red-700/80 hover:-translate-y-0.5 transition shadow-lg active:translate-y-0.5 active:shadow-md"
      >
        {!isRunning ? "Start" : "Pause"}
      </button>
    </div>
  );
};

export default Pomodoro;
