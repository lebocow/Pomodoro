import { useSelector } from "react-redux";
import tomatoLogo from "../../assets/tomatoLogo.svg";
import { selectUserThemesColors } from "../../store/slices/settings/settings.selector";
import { selectWorkingMode } from "../../store/slices/timer/timer.selector";

const LoadingPomodoro = () => {
  const workingMode = useSelector(selectWorkingMode);
  const backgroundColor = useSelector(selectUserThemesColors)[workingMode]
    .background;

  return (
    <div
      className={`min-h-screen ${backgroundColor} flex items-center justify-center`}
    >
      <img className="h-40 animate-bounce" src={tomatoLogo} />
    </div>
  );
};

export default LoadingPomodoro;
