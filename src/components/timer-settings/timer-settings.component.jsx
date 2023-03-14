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
import { selectWorkingTypes } from "../../store/slices/timer/timer.selector";

import {
  setCycle,
  setIsRunning,
  setMinutes,
  setSeconds,
  setWorkingMode,
} from "../../store/slices/timer/timer.slice";
import { selectPomDocRef } from "../../store/slices/user/user.selector";
import {
  setCurrentUser,
  setPomDocRef,
} from "../../store/slices/user/user.slice";
import { deletePomodoroDocument } from "../../utils/firebase/firebase.utils";

const TimerSettings = () => {
  const dispatch = useDispatch();
  const userWorkingMinutes = useSelector(selectUserWorkingMinutes);
  const userShortBreakMinutes = useSelector(selectUserShortBreakMinutes);
  const userLongBreakMinutes = useSelector(selectUserLongBreakMinutes);
  const userMaxCycles = useSelector(selectUserMaxCycles);
  const workingTypes = useSelector(selectWorkingTypes);
  const pomDocRef = useSelector(selectPomDocRef);

  const resetPomodoroTimer = () => {
    dispatch(setWorkingMode(workingTypes[4]));
    dispatch(setMinutes(0));
    dispatch(setIsRunning(false));
    dispatch(setCycle(0));
    if (pomDocRef) {
      deletePomodoroDocument(pomDocRef);
      dispatch(setPomDocRef(null));
    }
  };

  const handleWorkingMinutesChange = (event) => {
    dispatch(setUserWorkingMinutes(event.target.value));
    dispatch(setMinutes(event.target.value));
    dispatch(setSeconds(0));
    resetPomodoroTimer();
  };

  const handleShortBreakMinutesChange = (event) => {
    dispatch(setUserShortBreakMinutes(Number(event.target.value)));
    resetPomodoroTimer();
  };

  const handleLongBreakMinutesChange = (event) => {
    dispatch(setUserLongBreakMinutes(Number(event.target.value)));
    resetPomodoroTimer();
  };

  const handleMaxCyclesChange = (event) => {
    dispatch(setUserMaxCycles(Number(event.target.value)));
    resetPomodoroTimer();
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
