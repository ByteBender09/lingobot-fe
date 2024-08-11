"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { handleGetAnalysicDetail } from "@/app/utils/paraphrasing";
import Switch from "react-switch";
import LoadingSpinner from "../Others/spinner";

export default function ModalAnalysicInput({ content, closeModal }) {
  const [checked, setChecked] = useState(false);
  const [detailResult, setDetailResult] = useState(null);
  const [finalResult, setFinalResult] = useState(content);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    if (!nextChecked) setFinalResult(content);
    else {
      if (detailResult == null) {
        handleGetAnalysicDetail(content)
          .then((result) => {
            setDetailResult(result?.evaluation);
            setFinalResult(result?.evaluation);
          })
          .catch((error) => {
            console.error("Error calling OpenAI API:", error);
          });
      } else {
        setFinalResult(detailResult);
      }
    }
  };
  return (
    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-70 flex flex-col items-center justify-center">
      <div
        className="flex flex-col 
          px-4 md:px-4 lg:px-8 xl:px-8 2xl:px-8
           py-5 bg-white rounded-[20px] w-[60%] max-h-[90%] relative"
      >
        <button className="absolute top-5 right-10" onClick={closeModal}>
          <FontAwesomeIcon icon={faClose} size="1x" />
        </button>
        <div className="w-100 flex justify-between items-center mb-5">
          <h3 className="text-black text-xl font-medium self-center">
            Analyze the passage
          </h3>
          <div className="flex items-center mr-10">
            <span className="mr-3">Detail</span>
            <Switch
              checked={checked}
              onChange={handleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={20}
              uncheckedIcon={false}
              size={10}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            />
          </div>
        </div>
        <div className="flex justify-between items-start max-h-[90%] overflow-y-auto">
          {!checked ? (
            <span className="text-sm leading-6">{finalResult}</span>
          ) : detailResult != null ? (
            <div className="flex flex-col">
              <div className="flex flex-col mb-4">
                <span className="text-sm font-semibold mb-2">Clarify</span>
                <span className="text-sm">{finalResult?.clarity}</span>
              </div>
              <div className="flex flex-col mb-4">
                <span className="text-sm font-semibold mb-2">Grammar</span>
                {finalResult?.grammar?.map((item, index) => (
                  <span key={index} className="text-sm">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-col mb-4">
                <span className="text-sm font-semibold mb-2">Structure</span>
                <span className="text-sm">{finalResult?.structure}</span>
              </div>
              <div className="flex flex-col mb-4">
                <span className="text-sm font-semibold mb-2">Overall</span>
                <span className="text-sm">{finalResult?.overall}</span>
              </div>
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
        <button
          className="w-[140px] h-10 self-center bg-sky-500 hover:bg-sky-600 rounded-[10px] text-white text-sm font-normal mt-9"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
}
