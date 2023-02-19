import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSounds,
  selectUserLongBreakMinutes,
  selectUserMaxCycles,
  selectUserShortBreakMinutes,
  selectUserSound,
  selectUserWorkingMinutes,
} from "../../store/slices/settings/settings.selector";
import {
  setUserLongBreakMinutes,
  setUserMaxCycles,
  setUserShortBreakMinutes,
  setUserSound,
  setUserWorkingMinutes,
} from "../../store/slices/settings/settings.slice";
import { setMinutes, setSeconds } from "../../store/slices/timer/timer.slice";

const Settings = () => {
  const dispatch = useDispatch();
  const userWorkingMinutes = useSelector(selectUserWorkingMinutes);
  const userShortBreakMinutes = useSelector(selectUserShortBreakMinutes);
  const userLongBreakMinutes = useSelector(selectUserLongBreakMinutes);
  const userMaxCycles = useSelector(selectUserMaxCycles);
  const sounds = useSelector(selectSounds);
  const userSound = useSelector(selectUserSound);

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

  const handleSoundChange = (event) => {
    dispatch(setUserSound(event.target.value));
  };

  return (
    <div className="border h-full w-full">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border p-3 flex flex-col">
          <div className="flex space-x-1 items-center">
            <FontAwesomeIcon className="h-5 w-5" icon={faClock} />
            <div>Timer</div>
          </div>
          <div>
            <div>Minutes</div>
            <input
              className="text-black"
              type="number"
              value={userWorkingMinutes}
              onChange={handleWorkingMinutesChange}
              min={1}
            />
          </div>
          <div>
            <div>Short Pause</div>
            <input
              className="text-black"
              type="number"
              value={userShortBreakMinutes}
              onChange={handleShortBreakMinutesChange}
              min={1}
            />
          </div>
          <div>
            <div>Long Pause</div>
            <input
              className="text-black"
              type="number"
              value={userLongBreakMinutes}
              onChange={handleLongBreakMinutesChange}
              min={1}
            />
          </div>
          <div>
            <div>Work cycles</div>
            <input
              className="text-black"
              type="number"
              value={userMaxCycles}
              onChange={handleMaxCyclesChange}
              min={1}
            />
          </div>
        </div>
        <div className="border p-3 flex flex-col">
          <div className="flex space-x-1 items-center">
            <FontAwesomeIcon className="h-4 w-4" icon={faMusic} />
            <div>Sounds</div>
          </div>
          <div>
            <div>Alarm Sounds</div>
            <select
              value={userSound}
              onChange={handleSoundChange}
              className="text-black"
            >
              <option value="">--- Select a Sound ---</option>
              {sounds.map((sound) => {
                const soundName = sound.split("/").slice(-1)[0].split(".")[0];
                return (
                  <option key={sound} value={sound}>
                    {soundName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="border p-3 flex flex-col">THEME</div>
      </div>
    </div>
  );
};

export default Settings;
