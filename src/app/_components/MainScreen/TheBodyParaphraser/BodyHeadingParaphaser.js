"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { ModelStateContext } from "@/app/Context/ModelStateContext";
import { LISTSTYLES, MODELTYPE, SUBSCRIBTION } from "@/app/const";
import { CurrentSubscribtionContext } from "@/app/Context/CurrentSubscribtionContext";
import Swal from "sweetalert2";

export default function BodyHeadingParaphraser() {
  const {
    activeStyleIndex,
    setActiveStyleIndex,
    selectedOption,
    setSelectedOption,
  } = useContext(ModelStateContext);

  const { subscribtion } = useContext(CurrentSubscribtionContext);

  const [linePosition, setLinePosition] = useState(0);
  const [lineWidth, setLineWidth] = useState(0);
  const lineRef = useRef([]);

  const handleChangeModal = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextStyleClick = (index) => {
    if (index >= 2) setSelectedOption(MODELTYPE.MISTRAL);
    if (subscribtion === SUBSCRIBTION.PREMIUM) setActiveStyleIndex(index);
    if (subscribtion === SUBSCRIBTION.FREE && index < 2)
      setActiveStyleIndex(index);
    else {
      Swal.fire({
        title: "Only available for premium users!",
        icon: "warning",
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    const activeButton = lineRef.current.childNodes[activeStyleIndex];
    if (activeButton) {
      const buttonRect = activeButton.getBoundingClientRect();
      const containerRect = lineRef.current.getBoundingClientRect();
      setLinePosition(buttonRect.left - containerRect.left);
      setLineWidth(buttonRect.width);
    }
  }, [activeStyleIndex]);

  return (
    <div className="text-black dark:text-white">
      <div className="hidden md:flex lg:flex xl:flex 2xl:flex items-center text-[15px] font-light">
        <button
          className="py-2 px-4 h-10 rounded-tl-[15px] rounded-tr-[15px] 
            bg-white dark:bg-neutral-900 flex items-center justify-center"
        >
          English (US)
        </button>
      </div>
      <div
        className="flex px-7 h-[43px] w-full items-center 
        justify-center md:justify-center lg:justify-between xl:justify-between 2xl:justify-between
         bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden
        rounded-tl-[16px] md:rounded-tl-[0px] lg:rounded-tl-[0px] xl:rounded-tl-[0px] 2xl:rounded-tl-[0px]"
      >
        <div className="flex h-full items-center">
          <h3
            className="text-[15px] font-medium mr-6
          hidden md:block lg:block xl:block 2xl:block"
          >
            Styles:
          </h3>
          <div className="flex h-full relative" ref={lineRef}>
            {LISTSTYLES.map((item, index) => (
              <button
                key={index}
                className="mx-4 h-full mr-2 text-[15px] font-light relative"
                onClick={() => handleTextStyleClick(index)}
              >
                {item}
              </button>
            ))}
            <div
              className="absolute bottom-0 h-[3px] bg-green-600 rounded-sm transition-all"
              style={{
                width: `${lineWidth}px`,
                transform: `translateX(${linePosition}px)`,
                transition: "transform 0.5s ease",
              }}
            ></div>
          </div>
        </div>
        {(activeStyleIndex == 0 || activeStyleIndex == 1) && (
          <div className="hidden md:hidden lg:flex xl:flex 2xl:flex items-center">
            <h3 className="text-[15px] font-medium">Model:</h3>
            <select
              className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block 
            dark:text-white w-full p-2 dark:bg-neutral-800 dark:border-gray-600 outline-none"
              value={selectedOption}
              onChange={handleChangeModal}
            >
              <option value="option1">{MODELTYPE.T5}</option>
              <option value="option2">{MODELTYPE.MISTRAL}</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
