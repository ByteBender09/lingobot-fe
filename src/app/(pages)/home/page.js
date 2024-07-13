"use client";

import Navbar from "@/app/_components/MainScreen/Navbar";
import LeftSideMenu from "@/app/_components/MainScreen/TheOption";
import TheBodyParaphraser from "@/app/_components/MainScreen/TheBodyParaphraser/TheBodyParaphraser";
import SubIntroduction from "./_components/subIntroduction";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PATH } from "@/app/const";
import Swal from "sweetalert2";
import authRepository from "@/app/utils/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = authRepository.getAccessToken();

    if (accessToken == undefined) {
      Swal.fire({
        title: "Hint!",
        text: "Log in to save your requests history!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log In",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(PATH.LOGIN);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="py-6 w-full px-[22px]">
        <Navbar />
        <div
          className="flex
          flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row
          h-[95vh] items-start justify-between 
          mt-2 md:mt-2 lg:mt-6 xl:mt-6 2xl:mt-6"
        >
          <LeftSideMenu />
          <TheBodyParaphraser />
        </div>
      </div>
      <SubIntroduction />
    </div>
  );
}
