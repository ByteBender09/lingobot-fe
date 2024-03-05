"use client";

import {
  faBarsStaggered,
  faRectangleList,
  faEnvelope,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { PATH, APIPATH } from "@/app/const";
import useAxiosPrivate from "../../(pages)/hooks/useAxiosPrivate";
import authRepository from "../../utils/auth";

export default function LeftSideMenu({ activeIndex, onActiveIndexChange }) {
  //FIX CATEGORIES
  const options = [
    { name: "Paraphraser", icon: faBarsStaggered },
    { name: "Summarizer", icon: faRectangleList },
  ];

  const subObtions = [
    { name: "Contact Us", icon: faEnvelope },
    { name: "Log Out", icon: faArrowRightFromBracket },
  ];

  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();

  const handleOptionItemClick = (index) => {
    onActiveIndexChange(index);
  };

  //SubObtions Click Handle Like Contact Us, LogOut
  const handleSubOptionItemClick = (index) => {
    if (index === subObtions.length - 1) {
      //Log Out
      const object = {
        refresh_token: authRepository.getRefreshToken(),
      };
      axiosPrivate
        .post(APIPATH.LOGOUT, object)
        .then(() => {
          authRepository.logout();
          router.push(PATH.LOGIN);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div
      className="flex w-full
      flex-[0] md:flex-[0] lg:flex-[1] xl:flex-[1] 2xl:flex-[1]
      flex-row md:flex-row lg:flex-col xl:flex-col 2xl:flex-col
      mr-0 md:mr-0 lg:mr-8 xl:mr-8 2xl:mr-8
    pt-7 text-black dark:text-white text-[15px] font-light"
    >
      {options.map((option, index) => (
        <button
          key={index}
          className={`
          rounded-tr-[15px] rounded-br-[15px]
          rounded-tl-[15px] md:rounded-tl-[15px] lg:rounded-tl-[0] xl:rounded-tl-[0] 2xl:rounded-tl-[0]
          rounded-bl-[15px] md:rounded-bl-[15px] lg:rounded-bl-[0] xl:rounded-bl-[0] 2xl:rounded-bl-[0]
          flex flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row
          justify-center md:justify-center lg:justify-start xl:justify-start 2xl:justify-start
          h-max md:h-max lg:h-12 xl:h-12 2xl:h-12
          w-full items-center p-3 mb-[6px] ${
            index === activeIndex ? "bg-amber-300 dark:bg-neutral-800" : ""
          }`}
          onClick={() => handleOptionItemClick(index)}
        >
          <FontAwesomeIcon
            icon={option.icon}
            className="h-4 md:h-4 lg:h-2/3 xl:h-2/3 2xl:h-2/3 
            mr-0 md:mr-0 lg:mr-4 xl:mr-4 2xl:mr-4
            mb-1 md:mb-1 lg:mb-0 xl:mb-0 2xl:mb-0
            "
          />
          <span>{option.name}</span>
        </button>
      ))}
      <div
        className=" hidden md:hidden lg:block xl:block 2xl:block 
                    w-full h-[1px] bg-stone-400 my-8"
      ></div>
      {subObtions.map((option, index) => (
        <button
          key={index}
          className="rounded-tr-[15px] rounded-br-[15px] 
          rounded-tl-[15px] md:rounded-tl-[15px] lg:rounded-tl-[0] xl:rounded-tl-[0] 2xl:rounded-tl-[0]
          rounded-bl-[15px] md:rounded-bl-[15px] lg:rounded-bl-[0] xl:rounded-bl-[0] 2xl:rounded-bl-[0]
          hidden md:hidden lg:flex xl:flex 2xl:flex 
          flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row
          justify-center md:justify-center lg:justify-start xl:justify-start 2xl:justify-start
          h-max md:h-max lg:h-12 xl:h-12 2xl:h-12
          p-3 w-full items-center mb-[6px] hover:bg-amber-300 hover:dark:bg-neutral-800"
          onClick={() => handleSubOptionItemClick(index)}
        >
          <FontAwesomeIcon
            icon={option.icon}
            className="h-2/3 
            mr-0 md:mr-0 lg:mr-4 xl:mr-4 2xl:mr-4
            mb-1 md:mb-1 lg:mb-0 xl:mb-0 2xl:mb-0"
          />
          <span>{option.name}</span>
        </button>
      ))}
    </div>
  );
}
