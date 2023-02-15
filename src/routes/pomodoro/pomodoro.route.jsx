import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementSeconds,
  decrementMinutes,
  setMinutes,
  setSeconds,
  setWorkingMode,
  setIsRunning,
  setCycle,
} from "../../store/slices/timerSlice";

const Pomodoro = () => {
  const { timer: timerState, settings: settingsState } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const intervalRef = useRef(null);

  useEffect(() => {
    if (timerState.isRunning) {
      intervalRef.current = setInterval(() => {
        console.log(timerState);
        dispatch(decrementSeconds());
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timerState.isRunning]);

  useEffect(() => {
    if (timerState.seconds === -1) {
      dispatch(decrementMinutes());
      dispatch(setSeconds(59));
    }

    if (timerState.minutes < 0) {
      switch (timerState.workingMode) {
        case "LongBreak": {
          dispatch(
            setWorkingMode(
              timerState.maxCycles
                ? timerState.workingTypes[3]
                : timerState.workingTypes[0]
            )
          );
          dispatch(
            setIsRunning(
              timerState.cycle === timerState.maxCycles ? false : true
            )
          );
          break;
        }
        case "ShortBreak": {
          dispatch(setWorkingMode(timerState.workingTypes[0]));
          dispatch(
            setCycle(
              timerState.cycle < timerState.maxCycles
                ? timerState.cycle + 1
                : timerState.cycle
            )
          );
          break;
        }
        case "Working": {
          dispatch(
            setWorkingMode(
              timerState.cycle === timerState.maxCycles
                ? timerState.workingTypes[2]
                : timerState.workingTypes[1]
            )
          );
          break;
        }
        case "Finished": {
          dispatch(setWorkingMode(timerState.workingTypes[0]));
          break;
        }

        default:
          break;
      }
    }
  }, [timerState.seconds, timerState.minutes]);

  useEffect(() => {
    switch (timerState.workingMode) {
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
      default:
        break;
    }
  }, [timerState.workingMode]);
  return (
    <div className="flex flex-col py-5 px-9 mt-20 items-center justify-between h-72 bg-white/20 rounded-lg font-semibold w-[30rem]">
      <div className="text-xl mb-4">Cycle: {timerState.cycle}</div>
      <span className="text-7xl">
        {timerState.minutes.toString().padStart(2, 0)}:
        {timerState.seconds.toString().padStart(2, 0)}
      </span>
      <button
        onClick={() => dispatch(setIsRunning(!timerState.isRunning))}
        className="bg-white w-1/2 text-red-500 mt-4 p-3 rounded-lg border-b-4 border-b-red-700/80 hover:-translate-y-0.5 transition shadow-lg active:translate-y-0.5 active:shadow-md"
      >
        {!timerState.isRunning ? "Start" : "Pause"}
      </button>
    </div>
  );
};

export default Pomodoro;
