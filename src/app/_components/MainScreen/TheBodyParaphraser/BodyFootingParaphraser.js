"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKeyboard,
  faClockRotateLeft,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import authRepository from "@/app/utils/auth";
import { formatScientific } from "@/app/utils/handleFloat";
import ModalSettings from "../ModalSettings";
import { ScoreContext } from "@/app/Context/ScoreContext";

export default function BodyFootingParaphraser() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phaseSetting, setPhaseSetting] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { score, loadingScore } = useContext(ScoreContext);

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
      <div className="flex">
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
        {!loadingScore && (
          <div
            className="px-4 py-3 hidden md:flex lg:flex xl:flex 2xl:flex items-center 
      bg-cyan-100 dark:bg-gray-200 rounded-[14px] text-black dark:text-white ml-3 text-sm relative"
          >
            <div className="flex">
              <span className="mr-[10px] text-black font-medium">
                Blue score:
              </span>
              <span className="text-black font-normal">
                {score?.bleu_score ? formatScientific(score?.bleu_score, 2) : 0}
              </span>
            </div>
            <div className="flex ml-6">
              <span className="mr-[10px] text-black font-medium">WPD:</span>
              <span className="text-black font-normal">
                {score?.wpd ? score?.wpd.toFixed(3) : 0}
              </span>
            </div>
            <div className="flex ml-6">
              <span className="mr-[10px] text-black font-medium">LD:</span>
              <span className="text-black font-normal">
                {score?.ld ? score?.ld.toFixed(3) : 0}
              </span>
            </div>
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="ml-7 size-[20px] cursor-pointer"
              color="#58595E"
              onMouseEnter={() => setIsModalVisible(true)}
              onMouseLeave={() => setIsModalVisible(false)}
            />

            {isModalVisible && (
              <div
                className="flex absolute w-full top-[-150px] left-0 bg-white p-5 text-xs
        h-max items-start justify-center flex-col gap-3 rounded-[15px] shadow border border-stone-300"
              >
                <h4 className="font-medium self-center">Range Value: 0 - 1</h4>
                <div className="flex">
                  <h4 className="mr-3 font-medium">Blue score:</h4>
                  <span className="font-light">
                    the proportion of similar words between 2 sentences
                  </span>
                </div>
                <div className="flex">
                  <h4 className="mr-3 font-medium">
                    WPD (Word Position Deviation):
                  </h4>
                  <span className="font-light">word position change rate</span>
                </div>
                <div className="flex">
                  <h4 className="mr-3 font-medium">LD (Lexical Deviation):</h4>
                  <span className="font-light">synonym usage rate</span>
                </div>
              </div>
            )}
          </div>
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
