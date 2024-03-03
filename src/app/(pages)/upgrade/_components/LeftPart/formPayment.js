"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function FormPayment({ selectedOption }) {
  const [isOpenDiscount, setOpenDiscount] = useState(false);
  return (
    <div
      className="w-full bg-white dark:bg-neutral-900
       rounded-[15px] shadow border border-zinc-300 p-8"
    >
      <h3 className="text-black dark:text-white text-[28px] font-normal mb-1">
        {selectedOption?.totalPrice}
      </h3>
      <div className="flex justify-start">
        <span className="text-black dark:text-white text-sm font-light">
          {selectedOption?.timeDuration}
        </span>
        {selectedOption?.pricePerTime ? (
          <span className="text-stone-500 dark:text-white text-sm font-light">
            &nbsp; • &nbsp;{selectedOption?.pricePerTime}{" "}
            {selectedOption?.pricePerTimeDes}
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="w-full mt-5">
        <div
          className="flex w-full cursor-pointer justify-between p-3 border-b border-neutral-300"
          onClick={() => setOpenDiscount(!isOpenDiscount)}
        >
          <div>
            <FontAwesomeIcon
              icon={faPercent}
              className="mr-3 dark:text-white"
            />
            <span className="text-black dark:text-white text-base font-normal">
              Add discount code
            </span>
          </div>
          <FontAwesomeIcon
            icon={!isOpenDiscount ? faChevronDown : faChevronUp}
            className="dark:text-white"
          />
        </div>
        {isOpenDiscount ? (
          <div className={`w-full flex justify-between items-center my-4`}>
            <input
              type="text"
              placeholder="Enter code"
              className="outline-none border border-zinc-300 py-2 px-4 rounded-[10px] 
                flex-[1] mr-4 dark:bg-neutral-900 dark:text-white"
            />
            <button className="py-2 px-5 text-sky-600 border border-sky-600 bg-transparent hover:bg-sky-600 hover:text-white rounded-[18px]">
              Apply
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="w-full mt-4">
        <input
          placeholder="Card Number"
          className="outline-none border border-zinc-300 py-2 px-4 rounded-[10px] 
            w-full dark:bg-neutral-900 dark:text-white"
        />
        <div className="flex justify-between w-full mt-4">
          <input
            placeholder="MM/YY"
            className="outline-none border border-zinc-300 py-2 px-4 rounded-[10px] w-[32%]
              dark:bg-neutral-900 dark:text-white"
          />
          <input
            placeholder="CVV"
            className="outline-none border border-zinc-300 py-2 px-4 rounded-[10px] w-[32%]
              dark:bg-neutral-900 dark:text-white"
          />
          <input
            placeholder="Postal Code"
            className="outline-none border border-zinc-300 py-2 px-4 rounded-[10px] w-[32%]
              dark:bg-neutral-900 dark:text-white"
          />
        </div>
        <button
          className="bg-amber-300 mt-4 rounded-[25px] py-2 w-full 
            text-black text-[15px] font-medium
            hover:bg-amber-400 transition duration-200 ease-in-out"
        >
          Check out
        </button>
      </div>
    </div>
  );
}
