import React, { useState, useRef, useEffect } from "react";

const Pomodoro = () => {
  const workingTypes = ["Working", "ShortBreak", "LongBreak", "Finished"];
  const intervalRef = useRef(null);

  const [state, setState] = useState({
    workingTypes,
    workingMode: workingTypes[0],
    minutes: 0,
    seconds: 10,
    isRunning: false,
    cycle: 0,
    maxCycles: 4,
  });

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        setState((prevValue) => ({
          ...prevValue,
          seconds: prevValue.seconds - 1,
        }));
      }, 200);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [state.isRunning]);

  useEffect(() => {
    if (state.seconds === -1) {
      setState({ ...state, minutes: state.minutes - 1, seconds: 59 });
    }

    if (state.minutes < 0) {
      setState((prevValue) => {
        switch (prevValue.workingMode) {
          case "LongBreak":
            return {
              ...prevValue,
              workingMode:
                prevValue.cycle === prevValue.maxCycles
                  ? workingTypes[3]
                  : workingTypes[0],
              isRunning: prevValue.cycle === prevValue.maxCycles ? false : true,
            };
          case "ShortBreak":
            return {
              ...prevValue,
              workingMode: workingTypes[0],
              cycle:
                prevValue.cycle < prevValue.maxCycles
                  ? prevValue.cycle + 1
                  : prevValue.cycle,
            };
          case "Working":
            return {
              ...prevValue,
              workingMode:
                prevValue.cycle === prevValue.maxCycles
                  ? workingTypes[2]
                  : workingTypes[1],
            };
          case "Finished":
            return {
              ...prevValue,
              workingMode: workingTypes[0],
            };
          default:
            return prevValue;
        }
      });
    }
  }, [state.seconds, state.minutes]);

  useEffect(() => {
    setState((prevValue) => {
      switch (prevValue.workingMode) {
        case "Working":
          return { ...prevValue, minutes: 0, seconds: 10 };
        case "ShortBreak":
          return { ...prevValue, minutes: 0, seconds: 2 };
        case "LongBreak":
          return { ...prevValue, minutes: 0, seconds: 5 };
        case "Finished":
          return {
            ...prevValue,
            minutes: 0,
            seconds: 0,
            isRunning: false,
            cycle: 0,
          };
        default:
          return prevValue;
      }
    });
  }, [state.workingMode]);
  return (
    <div className="flex flex-col py-5 px-9 mt-20 items-center justify-between h-72 bg-white/20 rounded-lg font-semibold w-[30rem]">
      <div className="text-xl mb-4">Cycle: {state.cycle}</div>
      <span className="text-7xl">
        {state.minutes.toString().padStart(2, 0)}:
        {state.seconds.toString().padStart(2, 0)}
      </span>
      <button
        onClick={() =>
          setState({
            ...state,
            isRunning: !state.isRunning,
          })
        }
        className="bg-white w-1/2 text-red-500 mt-4 p-3 rounded-lg border-b-4 border-b-red-700/80 hover:-translate-y-0.5 transition shadow-lg active:translate-y-0.5 active:shadow-md"
      >
        {!state.isRunning ? "Start" : "Pause"}
      </button>
    </div>
  );
};

export default Pomodoro;
