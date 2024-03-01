"use client";

import { useState, useRef, useEffect } from "react";

const listModels = [
  {
    title: "Paragraph",
    active: true,
  },
  {
    title: "Bullet Points",
    active: false,
  },
];

export default function BodyHeadingSummarizer() {
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
      <div
        className="flex px-7 h-[43px] w-full items-center 
      justify-center md:justify-center lg:justify-between xl:justify-between 2xl:justify-between
       bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden"
      >
        <div className="flex h-full items-center justify-center">
          <h3
            className="text-[15px] font-medium mr-6
          hidden md:block lg:block xl:block 2xl:block"
          >
            Models:
          </h3>
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
        {activeIndex == 0 && (
          <div className="hidden md:hidden lg:flex xl:flex 2xl:flex">
            <h3 className="text-[15px] font-medium mr-5">Summary Length:</h3>
            <h4 className="text-[15px] font-normal">Short</h4>
            <input
              type="range"
              min="0"
              max="90"
              step={30}
              value={sliderValue}
              onChange={handleSliderChange}
              className="mx-2 range-slider"
            />
            <h4 className="text-[15px] font-normal">Length</h4>
          </div>
        )}
      </div>
    </div>
  );
}
