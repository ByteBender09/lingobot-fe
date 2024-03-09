"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faChartSimple,
  faKeyboard,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ModalSettings from "../ModalSettings";

export default function BodyFootingParaphraser() {
  const [isOpen, setIsOpen] = useState(false);
  const [phaseSetting, setPhaseSetting] = useState(0);

  const handleOpenModal = (phaseState) => {
    setPhaseSetting(phaseState);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div
      className="hidden md:hidden lg:flex xl:flex 2xl:flex
     justify-between items-end mt-5"
    >
      <div className="px-4 py-3 hidden md:hidden lg:hidden xl:flex 2xl:flex items-center bg-cyan-100 dark:bg-gray-200 rounded-[14px] text-black ">
        <button className="mr-4">
          <FontAwesomeIcon icon={faGear} />
        </button>
        <button className="mr-4">
          <FontAwesomeIcon icon={faChartSimple} />
        </button>
        <button className="mr-4">
          <FontAwesomeIcon
            icon={faKeyboard}
            onClick={() => handleOpenModal(0)}
          />
        </button>
        <button>
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            onClick={() => handleOpenModal(1)}
          />
        </button>
      </div>
      <div className="flex px-5 py-3 self-end bg-white dark:bg-neutral-900 rounded-[14px] text-black dark:text-white text-[14px] font-normal">
        <div className="flex items-center mr-5">
          <div className="w-2.5 h-2.5 bg-amber-600 rounded-full mr-[10px]" />
          <span>Changed Words</span>
        </div>
        <div className="flex items-center mr-5">
          <div className="w-2.5 h-0.5 bg-amber-300 mr-[10px]" />
          <span>Structural Changes</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 bg-sky-700 rounded-full mr-[10px]" />
          <span>Longest Unchanged Words</span>
        </div>
      </div>
      {isOpen && (
        <ModalSettings
          closeModal={handleCloseModal}
          phaseSettings={phaseSetting}
        />
      )}
    </div>
  );
}
