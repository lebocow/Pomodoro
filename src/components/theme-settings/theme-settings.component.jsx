import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ThemeSettings = () => {
  return (
    <div className="p-3 flex flex-col items-center justify-center">
      <div className="bg-white/10 p-3 rounded-lg">
        <div className="flex space-x-1 items-center">
          <FontAwesomeIcon className="h-4 w-4" icon={faPalette} />
          <div>Themes</div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
