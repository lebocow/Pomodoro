import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const SettingsButton = () => (
  <NavLink
    to="/settings"
    className="flex flex-row items-center justify-center space-x-1 bg-white/10 px-3 py-1 rounded-2xl hover:rounded-lg duration-150 cursor-pointer"
  >
    <FontAwesomeIcon
      className="h-6 w-6 sm:w-7 sm:h-7 text-black"
      icon={faSliders}
    />
    <span className="hidden sm:block">Settings</span>
  </NavLink>
);

export default SettingsButton;
