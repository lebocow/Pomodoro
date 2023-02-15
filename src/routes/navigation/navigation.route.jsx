import tomatoLogo from "../../assets/tomatoLogo.svg";
import reports from "../../assets/reports.svg";
import settings from "../../assets/sliders-solid.svg";
import user from "../../assets/user-tie.svg";
import { Fragment } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <div className="container flex items-center justify-between space-x-10 p-5 h-min">
        <NavLink to="/" className="flex items-center cursor-pointer">
          <img className="w-10 h-10 fill-red-500" src={tomatoLogo}></img>
          <div className="text-xl">Pomodoro</div>
        </NavLink>
        <div className="flex items-center space-x-1">
          <NavLink
            to="/reports"
            className="flex flex-row items-center justify-center space-x-1 bg-red-400/50 px-3 py-1 rounded-2xl hover:rounded-lg duration-150 cursor-pointer"
          >
            <div className="">
              <img
                className="w-6 h-6 sm:w-8 sm:h-8 fill-white "
                src={reports}
              ></img>
            </div>
            <span className="hidden sm:block">Reports</span>
          </NavLink>
          <NavLink
            to="/settings"
            className="flex flex-row items-center justify-center space-x-1 bg-red-400/50 px-3 py-1 rounded-2xl hover:rounded-lg duration-150 cursor-pointer"
          >
            <div className="">
              <img className="w-6 h-6 sm:w-8 sm:h-8" src={settings}></img>
            </div>
            <span className="hidden sm:block">Settings</span>
          </NavLink>
          <NavLink
            to="/login"
            className="flex flex-row items-center justify-center space-x-1 bg-red-400/50 px-3 py-1 rounded-2xl hover:rounded-lg duration-150 cursor-pointer"
          >
            <div className="">
              <img className="w-6 h-6 sm:w-8 sm:h-8" src={user}></img>
            </div>
            <span className="hidden sm:block">Log in</span>
          </NavLink>
        </div>
      </div>
      <div className="mt-2 border-t max-w-[90vw] border-t-gray-100 w-full"></div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
