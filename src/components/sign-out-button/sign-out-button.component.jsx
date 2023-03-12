import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import { auth, authSignOut } from "../../utils/firebase/firebase.utils";

const SignOutButton = () => {
  const handleSignOut = async () => {
    await authSignOut();
  };

  return (
    <div
      onClick={handleSignOut}
      className="flex flex-row items-center justify-center space-x-1 bg-white/10 px-3 py-1 rounded-2xl hover:rounded-lg duration-150 cursor-pointer"
    >
      <FontAwesomeIcon
        className="h-6 w-6 sm:w-7 sm:h-7 text-black"
        icon={faUser}
      />
      <span className="hidden sm:block">Sign out</span>
    </div>
  );
};

export default SignOutButton;
