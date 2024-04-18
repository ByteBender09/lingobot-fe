"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faDownload,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import {
  createDocx,
  countWordsOutput,
  saveToClipboard,
} from "@/app/utils/handleText";

import { useKeyDown } from "@/app/(pages)/hooks/useKeyDown";
import { useState } from "react";

export const BodyMiddleTools = ({
  decreaseIndexActiveSentence,
  increaseIndexActiveSentence,
  activeIndex,
  output,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  useKeyDown((e) => {
    if (e.altKey && e.key === "c") {
      handleSaveToClipboard();
    }
  }, []);

  //Handle save output to clipboard
  const handleSaveToClipboard = () => {
    setIsCopied(true);
    const textToCopy = output
      .map((arr) => {
        return arr
          .map((item) => {
            return item.text;
          })
          .join(" ");
      })
      .join("\n");
    saveToClipboard(textToCopy);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const exportToDocx = () => {
    const textToCopy = output
      .map((arr) => {
        return arr
          .map((item) => {
            return item.text;
          })
          .join(" ");
      })
      .join(" ");
    createDocx(textToCopy);
  };

  return (
    <div
      className="hidden md:flex lg:flex xl:flex 2xl:flex 
  items-center justify-between text-black dark:text-white"
    >
      <div className="flex items-center">
        <button
          className="w-10 h-[35px] hidden md:hidden lg:hidden xl:flex 2xl:flex items-center justify-center
       bg-zinc-100 dark:bg-neutral-800 rounded mr-[5px] hover:bg-zinc-300 dark:hover:bg-neutral-700"
          onClick={decreaseIndexActiveSentence}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <button
          className="w-10 h-[35px] hidden md:hidden lg:hidden xl:flex 2xl:flex items-center
       justify-center bg-zinc-100 dark:bg-neutral-800 rounded mr-5 hover:bg-zinc-300 dark:hover:bg-neutral-700"
          onClick={increaseIndexActiveSentence}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        <div className="flex">
          <span className="hidden md:hidden lg:hidden xl:inline-block 2xl:inline-block">
            {output.length != 0 ? activeIndex + 1 : activeIndex}/{output.length}{" "}
            Sentences •
          </span>
          <span>&nbsp;{countWordsOutput(output)} Words</span>
        </div>
      </div>
      <div className="flex items-center">
        <button onClick={() => exportToDocx(output)}>
          <FontAwesomeIcon icon={faDownload} size="xl" />
        </button>
        <button className="ml-3" onClick={handleSaveToClipboard}>
          <FontAwesomeIcon
            icon={faCopy}
            size="xl"
            className={`${
              isCopied ? "text-green-500" : "text-black dark:text-white"
            }`}
          />
        </button>
      </div>
    </div>
  );
};
