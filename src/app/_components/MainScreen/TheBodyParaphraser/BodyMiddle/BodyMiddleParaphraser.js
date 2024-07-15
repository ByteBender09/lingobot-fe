"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  countWordsFromDocFile,
  getParagraphsFromDocFile,
  truncateContent,
} from "@/app/utils/handleText";
import {
  handleParaphraseInput,
  handleGetSimilarMeanings,
} from "@/app/utils/paraphrasing";
import { axiosClient } from "@/app/_api/axios";
import { useState, useRef, useEffect, useContext } from "react";
import { useKeyDown } from "@/app/_hooks/useKeyDown";
import { BodyMiddleTools } from "./BodyMiddleTools";
import { ScoreContext } from "@/app/Context/ScoreContext";
import { ModelStateContext } from "@/app/Context/ModelStateContext";
import { SeletedQueryContext } from "@/app/Context/SelectedQueryContext";
import { CurrentSubscribtionContext } from "@/app/Context/CurrentSubscribtionContext";
import { LISTSTYLES, SUBSCRIBTION, APIPATH, MODELTYPE } from "@/app/const";
import useAxiosPrivate from "@/app/_hooks/useAxiosPrivate";
import LoadingSpinner from "../../../Others/spinner";
import Swal from "sweetalert2";
import authRepository from "@/app/utils/auth";

export default function BodyMiddleParaphraser() {
  const { activeStyleIndex, selectedOption, setSelectedOption } =
    useContext(ModelStateContext);
  const { setScore, setLoadingScore } = useContext(ScoreContext);
  const { subscribtion } = useContext(CurrentSubscribtionContext);
  const { selectedQuery } = useContext(SeletedQueryContext);
  const axiosPrivate = useAxiosPrivate();
  const [textStyle, setTextStyle] = useState(LISTSTYLES[activeStyleIndex]);
  const [modelType, setModelType] = useState(selectedOption);
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
  const [replaceWords, setReplaceWords] = useState([]);
  const fileInputRef = useRef(null);
  const timeoutRef = useRef(null);

  //Handle change content user input
  const handleChangeContent = (value) => {
    let content = value;

    if (Array.isArray(value)) {
      content = value.join(" ");
    }

    if (subscribtion === SUBSCRIBTION.PREMIUM) {
      setContent(content);
    } else {
      const wordCount = countWordsFromDocFile(content);
      if (wordCount > 100) {
        Swal.fire({
          title: "Limit 100 words for free",
          icon: "warning",
          timer: 2000,
        });
        const truncatedContent = truncateContent(content, 100);
        setContent(truncatedContent);
      } else {
        setContent(content);
      }
    }
  };

  //Handle when open similar words modal
  const handleSimilarWords = (e, word) => {
    e.stopPropagation();
    setSelectedWord(word);
    setShowSimilarWords(true);
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
      handleChangeContent(paragraphs);
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
    if (activeIndex + 1 < output.length) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    } else if (output.length != 0) setActiveIndex(output.length - 1);
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
      for (const item of phrases) {
        if (item.text === phrase)
          return item.alts.filter((word) => word !== phrase);
      }
    }
    return [];
  };

  //Function to replace a phrase
  const rephrasePhrase = (alternative, phraseIndex, index) => {
    setReplaceWords((prev) => {
      const updatedReplaceWords = [...prev];
      updatedReplaceWords[phraseIndex][index].text = alternative;
      return updatedReplaceWords;
    });
  };

  //Handle split into smaller sentence to request
  const handleAnalysisInput = () => {
    var sentences = content.split(/(?<=[.!?])\s+/);
    sentences = sentences.filter((sentence) => sentence.trim() !== "");
    setInput(sentences);

    //Init when change model
    setTextStyle(LISTSTYLES[activeStyleIndex]);

    if (selectedOption == "option1" || selectedOption == MODELTYPE.T5)
      setModelType(MODELTYPE.T5);
    else setModelType(MODELTYPE.MISTRAL);
  };

  //QUERY HISTORY
  //Function set current query
  const setCurrentQuery = (item) => {
    setContent(item?.input);
    setReplaceWords(item?.output);
    setOutput(item?.output);
    setSelectedOption(item?.model_type);
    switch (item?.text_style) {
      case "Standard":
        setActiveIndex(0);
        break;
      case "Fluency":
        setActiveIndex(1);
        break;
      case "Formal":
        setActiveIndex(2);
        break;
      case "Academy":
        setActiveIndex(3);
        break;
      case "Creative":
        setActiveIndex(4);
        break;
      case "Simple":
        setActiveIndex(5);
        break;
      case "Shorten":
        setActiveIndex(6);
        break;
    }
  };

  //Function to save to history
  const saveQueryToHistory = async (results) => {
    try {
      const query = {
        input: content,
        output: results,
        modelType: selectedOption,
        textStyle: textStyle,
      };
      await axiosPrivate.post("/paraphrase-history/", query);
    } catch (err) {
      console.log(err);
    }
  };

  //Handle Blue Score
  const handleBlueScore = (input, output) => {
    const outputToString = output
      .map((arr) => {
        return arr
          .map((item) => {
            return item.text;
          })
          .join(" ");
      })
      .join("\n");
    const object = { input: input, output: outputToString };

    axiosClient
      .post(APIPATH.SCORE, object)
      .then((res) => {
        setScore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //When text style change => reset output
  useEffect(() => {
    setOutput([]);
  }, [textStyle, modelType]);

  //Handle when input change => Get Similar meaning sentences
  useEffect(() => {
    if (input.length === 0) return;
    setOutput(input);
    setIsLoading(true);

    let resolvedPromisesCount = 0;

    const promises = input.map((sentence, index) => {
      if (sentence.trim() === "") return;

      const key = `${sentence}_${textStyle}_${modelType}`;
      const cachedResult = processedSentences[key];

      if (cachedResult) {
        const randomIndex = Math.floor(Math.random() * cachedResult.length);
        updateOutput(index, cachedResult[randomIndex]);
        resolvedPromisesCount++;
      } else {
        return handleParaphraseInput(sentence, textStyle, modelType)
          .then((result) => {
            setProcessedSentences((prevProcessedSentences) => ({
              ...prevProcessedSentences,
              [key]: result,
            }));
            updateOutput(index, result[0]);
            resolvedPromisesCount++;
          })
          .catch((err) => {
            console.error(err);
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
  }, [input, textStyle, modelType]);

  //Handle when output change
  useEffect(() => {
    let resolvedPromisesCount = 0;

    if (firstPromiseComplete && output.length > 0) {
      const promises = output.map((sentence) => {
        if (typeof sentence == "string") {
          if (!rephrasedSentences.hasOwnProperty(sentence.trim())) {
            return handleGetSimilarMeanings(sentence).then((result) => {
              const punctuation = sentence.trim().slice(-1);
              const punctuationMarks = [".", "!", "?"];

              // Check final punctuation marks
              if (
                !punctuationMarks.includes(
                  result[result.length - 1].text.slice(-1)
                ) &&
                punctuationMarks.includes(punctuation)
              ) {
                result[result.length - 1].text += punctuation;
                result[result.length - 1].alts = result[
                  result.length - 1
                ].alts.map((item) => {
                  if (!punctuationMarks.includes(item.slice(-1))) {
                    return item + punctuation;
                  }
                  return item;
                });
              }

              // Store to reuse
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
          resolvedPromisesCount++;
          return Promise.resolve(sentence[0]);
        }
      });

      Promise.all(promises)
        .then((results) => {
          if (resolvedPromisesCount === output.length) {
            setSecondPromiseComplete(true);
          }
          setFirstPromiseComplete(false);
          setReplaceWords(results);
          if (authRepository.getAccessToken() != undefined)
            saveQueryToHistory(results);
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
        handleBlueScore(content, replaceWords);

        // if (Array.isArray(output) && Array.isArray(replaceWords[0]))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replaceWords]);

  useKeyDown((e) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleAnalysisInput();
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedQuery).length != 0) {
      setCurrentQuery(selectedQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuery]);

  // Update Loading
  useEffect(() => {
    setLoadingScore(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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
          placeholder="Enter your sentence to paraphrase"
          onChange={(e) => handleChangeContent(e.target.value)}
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
                  sentence === input[indexSentence] && isLoading
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
                      {processedSentences.hasOwnProperty(
                        `${input[activeIndex]}_${textStyle}_${modelType}`
                      ) &&
                        processedSentences[
                          `${input[activeIndex]}_${textStyle}_${modelType}`
                        ].map((replacement, replacementIndex) => (
                          <li
                            key={replacementIndex}
                            onClick={() => handleReplaceSentence(replacement)}
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-black p-1 rounded-md px-2"
                          >
                            {replacement}
                          </li>
                        ))}
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
