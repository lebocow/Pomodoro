import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPomDocRef } from "../../store/slices/user/user.slice";
import { selectCurrentUser } from "../../store/slices/user/user.selector";

import { authSignOut } from "../../utils/firebase/firebase.utils";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignOutButton = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const handleSignOut = async () => {
    await authSignOut();
    dispatch(setPomDocRef(null));
  };

  return (
    <div
      onClick={handleSignOut}
      className="flex flex-row items-center justify-center space-x-1 bg-white/10 px-3 py-1 rounded-2xl hover:rounded-lg duration-150 cursor-pointer"
    >
      {currentUser && currentUser.photoURL ? (
        <img className="h-7 w-7 rounded-full" src={currentUser.photoURL} />
      ) : (
        <FontAwesomeIcon
          className="h-6 w-6 sm:w-7 sm:h-7 text-black"
          icon={faUser}
        />
      )}
      <span className="hidden sm:block">Sign out</span>
    </div>
  );
};

export default SignOutButton;
