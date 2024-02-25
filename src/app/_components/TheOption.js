"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import auth from "../utils/auth";
import useAxiosPrivate from "../(pages)/hooks/useAxiosPrivate";
import {
  faBarsStaggered,
  faSpellCheck,
  faRectangleList,
  faEnvelope,
  faArrowRightFromBracket,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

export default function TheOption({ activeIndex, onActiveIndexChange }) {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();

  const options = [
    { name: "Paraphraser", icon: faBarsStaggered },
    { name: "Summarizer", icon: faRectangleList },
    { name: "Grammar Checker", icon: faSpellCheck },
  ];

  const subObtions = [
    { name: "Contact Us", icon: faEnvelope },
    { name: "Help Center", icon: faCircleQuestion },
    { name: "Log Out", icon: faArrowRightFromBracket },
  ];

  const handleButtonClick = (index) => {
    onActiveIndexChange(index);
  };

  //Log Out
  const handleSubOptionClick = (index) => {
    if (index === subObtions.length - 1) {
      const object = {
        refresh_token: auth.getRefreshToken(),
      };
      axiosPrivate
        .post("/auth/logout/", object)
        .then(() => {
          auth.logout();
          router.push("/auth/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="flex-[1] mr-8 pt-7 text-black dark:text-white text-[15px] font-light">
      {options.map((option, index) => (
        <button
          key={index}
          className={`rounded-tr-[15px] rounded-br-[15px] flex items-center justify-start p-3 h-12 w-full mb-[6px] ${
            index === activeIndex ? "bg-amber-300 dark:bg-neutral-800" : ""
          }`}
          onClick={() => handleButtonClick(index)}
        >
          <FontAwesomeIcon icon={option.icon} className="h-2/3 mr-4" />
          <span>{option.name}</span>
        </button>
      ))}
      <div className="block w-full h-[1px] bg-stone-400 my-8"></div>
      {subObtions.map((option, index) => (
        <button
          key={index}
          className="rounded-tr-[15px] rounded-br-[15px] flex items-center justify-start p-3 h-12 w-full mb-[6px] hover:bg-amber-300 hover:dark:bg-neutral-800"
          onClick={() => handleSubOptionClick(index)}
        >
          <FontAwesomeIcon icon={option.icon} className="h-2/3 mr-4" />
          <span>{option.name}</span>
        </button>
      ))}
    </div>
  );
}
