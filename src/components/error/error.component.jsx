import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import tomato from "../../images/sadTomato.png";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen bg-red-700/80 text-gray-50 flex items-center justify-center">
        <div className="p-7 flex flex-col items-center rounded-lg hover:scale-105 duration-300 bg-white/20 w-max">
          <div className="">Error {error.status}</div>
          <div>{error.data}</div>
          <img className="h-96 w-fit" src={tomato} />
          <div>Go ahead and email Alex if you feel like this is a mistake</div>
        </div>
      </div>
    );
  }

  throw error;
};

export default Error;
