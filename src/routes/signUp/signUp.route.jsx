import { useState } from "react";
import { useSelector } from "react-redux";

import { selectUserThemesColors } from "../../store/slices/settings/settings.selector";

import { selectWorkingMode } from "../../store/slices/timer/timer.selector";

import { authSignUpWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import registerImage from "../../images/pexels-anastasia-shuraeva-7279327.jpg";

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const workingMode = useSelector(selectWorkingMode);
  const { background: backgroundColor } = useSelector(selectUserThemesColors)[
    workingMode
  ];

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) return;
    try {
      const user = await authSignUpWithEmailAndPassword(
        email,
        password,
        displayName
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row bg-white/20 rounded-md overflow-hidden">
      <div className="">
        <img
          className="w-96 hidden sm:block"
          src={registerImage}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-center rounded-md p-5">
        <div className="mb-5">Register now</div>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col h-full sm:w-80"
        >
          <div className="flex flex-col space-y-5 w-full mb-2">
            <input
              className="text-black p-2 rounded-sm outline-none"
              onChange={handleDisplayNameChange}
              type="text"
              placeholder="Display Name"
              value={displayName}
              required
            />
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
            <input
              className="text-black p-2 rounded-sm outline-none"
              onChange={handleConfirmPasswordChange}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              required
            />
          </div>
          <button className={`p-3 rounded-sm ${backgroundColor} mt-auto`}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
