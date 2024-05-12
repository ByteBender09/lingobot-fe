"use client";

import {
  faMoon,
  faSun,
  faCrown,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PATH, APIPATH, SUBSCRIBTION } from "@/app/const";
import Image from "next/image";
import Logo from "@/app/_externals/assets/LogoApp.svg";
import USA from "@/app/_externals/assets/USA.svg";
import { useState, useEffect, memo, useContext } from "react";
import { useRouter } from "next/navigation";
import useAxiosPrivate from "@/app/_hooks/useAxiosPrivate";
import ModalUpdateUserInfor from "./ModalUpdateInfor";
import Link from "next/link";
import authRepository from "../../utils/auth";
import { CurrentSubscribtionContext } from "@/app/Context/CurrentSubscribtionContext";

const toggleTheme = () => {
  document.documentElement.classList.toggle("dark");
};

const Navbar = () => {
  const { subscribtion, setSubscribtion } = useContext(
    CurrentSubscribtionContext
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameProfile, setNameProfile] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await authRepository.getInfo();
        setNameProfile(info.name);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    //GET CURRENT PLAN
    const fetchCurrentPlan = async () => {
      try {
        const response = await axiosPrivate.get(
          "/payment/subscription/current-plan/"
        );
        if (response.data.data?.subscription_plan.name === "FREE") {
          setSubscribtion(SUBSCRIBTION.FREE);
        } else {
          setSubscribtion(SUBSCRIBTION.PREMIUM);
        }
      } catch (error) {
        console.error("Error fetching query history:", error);
      }
    };

    if (authRepository.getAccessToken() != "") {
      fetchData();
      fetchCurrentPlan();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogOutClick = () => {
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
    <div className="flex w-full items-center justify-between z-20">
      <Link href={PATH.HOME} className="flex-[1] mr-8">
        <Image src={Logo} alt="Logo" />
      </Link>
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
          <div
            className="text-black dark:text-white 
            text-sm md:text-sm lg:text-base xl:text-base 2xl:text-base
            font-semibold self-center relative h-[40px]
            flex items-center justify-center text_profile
            mr-3 md:mr-3 lg:mr-5 xl:mr-5 2xl:mr-5
            cursor-pointer "
          >
            Hi {nameProfile}
            <div
              className={`absolute w-max ${
                subscribtion === SUBSCRIBTION.FREE
                  ? "bottom-[-140px]"
                  : "bottom-[-100px]"
              }  right-0 
              transition-opacity opacity-0 duration-500 modal_profile z-20
              hidden flex-col py-2 bg-white dark:bg-neutral-900 rounded-[10px] shadow`}
            >
              {subscribtion === SUBSCRIBTION.FREE && (
                <Link
                  className="w-full cursor-pointer px-7 py-2 flex items-center justify-start 
              bg-white dark:bg-neutral-900 hover:bg-amber-300"
                  href={PATH.PREMIUM}
                >
                  <FontAwesomeIcon
                    icon={faCrown}
                    className="mr-6 dark:text-white"
                  />
                  <span className="text-black dark:text-white text-base font-normal">
                    Premium
                  </span>
                </Link>
              )}

              <div
                className="w-full cursor-pointer px-7 py-2 flex items-center justify-start
              bg-white dark:bg-neutral-900 hover:bg-amber-300"
                onClick={openModal}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="mr-7 dark:text-white"
                />
                <span className="text-black dark:text-white text-base font-normal">
                  Profile
                </span>
              </div>
              <div
                className="w-full cursor-pointer px-7 py-2 flex items-center justify-start
              bg-white dark:bg-neutral-900 hover:bg-amber-300"
                onClick={handleLogOutClick}
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="mr-7 dark:text-white"
                />
                <span className="text-black dark:text-white text-base font-normal">
                  Log Out
                </span>
              </div>
            </div>
          </div>
          <div
            className="w-10 h-10 
          hidden md:hidden lg:flex xl:flex 2xl:flex
          items-center justify-center bg-white dark:bg-neutral-800 rounded-[5px] shadow"
          >
            <Image src={USA} alt="USA" />
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-neutral-800 rounded-[5px] ml-1 shadow">
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
      {isModalOpen && <ModalUpdateUserInfor closeModal={closeModal} />}
    </div>
  );
};

export default memo(Navbar);
