"use client";

import TheHeading from "./_components/TheHeading";
import TheOption from "./_components/TheOption";
import TheBodyParaphraser from "./_components/TheBodyParaphraser/TheBodyParaphraser";
import TheBodySummarizer from "./_components/TheBodySummarizer/TheBodySummarizer";
import { useState } from "react";

export default function MainScreen() {
  const [activeIndex, setActiveIndex] = useState(0); // Initial active index

  const handleActiveIndexChange = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="w-screen h-screen px-[22px] py-8 bg-sky-100 dark:bg-neutral-900">
      <TheHeading />
      <div className="flex h-[90%] items-start justify-between mt-6">
        <TheOption
          activeIndex={activeIndex}
          onActiveIndexChange={handleActiveIndexChange}
        />
        {activeIndex == 0 ? <TheBodyParaphraser /> : <TheBodySummarizer />}
      </div>
    </div>
  );
}
