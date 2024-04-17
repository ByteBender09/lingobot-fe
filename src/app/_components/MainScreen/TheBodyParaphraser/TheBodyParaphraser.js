import BodyHeadingParaphraser from "./BodyHeadingParaphaser";
import BodyMiddleParaphraser from "./BodyMiddle/BodyMiddleParaphraser";
import BodyFootingParaphraser from "./BodyFootingParaphraser";

export default function TheBodyParaphraser() {
  return (
    <div
      className="flex-[4.7] w-full h-full 
      p-2 md:p-2 lg:p-7 xl:p-7 2xl:p-7
       bg-gradient-to-r from-cyan-300 via-teal-300 to-teal-200 flex flex-col justify-between
        dark:bg-neutral-800 dark:from-transparent dark:to-transparent rounded-[30px]"
    >
      <BodyHeadingParaphraser />
      <BodyMiddleParaphraser />
      <BodyFootingParaphraser />
    </div>
  );
}
