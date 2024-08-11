"use client";

import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import {
  PATH,
  freeServiceItems,
  premiumServiceItems,
  specificServiceItems,
} from "@/app/const";
import Navbar from "@/app/_components/MainScreen/Navbar";

export default function PremiumPage() {
  const router = useRouter();

  const goUpgrade = () => router.push(PATH.UPGRADE);
  return (
    <div className="px-[22px] py-6">
      <Navbar />
      <div className="w-full flex flex-col items-center">
        <h3
          className="text-black dark:text-white font-normal 
      text-[20px] md:text-[20px] lg:text-[30px] xl:text-[35px] 2xl:text-[35px]
      my-6 md:my-6 lg:my-10 xl:my-12 2xl:my-12"
        >
          Upgrade your writing
        </h3>
        <div
          className="min-w-[50%] flex bg-white dark:bg-neutral-900 rounded-[20px] border border-stone-300 dark:border-zinc-500 relative
      flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row"
        >
          <div
            className="absolute hidden md:hidden lg:block xl:block 2xl:block
         top-[-8%] w-[110%] h-[93.5%] origin-top-left rotate-[10deg] bg-cyan-300 dark:bg-neutral-800 rounded-[45px]"
          ></div>
          <div
            className="flex bg-white dark:bg-neutral-900 flex-col items-center p-7 pb-[80px] relative rounded-l-[20px]
        w-full md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 mb-4 md:mb-0 lg:mb-0 xl:mb-0 2xl:mb-0"
          >
            <h3 className="text-black dark:text-white text-[22px] font-medium mb-5">
              Free
            </h3>
            <button
              className="bg-white dark:bg-neutral-900 mb-7 rounded-[28px] border border-slate-300 dark:border-neutral-500 py-2 w-full 
            text-slate-300 dark:text-neutral-500 text-[15px] font-medium"
            >
              Current Plan
            </button>
            <div className="flex flex-col self-start">
              {freeServiceItems.map((item, index) => (
                <div key={index} className="mb-6">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="mr-3"
                    color="#058CD9"
                  />
                  <span className="text-black dark:text-white text-[15px] font-normal">
                    {item}
                  </span>
                </div>
              ))}
              {specificServiceItems.map((item, index) => (
                <div key={index} className="mb-6">
                  <FontAwesomeIcon
                    icon={faClose}
                    className="mr-3"
                    color="#EA6F6F"
                  />
                  <span className="text-neutral-300 dark:text-zinc-600 text-[15px] font-normal">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full flex items-center justify-center py-5 bg-zinc-100 dark:bg-neutral-800 rounded-bl-[20px] absolute bottom-0">
              <span className="text-black dark:text-white text-sm font-normal text-center">
                No credit card required
              </span>
            </div>
          </div>
          <div
            className="flex bg-white dark:bg-neutral-900 relative rounded-r-[20px]
        w-full md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2"
          >
            <div className="w-full flex py-5 bg-zinc-100 dark:bg-neutral-800 absolute bottom-0"></div>
            <div className="flex w-full bg-white dark:bg-neutral-900 flex-col items-center p-7 rounded-[20px] border border-sky-400 pb-[80px] relative">
              <h3 className="text-black dark:text-white text-[22px] font-medium mb-5">
                Premium
              </h3>
              <button
                className="bg-amber-300 mb-7 rounded-[28px] border border-amber-300 py-2 w-full text-black text-[15px] font-medium
              hover:bg-amber-400 transition duration-200 ease-in-out"
                onClick={goUpgrade}
              >
                Upgrade
              </button>
              <div className="flex flex-col self-start">
                {premiumServiceItems.map((item, index) => (
                  <div key={index} className="mb-6">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="mr-3"
                      color="#058CD9"
                    />
                    <span className="text-black dark:text-white text-[15px] font-normal">
                      {item}
                    </span>
                  </div>
                ))}
                {specificServiceItems.map((item, index) => (
                  <div key={index} className="mb-6">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="mr-3"
                      color="#058CD9"
                    />
                    <span className="text-black dark:text-white text-[15px] font-normal">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full flex items-center justify-center py-5 bg-zinc-100 dark:bg-neutral-800 rounded-b-[20px] absolute bottom-0">
                <span className="text-black dark:text-white text-sm font-normal text-center">
                  3-day money-back guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
