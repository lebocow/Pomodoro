import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import ReportButton from "../../components/report-button/report-button.component";
import SettingsButton from "../../components/settings-button/settings-button.component";
import Logo from "../../components/logo/logo-component";
import SignInButton from "../../components/sign-in-button/sign-in-button.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/slices/user/user.selector";
import SignOutButton from "../../components/sign-out-button/sign-out-button.component";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Fragment>
      <div className="w-full flex items-center justify-between space-x-10 p-5 h-min">
        <Logo />
        <div className="flex items-center space-x-1">
          <ReportButton />
          <SettingsButton />
          {currentUser ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
      <div className="mt-2 mb-20 border-t max-w-[90vw] border-t-gray-100 w-full" />
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
