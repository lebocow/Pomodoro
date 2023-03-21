import React from "react";

import SoundSettings from "../../components/sound-settings/sound-settings.component";
import ThemeSettings from "../../components/theme-settings/theme-settings.component";
import TimerSettings from "../../components/timer-settings/timer-settings.component";

const Settings = () => {
  return (
    <div className="h-full w-full">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <TimerSettings />
        <SoundSettings />
        <ThemeSettings />
      </div>
    </div>
  );
};
export default Settings;
