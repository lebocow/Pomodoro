import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserLongBreakMinutes,
  selectUserMaxCycles,
  selectUserShortBreakMinutes,
  selectUserWorkingMinutes,
} from "../../store/slices/settings/settings.selector";
import {
  setUserLongBreakMinutes,
  setUserMaxCycles,
  setUserShortBreakMinutes,
  setUserWorkingMinutes,
} from "../../store/slices/settings/settings.slice";

import { setMinutes, setSeconds } from "../../store/slices/timer/timer.slice";

const TimerSettings = () => {
  const dispatch = useDispatch();
  const userWorkingMinutes = useSelector(selectUserWorkingMinutes);
  const userShortBreakMinutes = useSelector(selectUserShortBreakMinutes);
  const userLongBreakMinutes = useSelector(selectUserLongBreakMinutes);
  const userMaxCycles = useSelector(selectUserMaxCycles);

  const handleWorkingMinutesChange = (event) => {
    dispatch(setUserWorkingMinutes(event.target.value));
    dispatch(setMinutes(event.target.value));
    dispatch(setSeconds(0));
  };

  const handleShortBreakMinutesChange = (event) => {
    dispatch(setUserShortBreakMinutes(Number(event.target.value)));
  };

  const handleLongBreakMinutesChange = (event) => {
    dispatch(setUserLongBreakMinutes(Number(event.target.value)));
  };

  const handleMaxCyclesChange = (event) => {
    dispatch(setUserMaxCycles(Number(event.target.value)));
  };

  return (
    <div className="p-3 flex flex-col items-center justify-center">
      <div className="bg-white/10 p-3 rounded-lg space-y-2">
        <div className="flex space-x-1 items-center">
          <FontAwesomeIcon className="h-5 w-5" icon={faClock} />
          <div>Timer</div>
        </div>
        <div>
          <div>Minutes</div>
          <input
            className="text-black px-1 rounded-sm outline-none"
            type="number"
            value={userWorkingMinutes}
            onChange={handleWorkingMinutesChange}
            min={1}
          />
        </div>
        <div>
          <div>Short Pause</div>
          <input
            className="text-black px-1 rounded-sm outline-none"
            type="number"
            value={userShortBreakMinutes}
            onChange={handleShortBreakMinutesChange}
            min={1}
          />
        </div>
        <div>
          <div>Long Pause</div>
          <input
            className="text-black px-1 rounded-sm outline-none"
            type="number"
            value={userLongBreakMinutes}
            onChange={handleLongBreakMinutesChange}
            min={1}
          />
        </div>
        <div>
          <div>Work cycles</div>
          <input
            className="text-black px-1 rounded-sm outline-none"
            type="number"
            value={userMaxCycles}
            onChange={handleMaxCyclesChange}
            min={1}
          />
        </div>
      </div>
    </div>
  );
};

export default TimerSettings;
