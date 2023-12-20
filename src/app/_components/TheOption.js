"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faSpellCheck,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";

export default function TheOption() {
  const [activeIndex, setActiveIndex] = useState(0); // Initial active index

  const options = [
    { name: "Paraphraser", icon: faBarsStaggered },
    { name: "Grammar Checker", icon: faSpellCheck },
    { name: "Summarizer", icon: faRectangleList },
  ];

  const handleButtonClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex-[1] mr-8 pt-7 text-black dark:text-white text-[15px] font-light">
      {options.map((option, index) => (
        <button
          key={index}
          className={`rounded-tr-[15px] rounded-br-[15px] flex items-center justify-start p-3 h-12 w-full mb-[6px] ${
            index === activeIndex ? "bg-amber-300 dark:bg-neutral-800" : ""
          }`}
          onClick={() => handleButtonClick(index)}
        >
          <FontAwesomeIcon icon={option.icon} className="h-2/3 mr-4" />
          <span>{option.name}</span>
        </button>
      ))}
    </div>
  );
}
