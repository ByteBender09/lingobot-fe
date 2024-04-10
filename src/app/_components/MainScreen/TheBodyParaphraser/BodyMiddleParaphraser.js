"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faTrash,
  faCopy,
  faDownload,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  countWordsFromDocFile,
  getParagraphsFromDocFile,
  saveToClipboard,
  createDocx,
} from "@/app/utils/handleText";
import {
  handleParaphraseInput,
  handleGetSimilarMeanings,
} from "@/app/utils/paraphrasing";
import { useState, useRef, useEffect } from "react";
import LoadingSpinner from "../../Others/spinner";

export default function BodyMiddleParaphraser() {
  const [content, setContent] = useState("");
  const [input, setInput] = useState([]);
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [processedSentences, setProcessedSentences] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [showRephraseOptions, setShowRephraseOptions] = useState(0);
  const fileInputRef = useRef(null);
  const timeoutRef = useRef(null);

  //Handle split into smaller sentence to request
  const handleAnalysisInput = () => {
    var sentences = content.split(/[\.\?\!]+/);
    sentences = sentences.filter((sentence) => sentence.trim() !== "");

    setInput(sentences);
  };

  //Handle show rephrase button
  const handleOpenRephraseButton = (sentence) => {
    setActiveIndex(sentence);
    setShowRephraseOptions(1);

    timeoutRef.current = setTimeout(() => {
      setShowRephraseOptions(0);
    }, 3000);
  };

  //Handle show list similar meaning of a sentence
  const handleRephraseClick = (e) => {
    e.stopPropagation();
    clearTimeout(timeoutRef.current);
    setShowRephraseOptions(2);
  };

  //Handle replace sentence
  const handleReplaceWord = (replacement) => {
    clearTimeout(timeoutRef.current);
    updateOutput(activeIndex, replacement);
    setActiveIndex(null);
    setShowRephraseOptions(0);
  };

  //Handle save output to clipboard
  const handleSaveToClipboard = () => {
    setIsCopied(true);
    saveToClipboard(output);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  //Upload text from a docx fiile
  const onFileUpload = (event) => {
    const reader = new FileReader();
    let file = event.target.files[0];

    reader.onload = (e) => {
      const content = e.target.result;
      const paragraphs = getParagraphsFromDocFile(content);
      setContent(paragraphs);
    };

    reader.onerror = (err) => console.error(err);

    reader.readAsBinaryString(file);
  };

  //Udate the output state
  const updateOutput = (index, paraphrase) => {
    setOutput((prevOutput) => {
      const updatedOutput = [...prevOutput];
      updatedOutput[index] = paraphrase;
      return updatedOutput;
    });
  };

  //Handle increase/ decrease active sentence index
  const increaseIndexActiveSentence = () => {
    if (activeIndex < output.length) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else setActiveIndex(output.length - 1);
    setShowRephraseOptions(1);

    timeoutRef.current = setTimeout(() => {
      setShowRephraseOptions(0);
    }, 3000);
  };

  const decreaseIndexActiveSentence = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    } else setActiveIndex(0);
    setShowRephraseOptions(1);

    timeoutRef.current = setTimeout(() => {
      setShowRephraseOptions(0);
    }, 3000);
  };

  useEffect(() => {
    if (input.length === 0) return;

    setOutput(input);
    setIsLoading(true);

    // Create an array of promises for each API call
    const promises = input.map((sentence, index) => {
      if (sentence.trim() === "") return;

      // Check if the sentence has been processed before
      if (processedSentences.hasOwnProperty(sentence)) {
        const randomIndex = Math.floor(
          Math.random() * processedSentences[sentence].length
        );
        updateOutput(index, processedSentences[sentence][randomIndex]);
      } else {
        // If not, make an API call
        return handleParaphraseInput(sentence).then((result) => {
          setProcessedSentences((prevProcessedSentences) => ({
            ...prevProcessedSentences,
            [sentence]: result,
          }));
          updateOutput(index, result[0]);

          // Get Similar letters from output
          // const delay = (ms) =>
          //   new Promise((resolve) => setTimeout(resolve, ms));

          // result.forEach(async (sentence, index) => {
          //   try {
          //     await fetchSimilarPhrases(sentence);
          //   } catch (error) {
          //     if (error.response && error.response.status === 429) {
          //       const retryAfter = error.response.headers["retry-after"];
          //       console.log(
          //         `Rate limit exceeded. Retrying after ${retryAfter} seconds.`
          //       );
          //       await delay(retryAfter * 1000);
          //       // Retry the same sentence
          //       await fetchSimilarPhrases(sentence);
          //     } else {
          //       console.error("Error calling OpenAI API:", error);
          //     }
          //   }
          // });
        });
      }
    });

    // Wait for all API calls to complete
    Promise.all(promises)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

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
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx"
          style={{ display: "none" }}
          onChange={onFileUpload}
        />
        <textarea
          className="w-full flex-[1] pr-1 bg-transparent text-black dark:text-white leading-[30px] outline-none mb-2 font-medium"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center justify-between text-black dark:text-white">
          <div className="flex items-center ">
            <span className="text-[15px] font-light mr-3">
              {countWordsFromDocFile(content)} Words
            </span>
            <button
              className="mr-3 hidden md:hidden lg:hidden xl:inline-block 2xl:inline-block"
              onClick={() => {
                fileInputRef.current.click();
              }}
            >
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                size="xl"
                color="#666666"
              />
            </button>
            <button
              className="hidden md:hidden lg:hidden xl:inline-block 2xl:inline-block"
              onClick={() => setContent("")}
            >
              <FontAwesomeIcon icon={faTrash} size="xl" color="#666666" />
            </button>
          </div>
          <button
            className="py-[10px] px-9 dark:bg-green-600 bg-amber-300 rounded-[18px] text-[15px] font-medium
           hover:bg-amber-400 dark:hover:bg-green-700 transition duration-200 ease-in-out"
            onClick={handleAnalysisInput}
          >
            {isLoading ? <LoadingSpinner size="small" /> : "Rephrase"}
          </button>
        </div>
      </div>
      <div
        className="flex flex-col h-full w-full text-sm font-light flex-[1]
       ml-0 md:ml-0 lg:ml-[0.5%] xl:ml-[0.5%] 2xl:ml-[0.5%]
        bg-white dark:bg-neutral-900 px-4 py-[18px] rounded-[17px]"
      >
        <div className="w-full flex-[1] pr-1 bg-transparent text-black dark:text-white leading-[30px] outline-none mb-2 font-medium">
          {output.map((sentence, indexSentence) => {
            return (
              <span
                key={indexSentence}
                className={
                  sentence === input[indexSentence]
                    ? "text-gray-400"
                    : indexSentence === activeIndex
                    ? "text-black dark:text-white bg-blue-50 hover:bg-blue-50 dark:hover:bg-neutral-800 cursor-pointer relative"
                    : "text-black dark:text-white hover:bg-blue-50 dark:hover:bg-neutral-800 cursor-pointer relative"
                }
                onClick={() => handleOpenRephraseButton(indexSentence)}
              >
                {sentence
                  .trim()
                  .split(" ")
                  .map((word, wordIndex) => {
                    return (
                      <span
                        key={wordIndex}
                        className="hover:text-blue-700 dark:hover:text-blue-400"
                      >
                        {word}{" "}
                      </span>
                    );
                  })}
                {indexSentence !== output.length - 1 && " "}
                {showRephraseOptions === 1 && activeIndex == indexSentence && (
                  <div
                    className="flex items-center justify-center p-1 bg-white dark:bg-neutral-800
                  absolute top-[-20px] left-0 mt-[-30px] shadow-lg rounded-2xl"
                  >
                    <button
                      className=" border border-blue-500 bg-white dark:bg-neutral-800 text-blue-500 text-[14px] px-6 rounded-2xl"
                      onClick={(e) => handleRephraseClick(e)}
                    >
                      Rephrase
                    </button>
                  </div>
                )}
                {showRephraseOptions === 2 && activeIndex == indexSentence && (
                  <div
                    className="absolute top-[20px] w-max bg-white dark:bg-neutral-800
                   border border-gray-300 dark:border-black p-2 rounded-lg shadow-lg"
                  >
                    <ul>
                      {processedSentences.hasOwnProperty(input[activeIndex]) &&
                        processedSentences[input[activeIndex]].map(
                          (replacement, replacementIndex) => (
                            <li
                              key={replacementIndex}
                              onClick={() => handleReplaceWord(replacement)}
                              className="cursor-pointer hover:bg-gray-200 dark:hover:bg-black p-1 rounded-md px-2"
                            >
                              {replacement}
                            </li>
                          )
                        )}
                    </ul>
                    <button
                      className="mt-2 p-1 w-full bg-gray-200 dark:bg-black hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md"
                      onClick={() => setShowRephraseOptions(0)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </span>
            );
          })}
        </div>
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
                {activeIndex ? activeIndex + 1 : 1}/{output.length} Sentences •
              </span>
              <span>&nbsp;{countWordsFromDocFile(output)} Words</span>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={() => createDocx(output)}>
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
      </div>
    </div>
  );
}
