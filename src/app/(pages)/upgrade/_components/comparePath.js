import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  freeServiceItems,
  premiumServiceItems,
  specificServiceItems,
} from "@/app/const";

export default function ComparePath() {
  return (
    <div
      className="min-w-[50%] flex flex-[1] bg-white dark:bg-neutral-900 rounded-[20px] border border-stone-300 dark:border-zinc-500
    flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row"
    >
      <div
        className="flex bg-white dark:bg-neutral-900 flex-col items-center pb-[40px] rounded-l-[20px]
      w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 
      mb-4 md:mb-0 lg:mb-0 xl:mb-0 2xl:mb-0"
      >
        <div
          className="w-full text-black dark:text-white bg-transparent text-[22px] font-medium mb-6 
          flex items-center justify-center py-3"
        >
          Free
        </div>
        <div className="flex flex-col self-start px-6">
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
      </div>
      <div
        className="flex bg-white dark:bg-neutral-900 rounded-r-[20px]
      w-full md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2"
      >
        <div
          className="flex w-full bg-white dark:bg-neutral-900 flex-col items-center rounded-[20px] 
        border border-sky-400 pb-[20px] overflow-hidden"
        >
          <div
            className="w-full text-white bg-sky-600 text-[22px] font-medium mb-6 
          flex items-center justify-center py-3"
          >
            Premium
          </div>
          <div className="flex flex-col self-start px-6">
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
        </div>
      </div>
    </div>
  );
}
