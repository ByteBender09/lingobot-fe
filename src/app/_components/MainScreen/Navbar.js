"use client";

import {
  faMoon,
  faSun,
  faCrown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { PATH } from "@/app/const";
import ModalUpdateUserInfor from "./ModalUpdateInfor";
import Image from "next/image";
import Logo from "@/app/_externals/assets/LogoApp.svg";
import USA from "@/app/_externals/assets/USA.svg";
import authRepository from "../../utils/auth";
import Link from "next/link";

const toggleTheme = () => {
  document.documentElement.classList.toggle("dark");
};

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameProfile, setNameProfile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await authRepository.getInfo();
        setNameProfile(info.name);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchData();
  }, []); // Chỉ gọi một lần sau khi component được mount

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex items-center justify-between">
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
              className="absolute w-max bottom-[-100px] right-0 
              transition-opacity opacity-0 duration-500 modal_profile
              hidden flex-col py-2 bg-white rounded-[10px] shadow"
            >
              <Link
                className="w-full cursor-pointer px-7 py-2 flex items-center justify-start bg-white hover:bg-amber-300"
                href={PATH.PREMIUM}
              >
                <FontAwesomeIcon icon={faCrown} className="mr-6" />
                <span className="text-black text-base font-normal">
                  Premium
                </span>
              </Link>
              <div
                className="w-full cursor-pointer px-7 py-2 flex items-center justify-start bg-white hover:bg-amber-300"
                onClick={openModal}
              >
                <FontAwesomeIcon icon={faUser} className="mr-7" />
                <span className="text-black text-base font-normal">
                  Profile
                </span>
              </div>
            </div>
          </div>
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
      {isModalOpen && <ModalUpdateUserInfor closeModal={closeModal} />}
    </div>
  );
}
