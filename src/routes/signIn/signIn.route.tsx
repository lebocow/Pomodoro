import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { ImSpinner2 } from "react-icons/im";

import {
  authSignInWithEmailAndPassword,
  authWithGoogle,
} from "../../utils/firebase/firebase.utils";
import { useSelector } from "react-redux";
import { selectWorkingMode } from "../../store/slices/timer/timer.selector";
import { selectUserThemesColors } from "../../store/slices/settings/settings.selector";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const workingMode = useSelector(selectWorkingMode);
  const { background: backgroundColor } = useSelector(selectUserThemesColors)[
    workingMode
  ];

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await authSignInWithEmailAndPassword(email, password);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleNavigate = () => {
    navigate("/sign-up");
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const user = await authWithGoogle();

      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return !isLoading ? (
    <div className="flex flex-col p-3 space-y-2">
      <div className="flex flex-col items-center bg-white/20 p-5 rounded-md ">
        <div
          onClick={handleGoogleSignIn}
          className="flex items-center space-x-2 rounded-md w-full justify-center p-3 bg-white/90 shadow-md hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
        >
          <div className="text-lg text-black">Sign with with</div>
          <FcGoogle className="w-7 h-7" />
        </div>
        <div className="flex w-full items-center justify-between mb-3 mt-3">
          <div className="w-[42%] h-[1px] bg-white/30"></div>
          <div>or</div>
          <div className="w-[42%] h-[1px] bg-white/30"></div>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col h-full space-y-5 sm:w-80"
        >
          <input
            className="text-black p-2 rounded-sm outline-none "
            onChange={handleEmailChange}
            type="email"
            placeholder="Email"
            value={email}
            required
          />
          <input
            className="text-black p-2 rounded-sm outline-none "
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
            value={password}
            required
          />

          <button className={`p-3 rounded-sm ${backgroundColor}`}>
            Sign In
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <div>Do not have an account?</div>
        <div
          onClick={handleNavigate}
          className="text-sm underline hover:text-black"
        >
          Create account
        </div>
      </div>
    </div>
  ) : (
    <ImSpinner2 className="absolute top-1/2 animate-spin h-20 w-20 " />
  );
};

export default SignIn;
