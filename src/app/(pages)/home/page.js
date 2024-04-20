import Navbar from "@/app/_components/MainScreen/Navbar";
import LeftSideMenu from "@/app/_components/MainScreen/TheOption";
import TheBodyParaphraser from "@/app/_components/MainScreen/TheBodyParaphraser/TheBodyParaphraser";
import SubIntroduction from "./_components/subIntroduction";

export default function HomePage() {
  return (
    <div>
      <div className="py-6 w-full px-[22px]">
        <Navbar />
        <div
          className="flex
          flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row
          h-[95vh] items-start justify-between 
          mt-2 md:mt-2 lg:mt-6 xl:mt-6 2xl:mt-6"
        >
          <LeftSideMenu />
          <TheBodyParaphraser />
        </div>
      </div>
      <SubIntroduction />
    </div>
  );
}
