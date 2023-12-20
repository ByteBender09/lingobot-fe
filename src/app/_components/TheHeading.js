"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../app/_externals/assets/LogoApp.svg";
import USA from "../_externals/assets/USA.svg";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const toggleTheme = () => {
  document.documentElement.classList.toggle("dark");
};

export default function TheHeading() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-[1] mr-8">
        <Image src={Logo} alt="Logo" />
      </div>
      <div className="flex-[4.7] flex justify-between items-center">
        <div>
          <h1 className="text-black dark:text-white text-2xl font-semibold">
            Welcome to QuillBot
          </h1>
        </div>
        <div className="flex text-stone-500 dark:text-white">
          <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-neutral-800 rounded-[5px]">
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
