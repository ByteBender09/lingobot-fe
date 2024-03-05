"use client";

import { useState } from "react";
import Navbar from "@/app/_components/MainScreen/Navbar";
import LeftSideMenu from "@/app/_components/MainScreen/TheOption";
import TheBodyParaphraser from "@/app/_components/MainScreen/TheBodyParaphraser/TheBodyParaphraser";
import TheBodySummarizer from "@/app/_components/MainScreen/TheBodySummarizer/TheBodySummarizer";
import SubIntroduction from "./_components/subIntroduction";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0); // Initial active index

  const handleActiveIndexChange = (index) => {
    setActiveIndex(index);
  };

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
          <LeftSideMenu
            activeIndex={activeIndex}
            onActiveIndexChange={handleActiveIndexChange}
          />
          {activeIndex == 0 ? <TheBodyParaphraser /> : <TheBodySummarizer />}
        </div>
      </div>
      <SubIntroduction />
    </div>
  );
}
