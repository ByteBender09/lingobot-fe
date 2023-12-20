"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

const languages = [
  { name: "English (US)", active: true },
  { name: "French", active: false },
  { name: "Spanish", active: false },
  { name: "German", active: false },
];

const listModels = [
  {
    title: "Standard",
    active: true,
  },
  {
    title: "Fluency",
    active: false,
  },
  {
    title: "Formal",
    active: false,
  },
  {
    title: "Academic",
    active: false,
  },
  {
    title: "Simple",
    active: false,
  },
  {
    title: "Creative",
    active: false,
  },
];

export default function BodyHeading() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [linePosition, setLinePosition] = useState(0);
  const [lineWidth, setLineWidth] = useState(0);
  const lineRef = useRef([]);

  const [sliderValue, setSliderValue] = useState(30);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const handleModelClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const activeButton = lineRef.current.childNodes[activeIndex];
    if (activeButton) {
      const buttonRect = activeButton.getBoundingClientRect();
      const containerRect = lineRef.current.getBoundingClientRect();
      setLinePosition(buttonRect.left - containerRect.left);
      setLineWidth(buttonRect.width);
    }
  }, [activeIndex]);

  return (
    <div className="text-black dark:text-white">
      <div className="flex items-center text-[15px] font-light">
        {languages.map((lang, index) => (
          <button
            key={index}
            className={`py-2 px-4 h-10 rounded-tl-[15px] rounded-tr-[15px] 
            ${lang.active ? "bg-white dark:bg-neutral-900" : ""} 
            flex items-center justify-center`}
          >
            {lang.name}
          </button>
        ))}
        <button className="py-2 px-4 h-10 rounded-tl-[15px] rounded-tr-[15px] flex items-center justify-between">
          All <FontAwesomeIcon icon={faAngleDown} className="h-1/2 ml-3" />
        </button>
      </div>
      <div className="flex px-7 h-[43px] w-full items-center justify-between bg-white dark:bg-neutral-900 rounded-2xl rounded-tl-[0px] overflow-hidden">
        <div className="flex h-full items-center">
          <h3 className="text-[15px] font-medium mr-6">Models:</h3>
          <div className="flex h-full relative overflow-x-auto" ref={lineRef}>
            {listModels.map((item, index) => (
              <button
                key={index}
                className="mx-4 h-full mr-2 text-[15px] font-light relative"
                onClick={() => handleModelClick(index)}
              >
                {item.title}
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
        <div className="flex">
          <h3 className="text-[15px] font-medium">Synonyms:</h3>
          <input
            type="range"
            min="0"
            max="90"
            step={30}
            value={sliderValue}
            onChange={handleSliderChange}
            className="ml-2 range-slider"
          />
        </div>
      </div>
    </div>
  );
}
