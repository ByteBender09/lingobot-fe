"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Logo from "../../app/_externals/assets/LogoApp.svg";
import USA from "../_externals/assets/USA.svg";
import auth from "../utils/auth";

const toggleTheme = () => {
  document.documentElement.classList.toggle("dark");
};

export default function TheHeading({ openModal }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-[1] mr-8">
        <Image src={Logo} alt="Logo" />
      </div>
      <div
        className="flex-[2] md:flex-[2] lg:flex-[4.7] xl:flex-[4.7] 2xl:flex-[4.7]
      flex justify-between items-center"
      >
        <div>
          <h1
            className="text-black dark:text-white font-semibold 
          text-sm md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl
          hidden md:hidden lg:block xl:block 2xl:block"
          >
            Welcome to LingoBot
          </h1>
        </div>
        <div className="flex text-stone-500 dark:text-white">
          <button
            className="text-black dark:text-white 
            text-sm md:text-sm lg:text-base xl:text-base 2xl:text-base
            font-semibold self-center 
            mr-3 md:mr-3 lg:mr-5 xl:mr-5 2xl:mr-5
            cursor-pointer hover:text-blue-600"
            onClick={openModal}
          >
            Hi {auth.getInfo().name}
          </button>
          <div
            className="w-10 h-10 
          hidden md:hidden lg:flex xl:flex 2xl:flex
          items-center justify-center bg-white dark:bg-neutral-800 rounded-[5px]"
          >
            <Image src={USA} alt="USA" />
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-neutral-800 rounded-[5px] ml-1">
            <button onClick={() => toggleTheme()} className="w-1/3 dark:hidden">
              <FontAwesomeIcon icon={faMoon} />
            </button>
            <button
              onClick={() => toggleTheme()}
              className="w-1/3 hidden dark:block"
            >
              <FontAwesomeIcon icon={faSun} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
