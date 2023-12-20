import TheHeading from "./_components/TheHeading";
import TheOption from "./_components/TheOption";
import BodyHeading from "./_components/TheBody/BodyHeading";
import BodyFooting from "./_components/TheBody/BodyFooting";
import BodyMiddle from "./_components/TheBody/BodyMiddle";

export default function MainScreen() {
  return (
    <div className="w-screen h-screen px-[22px] py-8 bg-sky-100 dark:bg-neutral-900">
      <TheHeading />
      <div className="flex h-[90%] items-start justify-between mt-6">
        <TheOption />
        <div
          className="flex-[4.7] h-full p-7 bg-gradient-to-r from-cyan-300 via-teal-300 to-teal-200 flex flex-col justify-between
        dark:bg-neutral-800 dark:from-transparent dark:to-transparent rounded-[30px]"
        >
          <BodyHeading />
          <BodyMiddle />
          <BodyFooting />
        </div>
      </div>
    </div>
  );
}
