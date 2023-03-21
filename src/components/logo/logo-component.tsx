import React from "react";

import { NavLink } from "react-router-dom";
import tomatoLogo from "../../assets/tomatoLogo.svg";

const Logo = () => (
  <NavLink to="/" className="flex items-center cursor-pointer">
    <img className="w-10 h-10" src={tomatoLogo}></img>
    <div className="hidden sm:block sm:text-xl">Pomodoro</div>
  </NavLink>
);

export default Logo;
