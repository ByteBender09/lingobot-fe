"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { getParagraphsFromDocFile } from "@/app/utils/handleText";

export default function BodyMiddleSummarizer() {
  const [paragraphs, setParagraphs] = useState("");
  const fileInputRef = useRef(null);

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (event) => {
    setParagraphs(event.target.value);
  };

  const onFileUpload = (event) => {
    const reader = new FileReader();
    let file = event.target.files[0];

    reader.onload = (e) => {
      const content = e.target.result;
      const paragraphs = getParagraphsFromDocFile(content);
      setParagraphs(paragraphs);
    };

    reader.onerror = (err) => console.error(err);

    reader.readAsBinaryString(file);
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
       text-base font-light bg-white dark:bg-neutral-900 px-4 pt-[18px] pb-4 rounded-[17px]"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx"
          style={{ display: "none" }}
          onChange={onFileUpload}
        />
        <textarea
          className="w-full flex-[1] pr-1 bg-transparent text-black dark:text-white leading-[30px] outline-none mb-2"
          value={paragraphs}
          onChange={handleInputChange}
          placeholder="Enter or paste your text and press 'Summarize'"
        />
        <div
          className="flex items-center 
        justify-center md:justify-center lg:justify-between xl:justify-between 2xl:justify-between
         text-black dark:text-white"
        >
          <div className="flex items-center ">
            <button
              className="hidden md:hidden lg:flex xl:flex 2xl:flex"
              onClick={handleUpload}
            >
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                size="xl"
                className="mr-3"
              />
              <span className="text-[15px] font-light">Upload Doc</span>
            </button>
          </div>
          <button className="py-[10px] px-9 dark:bg-green-600 bg-amber-300 rounded-[18px] text-[15px] font-medium hover:bg-amber-400 dark:hover:bg-green-700 transition duration-200 ease-in-out">
            Summarize
          </button>
        </div>
      </div>
      <div
        className="flex flex-col h-full w-full text-sm font-light flex-[1] 
      ml-0 md:ml-0 lg:ml-[0.5%] xl:ml-[0.5%] 2xl:ml-[0.5%]
      bg-white dark:bg-neutral-900 px-4 py-[18px] rounded-[17px]"
      >
        <textarea className="w-full flex-[1] pr-1 bg-transparent text-black dark:text-white leading-[30px] outline-none mb-2" />
        <div className="flex items-center justify-between text-black dark:text-white">
          <span>0 Sentences • 0 Words</span>
        </div>
      </div>
    </div>
  );
}
