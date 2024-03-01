"use client";

import { useState } from "react";
import LeftSideMenu from "@/app/_components/MainScreen/TheOption";
import TheBodyParaphraser from "@/app/_components/MainScreen/TheBodyParaphraser/TheBodyParaphraser";
import TheBodySummarizer from "@/app/_components/MainScreen/TheBodySummarizer/TheBodySummarizer";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0); // Initial active index

  const handleActiveIndexChange = (index) => {
    setActiveIndex(index);
  };

  return (
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
  );
}
