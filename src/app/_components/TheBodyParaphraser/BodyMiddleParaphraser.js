import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faTrash,
  faCopy,
  faDownload,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function BodyMiddleParaphraser() {
  return (
    <div className="flex flex-[1] justify-between items-start mt-5">
      <div className="flex flex-col h-full flex-[1] mr-4 text-sm font-light bg-white dark:bg-neutral-900 px-4 pt-[18px] pb-4 rounded-[17px]">
        <textarea className="w-full flex-[1] pr-1 bg-transparent text-black dark:text-white leading-[30px] outline-none mb-2" />
        <div className="flex items-center justify-between text-black dark:text-white">
          <div className="flex items-center ">
            <span className="text-[15px] font-light mr-3">57 Words</span>
            <button className="mr-3">
              <FontAwesomeIcon icon={faSnowflake} size="xl" />
            </button>
            <button>
              <FontAwesomeIcon icon={faTrash} size="xl" />
            </button>
          </div>
          <button className="py-[10px] px-9 dark:bg-green-600 bg-amber-300 rounded-[18px] text-[15px] font-medium hover:bg-amber-400 dark:hover:bg-green-700 transition duration-200 ease-in-out">
            Rephrase
          </button>
        </div>
      </div>
      <div className="flex flex-col h-full text-sm font-light flex-[1] ml-4 bg-white dark:bg-neutral-900 px-4 py-[18px] rounded-[17px]">
        <textarea className="w-full flex-[1] pr-1 bg-transparent text-black dark:text-white leading-[30px] outline-none mb-2" />
        <div className="flex items-center justify-between text-black dark:text-white">
          <div className="flex items-center">
            <button className="w-10 h-[35px] flex items-center justify-center bg-zinc-100 dark:bg-neutral-800 rounded mr-[5px] hover:bg-zinc-300 dark:hover:bg-neutral-700">
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
            <button className="w-10 h-[35px] flex items-center justify-center bg-zinc-100 dark:bg-neutral-800 rounded mr-5 hover:bg-zinc-300 dark:hover:bg-neutral-700">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>

            <span>1/3 Sentences • 53 Words</span>
          </div>
          <div className="flex items-center">
            <button>
              <FontAwesomeIcon icon={faDownload} size="xl" />
            </button>
            <button className="ml-3">
              <FontAwesomeIcon icon={faCopy} size="xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
