"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKeyboard,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import authRepository from "@/app/utils/auth";
import ModalSettings from "../ModalSettings";

export default function BodyFootingParaphraser() {
  const [isOpen, setIsOpen] = useState(false);
  const [phaseSetting, setPhaseSetting] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleOpenModal = (phaseState) => {
    setPhaseSetting(phaseState);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const accessToken = authRepository.getAccessToken();

    if (accessToken != undefined) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="hidden md:flex lg:flex xl:flex 2xl:flex
     justify-between items-end mt-5"
    >
      <div
        className="px-4 py-3 hidden md:flex lg:flex xl:flex 2xl:flex items-center 
      bg-cyan-100 dark:bg-gray-200 rounded-[14px] text-black "
      >
        <button>
          <FontAwesomeIcon
            icon={faKeyboard}
            onClick={() => handleOpenModal(0)}
          />
        </button>
        {isAuthenticated && (
          <button className="ml-4">
            <FontAwesomeIcon
              icon={faClockRotateLeft}
              onClick={() => handleOpenModal(1)}
            />
          </button>
        )}
      </div>
      <div className="flex px-5 py-3 self-end bg-white dark:bg-neutral-900 rounded-[14px] text-black dark:text-white text-[14px] font-normal">
        <div className="flex items-center mr-5">
          <div className="w-2.5 h-0.5 bg-blue-300 dark:bg-neutral-400 mr-[10px]" />
          <span>Selected Sentences</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 bg-blue-700 dark:bg-blue-400 rounded-full mr-[10px]" />
          <span>Selected Words</span>
        </div>
      </div>
      {isOpen && (
        <ModalSettings
          isAuthenticated={isAuthenticated}
          closeModal={handleCloseModal}
          phaseSettings={phaseSetting}
        />
      )}
    </div>
  );
}
