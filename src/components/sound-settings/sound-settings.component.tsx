import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import useSound from "use-sound";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

import {
  selectSounds,
  selectUserSound,
} from "../../store/slices/settings/settings.selector";
import {
  setUserSound,
  setUserVolume,
} from "../../store/slices/settings/settings.slice";

const usePlaySound = (
  sound: string,
  volume: number
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [playSound] = useSound(sound, { volume });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      playSound();
    }
  }, [playSound, isPlaying]);

  return [isPlaying, setIsPlaying];
};

const SoundSettings = () => {
  const dispatch = useDispatch();
  const sounds = useSelector(selectSounds);
  const { sound: userSound, volume } = useSelector(selectUserSound);
  const [_, setIsPlaying] = usePlaySound(userSound, volume);

  const handleSoundChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setUserSound(event.target.value));
    setIsPlaying(true);
  };

  const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserVolume(+event.target.value));
  };

  return (
    <div className="p-3 flex flex-col items-center justify-center">
      <div className="bg-white/10 p-3 rounded-lg">
        <div className="flex space-x-1 items-center">
          <FontAwesomeIcon className="h-4 w-4" icon={faMusic} />
          <div>Sounds</div>
        </div>
        <div className="flex flex-col space-y-2">
          <div>
            <div>Alarm Sounds</div>
            <select
              value={userSound}
              onChange={handleSoundChange}
              className="text-black rounded-sm outline-none"
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
          <div>
            <div>Volume</div>
            <input
              onChange={handleVolume}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              type="range"
              max={1}
              min={0.01}
              step={0.005}
              value={volume}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundSettings;
