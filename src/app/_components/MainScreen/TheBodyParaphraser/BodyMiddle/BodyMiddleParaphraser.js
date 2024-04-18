"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  countWordsFromDocFile,
  getParagraphsFromDocFile,
} from "@/app/utils/handleText";
import {
  handleParaphraseInput,
  handleGetSimilarMeanings,
} from "@/app/utils/paraphrasing";
import { useState, useRef, useEffect } from "react";
import LoadingSpinner from "../../../Others/spinner";
import { BodyMiddleTools } from "./BodyMiddleTools";

export default function BodyMiddleParaphraser() {
  const [content, setContent] = useState("");
  const [input, setInput] = useState([]);
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstPromiseComplete, setFirstPromiseComplete] = useState(false);
  const [secondPromiseComplete, setSecondPromiseComplete] = useState(false);
  const [processedSentences, setProcessedSentences] = useState({});
  const [rephrasedSentences, setRephrasedSentences] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState("");
  const [showRephraseOptions, setShowRephraseOptions] = useState(0);
  const [showSimilarWords, setShowSimilarWords] = useState(false);
  const [replaceWords, setRephaceWords] = useState([]);
  const fileInputRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleSimilarWords = (e, word) => {
    e.stopPropagation();
    setSelectedWord(word);
    setShowSimilarWords(true);
  };

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
  const handleReplaceSentence = (replacement) => {
    clearTimeout(timeoutRef.current);
    updateOutput(activeIndex, replacement);
    if (!rephrasedSentences.hasOwnProperty(replacement.trim())) {
      handleGetSimilarMeanings(replacement).then((result) => {
        //Store to reuse
        setRephrasedSentences((prev) => ({
          ...prev,
          [replacement]: result,
        }));
        updateOutput(activeIndex, result);
      });
    } else {
      updateOutput(activeIndex, rephrasedSentences[replacement]);
    }
    setActiveIndex(null);
    setShowRephraseOptions(0);
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
    if (activeIndex < output.length - 1) {
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

  //Get list alternavite words
  const getAlternativeWords = (phrase) => {
    for (const phrases of replaceWords) {
      // console.log(phrases);
      for (const item of phrases) {
        if (item.text === phrase)
          return item.alts.filter((word) => word !== phrase);
      }
    }
    return [];
  };

  //Function to replace a phrase
  const rephrasePhrase = (alternative, phraseIndex, index) => {
    setRephaceWords((prev) => {
      const updatedReplaceWords = [...prev];
      updatedReplaceWords[phraseIndex][index].text = alternative;
      return updatedReplaceWords;
    });
  };

  //Handle when input change => Get Similar meaning sentences
  useEffect(() => {
    if (input.length === 0) return;
    setOutput(input);
    setIsLoading(true);

    let resolvedPromisesCount = 0;

    const promises = input.map((sentence, index) => {
      if (sentence.trim() === "") return;

      if (processedSentences.hasOwnProperty(sentence)) {
        const randomIndex = Math.floor(
          Math.random() * processedSentences[sentence].length
        );
        updateOutput(index, processedSentences[sentence][randomIndex]);
        resolvedPromisesCount++;
      } else {
        return handleParaphraseInput(sentence).then((result) => {
          setProcessedSentences((prevProcessedSentences) => ({
            ...prevProcessedSentences,
            [sentence]: result,
          }));
          updateOutput(index, result[0]);
          resolvedPromisesCount++;
        });
      }
    });

    Promise.all(promises)
      .then(() => {
        setIsLoading(false);
        if (resolvedPromisesCount === input.length) {
          setFirstPromiseComplete(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  //Handle when output change
  useEffect(() => {
    let resolvedPromisesCount = 0;

    if (firstPromiseComplete) {
      console.log("CC");
      const promises = output.map((sentence) => {
        if (typeof sentence == "string") {
          if (!rephrasedSentences.hasOwnProperty(sentence.trim())) {
            return handleGetSimilarMeanings(sentence).then((result) => {
              //Store to reuse
              setRephrasedSentences((prev) => ({
                ...prev,
                [sentence]: result,
              }));
              resolvedPromisesCount++;
              return result;
            });
          } else {
            resolvedPromisesCount++;
            return Promise.resolve(rephrasedSentences[sentence]);
          }
        } else {
          console.log(sentence);
          resolvedPromisesCount++;
          return Promise.resolve(sentence[0]);
        }
      });

      Promise.all(promises)
        .then((results) => {
          // console.log(results);
          if (resolvedPromisesCount === output.length) {
            setSecondPromiseComplete(true);
          }
          setFirstPromiseComplete(false);
          setRephaceWords(results);
        })
        .catch((error) => {
          console.error("Error calling API all sentences:", error);
          setFirstPromiseComplete(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output, input]);

  useEffect(() => {
    if (secondPromiseComplete) {
      const isArrayofArrays = replaceWords.every(Array.isArray);
      if (isArrayofArrays) {
        setOutput(replaceWords);
      }
    }
    // console.log(replaceWords);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replaceWords]);

  useEffect(() => {
    console.log(output);
  }, [output]);

  return (
    <div
      className="flex
    flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row
     flex-[1] justify-between items-start mt-5"
    >
      <div
        className="flex flex-col h-full w-full flex-[1] min-w-0
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
        className="flex flex-col h-full w-full text-sm font-light flex-[1] min-w-0
       ml-0 md:ml-0 lg:ml-[0.5%] xl:ml-[0.5%] 2xl:ml-[0.5%]
        bg-white dark:bg-neutral-900 px-4 py-[18px] rounded-[17px]"
      >
        <div
          className="h-max inline gap-1 flex-[1] pr-1 bg-transparent text-black
         dark:text-white leading-[30px] outline-none mb-2 font-medium text-wrap"
        >
          {output.map((sentence, indexSentence) => {
            return (
              <span
                key={indexSentence}
                className={
                  sentence === input[indexSentence]
                    ? "text-gray-400"
                    : indexSentence === activeIndex
                    ? "text-black h-max dark:text-white bg-blue-50 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-neutral-800 cursor-pointer relative inline gap-1"
                    : "text-black h-max dark:text-white hover:bg-blue-50 dark:hover:bg-neutral-800 cursor-pointer relative inline gap-1"
                }
                onClick={() => handleOpenRephraseButton(indexSentence)}
              >
                {typeof sentence === "string" ? (
                  <span className="hover:text-blue-700 dark:hover:text-blue-400 relative">
                    {sentence}
                  </span>
                ) : (
                  sentence?.map((phrase, phraseIndex) => {
                    return (
                      <span
                        key={phraseIndex}
                        className="hover:text-blue-700 dark:hover:text-blue-400 relative text-wrap"
                        onClick={(e) => handleSimilarWords(e, phrase.text)}
                      >
                        {phrase.text}{" "}
                        {phrase.text === selectedWord && showSimilarWords && (
                          <span
                            className="absolute top-[24px] left-0 w-max bg-white dark:bg-neutral-800
                         border border-gray-300 dark:border-black p-2 rounded-lg shadow-lg z-10"
                          >
                            <ul>
                              {getAlternativeWords(phrase.text) &&
                                getAlternativeWords(phrase.text).map(
                                  (alternative, index) => (
                                    <li
                                      key={index}
                                      className="cursor-pointer text-black dark:text-white hover:bg-gray-200 dark:hover:bg-black rounded-md px-1"
                                      onClick={() =>
                                        rephrasePhrase(
                                          alternative,
                                          indexSentence,
                                          phraseIndex
                                        )
                                      }
                                    >
                                      {alternative}
                                    </li>
                                  )
                                )}
                            </ul>
                            <button
                              className="mt-2 p-1 w-full text-black dark:text-white bg-gray-200 dark:bg-black hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowSimilarWords(false);
                              }}
                            >
                              Close
                            </button>
                          </span>
                        )}
                      </span>
                    );
                  })
                )}
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
                    className="absolute top-[30px] left-0 w-max bg-white dark:bg-neutral-800
                   border border-gray-300 dark:border-black p-2 rounded-lg shadow-lg z-20"
                  >
                    <ul>
                      {processedSentences.hasOwnProperty(input[activeIndex]) &&
                        processedSentences[input[activeIndex]].map(
                          (replacement, replacementIndex) => (
                            <li
                              key={replacementIndex}
                              onClick={() => handleReplaceSentence(replacement)}
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
        <BodyMiddleTools
          decreaseIndexActiveSentence={decreaseIndexActiveSentence}
          increaseIndexActiveSentence={increaseIndexActiveSentence}
          activeIndex={activeIndex}
          output={output}
        />
      </div>
    </div>
  );
}
