import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function BodyMiddleSummarizer() {
  return (
    <div className="flex flex-[1] justify-between items-start mt-5">
      <div className="flex flex-col h-full flex-[1] mr-4 text-base font-light bg-white dark:bg-neutral-900 px-4 pt-[18px] pb-4 rounded-[17px]">
        <textarea
          className="w-full flex-[1] pr-1 bg-transparent text-black dark:text-white leading-[30px] outline-none mb-2"
          placeholder="Enter or paste your text and press 'Summarize'"
        />
        <div className="flex items-center justify-between text-black dark:text-white">
          <div className="flex items-center ">
            <button>
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                size="xl"
                className="mr-3"
              />
              <span className="text-[15px] font-light">Upload Doc</span>
            </button>
          </div>
          <button className="py-[10px] px-9 dark:bg-green-600 bg-amber-300 rounded-[18px] text-[15px] font-medium hover:bg-amber-400 dark:hover:bg-green-700 transition duration-200 ease-in-out">
            Summarize
          </button>
        </div>
      </div>
      <div className="flex flex-col h-full text-sm font-light flex-[1] ml-4 bg-white dark:bg-neutral-900 px-4 py-[18px] rounded-[17px]">
        <textarea className="w-full flex-[1] pr-1 bg-transparent text-black dark:text-white leading-[30px] outline-none mb-2" />
        <div className="flex items-center justify-between text-black dark:text-white">
          <span>0 Sentences • 0 Words</span>
        </div>
      </div>
    </div>
  );
}
