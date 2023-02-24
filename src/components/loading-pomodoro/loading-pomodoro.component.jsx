import tomatoLogo from "../../assets/tomatoLogo.svg";

const LoadingPomodoro = () => {
  return (
    <div className="min-h-screen bg-red-700/80 flex items-center justify-center">
      <img className="h-40 animate-bounce" src={tomatoLogo} />
    </div>
  );
};

export default LoadingPomodoro;
