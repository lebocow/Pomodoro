import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSounds,
  selectUserSound,
} from "../../store/slices/settings/settings.selector";
import { setUserSound } from "../../store/slices/settings/settings.slice";

const SoundSettings = () => {
  const dispatch = useDispatch();
  const sounds = useSelector(selectSounds);
  const userSound = useSelector(selectUserSound);

  const handleSoundChange = (event) => {
    dispatch(setUserSound(event.target.value));
  };

  return (
    <div className="p-3 flex flex-col items-center justify-center">
      <div className="bg-white/10 p-3 rounded-lg">
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
    </div>
  );
};

export default SoundSettings;
