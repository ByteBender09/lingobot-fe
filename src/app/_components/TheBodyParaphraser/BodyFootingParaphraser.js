import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faChartSimple,
  faKeyboard,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function BodyFootingParaphraser() {
  return (
    <div className="flex justify-between items-start mt-5">
      <div className="px-4 py-3 flex items-center bg-cyan-100 dark:bg-gray-200 rounded-[14px] text-black ">
        <button className="mr-4">
          <FontAwesomeIcon icon={faGear} />
        </button>
        <button className="mr-4">
          <FontAwesomeIcon icon={faChartSimple} />
        </button>
        <button className="mr-4">
          <FontAwesomeIcon icon={faKeyboard} />
        </button>
        <button>
          <FontAwesomeIcon icon={faClockRotateLeft} />
        </button>
      </div>
      <div className="flex px-5 py-3 bg-white dark:bg-neutral-900 rounded-[14px] text-black dark:text-white text-[14px] font-normal">
        <div className="flex items-center mr-5">
          <div className="w-2.5 h-2.5 bg-amber-600 rounded-full mr-[10px]" />
          <span>Changed Words</span>
        </div>
        <div className="flex items-center mr-5">
          <div className="w-2.5 h-0.5 bg-amber-300 mr-[10px]" />
          <span>Structural Changes</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 bg-sky-700 rounded-full mr-[10px]" />
          <span>Longest Unchanged Words</span>
        </div>
      </div>
    </div>
  );
}
