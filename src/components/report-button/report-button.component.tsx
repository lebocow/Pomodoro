import React from "react";

import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const ReportButton = () => (
  <NavLink
    to="/reports"
    className="flex flex-row items-center justify-center space-x-1 bg-white/10 px-3 py-1 rounded-2xl hover:rounded-lg duration-150 cursor-pointer"
  >
    <FontAwesomeIcon
      className="h-6 w-6 sm:w-7 sm:h-7 text-black"
      icon={faCalendar}
    />
    <span className="hidden sm:block">Reports</span>
  </NavLink>
);

export default ReportButton;
