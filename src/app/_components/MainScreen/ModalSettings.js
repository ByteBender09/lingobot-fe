"use client";

import {
  faClockRotateLeft,
  faClose,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const hotkeyTitles = [
  {
    title: "Copy output",
    action: "Alt + C",
  },
  {
    title: "Paraphrase all text",
    action: "Ctrl + Enter",
  },
];

const queryHistories = [
  {
    date: "Aug 03",
    time: "02:49 pm",
    input: "They were there to enjoy us and they were there to pray for us.",
  },
  {
    date: "Aug 09",
    time: "04:49 pm",
    input: "They were there to enjoy us and they were there to pray for us.",
  },
];

export default function ModalSettings({ closeModal, phaseSettings }) {
  const [phaseState, setPhaseState] = useState(phaseSettings);
  return (
    <div
      className="fixed inset-0 z-[1000] bg-black bg-opacity-70 
    flex flex-col items-end justify-start"
    >
      <div className="bg-white dark:bg-neutral-800 h-full">
        <div
          className="flex justify-between items-center py-4 
        border-b border-black dark:border-white px-6"
        >
          <div className="flex">
            <FontAwesomeIcon
              icon={faKeyboard}
              className={`mr-9 cursor-pointer ${
                phaseState == 0
                  ? "text-green-600 dark:text-green-600"
                  : "text-black dark:text-white"
              } `}
              onClick={() => setPhaseState(0)}
            />
            <FontAwesomeIcon
              icon={faClockRotateLeft}
              className={`cursor-pointer ${
                phaseState == 1
                  ? "text-green-600 dark:text-green-600"
                  : "text-black dark:text-white"
              } `}
              onClick={() => setPhaseState(1)}
            />
          </div>
          <FontAwesomeIcon
            icon={faClose}
            onClick={closeModal}
            className="cursor-pointer dark:text-white"
          />
        </div>
        {phaseState == 0 ? <HotKeysPattern /> : <QueryHistoryPattern />}
      </div>
    </div>
  );
}

const QueryHistoryPattern = () => {
  return (
    <div className="w-full">
      <div
        className="text-black dark:text-white p-4 text-base font-semibold
      border-b border-black dark:border-white"
      >
        History
      </div>
      <div
        className="text-black dark:text-white p-4 text-[12px] font-normal
      border-b border-black dark:border-white"
      >
        Last text paraphrased
      </div>
      <div className="flex flex-col">
        {queryHistories.map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-4 border-b border-black dark:border-white cursor-pointer"
          >
            <div>
              <span className="text-[11px] font-normal mr-2 text-black dark:text-white">
                {item.date},
              </span>
              <span className="text-zinc-500 text-[11px] font-normal">
                {item.time}
              </span>
            </div>
            <span className="text-[10px] font-normal text-black dark:text-white">
              {item.input}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const HotKeysPattern = () => {
  return (
    <div className="px-4 mt-6 w-full">
      <span className="text-black dark:text-white text-base font-semibold">
        Hotkeys
      </span>
      <div className="flex mt-4">
        <div className="mr-4">
          <div
            className="text-black dark:text-white text-base font-medium py-4
            border-b border-black dark:border-white"
          >
            Action
          </div>
          {hotkeyTitles.map((item, index) => (
            <div
              key={index}
              className="text-black dark:text-white text-sm font-medium py-4
                border-b border-black dark:border-white"
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className="ml-4">
          <div
            className="text-black dark:text-white text-base font-medium py-4
            border-b border-black dark:border-white"
          >
            PC Hotkey
          </div>
          {hotkeyTitles.map((item, index) => (
            <div
              key={index}
              className="text-black dark:text-white text-sm font-medium py-4
                border-b border-black dark:border-white"
            >
              {item.action}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
