import Navbar from "@/app/_components/MainScreen/Navbar";
import ComparePath from "./_components/comparePath";
import LeftPart from "./_components/LeftPart/leftPart";

export default function UpgradePage() {
  return (
    <div className="px-[22px] py-6 flex flex-col items-center">
      <Navbar />
      <div
        className="flex w-full md:w-full lg:w-4/5 xl:w-4/5 2xl:w-4/5
        items-center md:items-center lg:items-start xl:items-start 2xl:items-start
        justify-center mt-10
        flex-col-reverse md:flex-col-reverse lg:flex-row xl:flex-row 2xl:flex-row"
      >
        <ComparePath />
        <LeftPart />
      </div>
    </div>
  );
}
