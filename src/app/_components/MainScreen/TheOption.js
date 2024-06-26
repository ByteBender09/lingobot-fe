"use client";

import {
  faBarsStaggered,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PATH, APIPATH } from "@/app/const";
import useAxiosPrivate from "../../_hooks/useAxiosPrivate";
import authRepository from "../../utils/auth";

export default function LeftSideMenu() {
  //FIX CATEGORIES
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const accessToken = authRepository.getAccessToken();

    if (accessToken != undefined) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //SubObtions Click Handle Like LogOut
  const handleSubOptionItemClick = () => {
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
  };
  return (
    <div
      className="flex w-full
      flex-[0] md:flex-[0] lg:flex-[1] xl:flex-[1] 2xl:flex-[1]
      flex-row md:flex-row lg:flex-col xl:flex-col 2xl:flex-col
      mr-0 md:mr-0 lg:mr-8 xl:mr-8 2xl:mr-8
    pt-7 text-black dark:text-white text-[15px] font-light"
    >
      <button
        className="
          rounded-tr-[15px] rounded-br-[15px]
          rounded-tl-[15px] md:rounded-tl-[15px] lg:rounded-tl-[0] xl:rounded-tl-[0] 2xl:rounded-tl-[0]
          rounded-bl-[15px] md:rounded-bl-[15px] lg:rounded-bl-[0] xl:rounded-bl-[0] 2xl:rounded-bl-[0]
          flex flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row
          justify-center md:justify-center lg:justify-start xl:justify-start 2xl:justify-start
          h-max md:h-max lg:h-12 xl:h-12 2xl:h-12
          w-full items-center p-3 mb-[6px] bg-amber-300 dark:bg-neutral-800"
      >
        <FontAwesomeIcon
          icon={faBarsStaggered}
          className="h-4 md:h-4 lg:h-2/3 xl:h-2/3 2xl:h-2/3 
            mr-0 md:mr-0 lg:mr-4 xl:mr-4 2xl:mr-4
            mb-1 md:mb-1 lg:mb-0 xl:mb-0 2xl:mb-0
            "
        />
        <span>Paraphraser</span>
      </button>
      <div
        className=" hidden md:hidden lg:block xl:block 2xl:block 
                    w-full h-[1px] bg-stone-400 my-8"
      ></div>
      {isAuthenticated && (
        <button
          className="rounded-tr-[15px] rounded-br-[15px] 
          rounded-tl-[15px] md:rounded-tl-[15px] lg:rounded-tl-[0] xl:rounded-tl-[0] 2xl:rounded-tl-[0]
          rounded-bl-[15px] md:rounded-bl-[15px] lg:rounded-bl-[0] xl:rounded-bl-[0] 2xl:rounded-bl-[0]
          hidden md:hidden lg:flex xl:flex 2xl:flex 
          flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row
          justify-center md:justify-center lg:justify-start xl:justify-start 2xl:justify-start
          h-max md:h-max lg:h-12 xl:h-12 2xl:h-12
          p-3 w-full items-center mb-[6px] hover:bg-amber-300 hover:dark:bg-neutral-800"
          onClick={() => handleSubOptionItemClick()}
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="h-2/3 
            mr-0 md:mr-0 lg:mr-4 xl:mr-4 2xl:mr-4
            mb-1 md:mb-1 lg:mb-0 xl:mb-0 2xl:mb-0"
          />
          <span>Log Out</span>
        </button>
      )}
    </div>
  );
}
