"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faTrash,
  faCopy,
  faDownload,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { countWords } from "@/app/utils/handleText";

export default function BodyMiddleParaphraser() {
  const [content, setContent] = useState("");

  //Handle clear user input
  const clearInput = () => {
    setContent("");
  };

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div
      className="flex
    flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row
     flex-[1] justify-between items-start mt-5"
    >
      <div
        className="flex flex-col h-full w-full flex-[1] 
      mr-0 md:mr-0 lg:mr-[0.5%] xl:mr-[0.5%] 2xl:mr-[0.5%]
      mb-2 md:mb-2 lg:mb-0 xl:mb-0 2xl:mb-0   
      text-sm font-light bg-white dark:bg-neutral-900 px-4 pt-[18px] pb-4 rounded-[17px]"
      >
        <textarea
          className="w-full flex-[1] pr-1 bg-transparent text-black dark:text-white leading-[30px] outline-none mb-2"
          value={content}
          onChange={handleInputChange}
        />
        <div className="flex items-center justify-between text-black dark:text-white">
          <div className="flex items-center ">
            <span className="text-[15px] font-light mr-3">
              {countWords(content)} Words
            </span>
            <button className="mr-3 hidden md:hidden lg:hidden xl:inline-block 2xl:inline-block">
              <FontAwesomeIcon icon={faSnowflake} size="xl" color="#666666" />
            </button>
            <button
              className="hidden md:hidden lg:hidden xl:inline-block 2xl:inline-block"
              onClick={clearInput}
            >
              <FontAwesomeIcon icon={faTrash} size="xl" color="#666666" />
            </button>
          </div>
          <button className="py-[10px] px-9 dark:bg-green-600 bg-amber-300 rounded-[18px] text-[15px] font-medium hover:bg-amber-400 dark:hover:bg-green-700 transition duration-200 ease-in-out">
            Rephrase
          </button>
        </div>
      </div>
      <div
        className="flex flex-col h-full w-full text-sm font-light flex-[1]
       ml-0 md:ml-0 lg:ml-[0.5%] xl:ml-[0.5%] 2xl:ml-[0.5%]
        bg-white dark:bg-neutral-900 px-4 py-[18px] rounded-[17px]"
      >
        <textarea className="w-full flex-[1] pr-1 bg-transparent text-black dark:text-white leading-[30px] outline-none mb-2" />
        <div
          className="hidden md:flex lg:flex xl:flex 2xl:flex 
        items-center justify-between text-black dark:text-white"
        >
          <div className="flex items-center">
            <button className="w-10 h-[35px] hidden md:hidden lg:hidden xl:flex 2xl:flex items-center justify-center bg-zinc-100 dark:bg-neutral-800 rounded mr-[5px] hover:bg-zinc-300 dark:hover:bg-neutral-700">
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
            <button className="w-10 h-[35px] hidden md:hidden lg:hidden xl:flex 2xl:flex items-center justify-center bg-zinc-100 dark:bg-neutral-800 rounded mr-5 hover:bg-zinc-300 dark:hover:bg-neutral-700">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className="flex">
              <span className="hidden md:hidden lg:hidden xl:inline-block 2xl:inline-block">
                1/3 Sentences •
              </span>
              <span>&nbsp;53 Words</span>
            </div>
          </div>
          <div className="flex items-center">
            <button>
              <FontAwesomeIcon icon={faDownload} size="xl" />
            </button>
            <button className="ml-3">
              <FontAwesomeIcon icon={faCopy} size="xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
