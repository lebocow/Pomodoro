import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import ReportButton from "../../components/report-button/report-button.component";
import SettingsButton from "../../components/settings-button/settings-button.component";
import LoginButton from "../../components/log-in-button/log-in-button.component";
import Logo from "../../components/logo/logo-component";

const Navigation = () => {
  return (
    <Fragment>
      <div className="w-full flex items-center justify-between space-x-10 p-5 h-min">
        <Logo />
        <div className="flex items-center space-x-1">
          <ReportButton />
          <SettingsButton />
          <LoginButton />
        </div>
      </div>
      <div className="mt-2 mb-20 border-t max-w-[90vw] border-t-gray-100 w-full" />
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
