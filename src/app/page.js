"use client";

import TheHeading from "./_components/TheHeading";
import TheOption from "./_components/TheOption";
import TheBodyParaphraser from "./_components/TheBodyParaphraser/TheBodyParaphraser";
import TheBodySummarizer from "./_components/TheBodySummarizer/TheBodySummarizer";
import { useState } from "react";
import ModalUpdateInfor from "./_components/ModalUpdateInfor";

export default function MainScreen() {
  const [activeIndex, setActiveIndex] = useState(0); // Initial active index
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActiveIndexChange = (index) => {
    setActiveIndex(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-screen h-screen px-[22px] py-8 bg-sky-100 dark:bg-neutral-900 relative">
      <TheHeading openModal={openModal} />
      <div
        className="flex 
      flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row
      h-[90%] items-start justify-between 
      mt-2 md:mt-2 lg:mt-6 xl:mt-6 2xl:mt-6"
      >
        <TheOption
          activeIndex={activeIndex}
          onActiveIndexChange={handleActiveIndexChange}
        />
        {activeIndex == 0 ? <TheBodyParaphraser /> : <TheBodySummarizer />}
      </div>
      {isModalOpen && <ModalUpdateInfor closeModal={closeModal} />}
    </div>
  );
}
