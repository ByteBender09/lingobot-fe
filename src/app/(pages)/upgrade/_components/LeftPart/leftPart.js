"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { SubExplain1, SubExplain2 } from "./subExplains";
import OptionItem from "../payOptionItem";
import FormPayment from "./formPayment";

export default function LeftPart() {
  const [partPayment, setPartPayment] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setPartPayment(true);
  };

  return (
    <div
      className="flex flex-[1] flex-col items-center 
    ml-0 md:ml-0 lg:ml-12 xl:ml-12 2xl:ml-12
    mb-8 md:mb-8 lg:mb-0 xl:mb-0 2xl:mb-0"
    >
      {!partPayment ? (
        <>
          <h2 className="text-black dark:text-white text-[26px] font-normal mb-5">
            Select your plan
          </h2>
          <div className="w-full">
            <OptionItem
              firstChild={true}
              title="Annual"
              saleTitle="Save 58%"
              pricePerTime="$4.17"
              pricePerTimeDes="USD per month"
              totalPrice="$49.95"
              timeDuration="billed every 12 months"
              onSelect={handleOptionSelect}
            />
            <OptionItem
              title="Semi"
              saleTitle="Save 33%"
              pricePerTime="$6.66"
              pricePerTimeDes="USD per month"
              totalPrice="$39.95"
              timeDuration="billed every 6 months"
              onSelect={handleOptionSelect}
            />
            <OptionItem
              title="Monthly"
              pricePerTime="$9.95"
              pricePerTimeDes="USD billed monthly"
              onSelect={handleOptionSelect}
            />
          </div>
          <SubExplain1 />
        </>
      ) : (
        <>
          <div className="flex w-full justify-center items-center relative mb-5">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 dark:text-white cursor-pointer"
              onClick={() => setPartPayment(false)}
            />
            <h2 className="text-black dark:text-white text-[26px] font-normal">
              {selectedOption?.title} Plan Selected
            </h2>
          </div>
          <FormPayment selectedOption={selectedOption} />
          <SubExplain2 />
        </>
      )}
    </div>
  );
}
