import React, { FC, Fragment, useState } from "react";
import { faPalette, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";

import {
  setUserThemesColors,
  ThemeColors,
} from "../../store/slices/settings/settings.slice";
import {
  selectThemesColors,
  selectUserThemesColors,
} from "../../store/slices/settings/settings.selector";

Modal.setAppElement("#root");

const ThemeSettings: FC = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const userThemeColors = useSelector(selectUserThemesColors);
  const themesColors = useSelector(selectThemesColors);

  const handleColorChange = (selectedColor: ThemeColors): void => {
    dispatch(setUserThemesColors({ mode, ...selectedColor }));
    setModalIsOpen(false);
  };

  const renderColorOption = (
    label: string,
    color: ThemeColors,
    onClick: () => void
  ): JSX.Element => (
    <div className="flex items-center justify-between">
      <div>{label.charAt(0).toUpperCase() + label.slice(1)}</div>
      <div
        className={`h-10 w-10 ${color.background} rounded-md hover:scale-105 duration-300 shadow-lg`}
        onClick={onClick}
      ></div>
    </div>
  );

  const closeModal = (): void => setModalIsOpen(false);

  const openModal = (mode: string): void => {
    setMode(mode);
    setModalIsOpen(true);
  };

  return (
    <div className="p-3 flex flex-col items-center justify-center">
      <div className="bg-white/10 p-3 rounded-lg space-y-3 w-60">
        <div className="flex space-x-1 items-center">
          <FontAwesomeIcon className="h-4 w-4" icon={faPalette} />
          <div>Color themes</div>
        </div>
        {Object.entries(userThemeColors).map(
          ([mode, color]) =>
            mode !== "initial" && (
              <Fragment key={mode}>
                {renderColorOption(mode, color, () => openModal(mode))}
              </Fragment>
            )
        )}
      </div>
      <Modal
        className="relative w-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <FontAwesomeIcon
          onClick={closeModal}
          className="h-4 w-4 cursor-pointer absolute right-2 top-2"
          icon={faTimes}
        />

        <div className="h-full bg-pink-50 py-5 px-10 space-y-4 rounded-xl shadow-2xl">
          <div>Choose a new color</div>
          <div className="flex flex-wrap gap-1">
            {Object.entries(themesColors).map(([mode, color]) => (
              <Fragment key={mode}>
                <div
                  className={`h-12 w-12 ${color.background} rounded-md hover:scale-105 duration-300 shadow-lg`}
                  onClick={() => handleColorChange(color)}
                ></div>
              </Fragment>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ThemeSettings;
