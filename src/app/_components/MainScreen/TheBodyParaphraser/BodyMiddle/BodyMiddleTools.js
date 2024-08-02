"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faDownload,
  faChevronUp,
  faChevronDown,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

import {
  createDocx,
  countWordsOutput,
  saveToClipboard,
} from "@/app/utils/handleText";

import LoadingSpinner from "@/app/_components/Others/spinner";
import { onAudioStatusChange } from "@/app/utils/eventeventEmitter";

import { handleTextToSpeech } from "@/app/utils/playAudio";
import { useKeyDown } from "@/app/_hooks/useKeyDown";
import { useState } from "react";

export const BodyMiddleTools = ({
  decreaseIndexActiveSentence,
  increaseIndexActiveSentence,
  activeIndex,
  output,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isPlayingSound, setPlayingSound] = useState(false);

  onAudioStatusChange((status) => {
    setPlayingSound(status);
  });

  useKeyDown((e) => {
    if (e.altKey && e.key === "c") {
      handleSaveToClipboard();
    }
  }, []);

  //Handle save output to clipboard
  const handleSaveToClipboard = () => {
    setIsCopied(true);
    var textToCopy = "";

    if (Array.isArray(output) && Array.isArray(output[0])) {
      textToCopy = output
        .map((arr) => {
          return arr
            .map((item) => {
              return item.text;
            })
            .join(" ");
        })
        .join("\n");
    } else {
      textToCopy = output.join(" ");
    }

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

  const textToSpeech = () => {
    const textToCopy = output
      .map((arr) => {
        return arr
          .map((item) => {
            return item.text;
          })
          .join(" ");
      })
      .join(" ");

    handleTextToSpeech(textToCopy);
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
        {isPlayingSound ? (
          <LoadingSpinner />
        ) : (
          <button onClick={() => textToSpeech(output)}>
            <FontAwesomeIcon
              className="hover:text-green-500"
              icon={faVolumeHigh}
              size="xl"
            />
          </button>
        )}
        <button className="ml-3" onClick={() => exportToDocx(output)}>
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
