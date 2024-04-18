import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPauseCircle, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export function SubExplain1() {
  return (
    <>
      <div className="w-full h-[0.5px] border border-zinc-300 my-2"></div>
      <div className="w-full">
        <div className="flex w-full p-2 mb-3">
          <FontAwesomeIcon icon={faThumbsUp} className="mr-3 dark:text-white" />
          <div className="flex flex-col w-full">
            <h3 className="mb-2 text-black dark:text-white text-sm font-medium">
              100% money-back guarantee
            </h3>
            <span className="text-zinc-600 dark:text-white text-sm font-normal">
              Try Premium for 3 days. If you re not happy, we will give you a
              full refund.
            </span>
          </div>
        </div>
        <div className="flex p-2">
          <FontAwesomeIcon
            icon={faPauseCircle}
            className="mr-3 dark:text-white"
          />
          <div className="flex flex-col">
            <h3 className="mb-2 text-black dark:text-white text-sm font-medium">
              Pause your subscription
            </h3>
            <span className="text-zinc-600 dark:text-white text-sm font-normal">
              Taking a break? Your subscription pauses when you do.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
