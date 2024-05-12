import VideoDemo from "@/app/_externals/assets/gif_video_syno.gif";
import Image from "next/image";

export default function SubIntroduction() {
  return (
    <div className="w-ful flex flex-col items-center py-12 bg-white dark:bg-neutral-900 mt-15">
      <h3 className="text-center text-black dark:text-white text-[22px] font-normal mb-12">
        LingoBot&apos;s AI-powered paraphrasing tool will enhance your writing
      </h3>
      <span
        className="text-center text-black dark:text-white text-[15px] font-normal
      w-full md:w-5/6 lg:w-2/3 xl:w-2/3 2xl:w-2/3 px-[2%]"
      >
        Your words matter, and our paraphrasing tool is designed to ensure you
        use the right ones. With unlimited Custom modes and 8 predefined modes,
        Paraphraser lets you rephrase text countless ways. Our product will
        improve your fluency while also ensuring you have the appropriate
        vocabulary, tone, and style for any occasion. Simply enter your text
        into the input box, and our AI will work with you to create the best
        paraphrase.
      </span>
      <h3 className="text-black dark:text-white text-[21px] font-normal mb-3 mt-[80px]">
        Why use LingoBot’s Paraphrasing Tool?
      </h3>
      <span className="text-black dark:text-white text-[15px] font-normal">
        Our Paraphraser has unique features
      </span>
      <div
        className="mt-14 flex items-center justify-center px-[2%]
      flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row"
      >
        <div
          className="flex-[1] flex items-center justify-center
        mb-8 md:mb-8 lg:mb-0 xl:mb-0 2xl:mb-0"
        >
          <Image
            src={VideoDemo}
            alt="Video Demo"
            className="self-center w-2/3 rounded-[15px]"
            style={{ boxShadow: "rgba(49, 49, 49, 0.36) 1px 1px 30px" }}
          />
        </div>
        <div
          className="flex flex-col flex-[1] 
        items-center md:items-center lg:items-start xl:items-start 2xl:items-start"
        >
          <h3 className="text-sky-600 text-base font-semibold mb-5">
            CUSTOMIZATION
          </h3>
          <span className="text-black dark:text-white text-[22px] font-normal mb-5">
            Decide how much vocabulary change you want
          </span>
          <span
            className="text-black dark:text-white text-[15px] font-normal 
          w-full md:w-5/6 lg:w-2/3 xl:w-2/3 2xl:w-2/3"
          >
            Use the Synonym Slider to change more (or less) of your writing.
            Moving the slider to the left will give you a more accurate rephrase
            with fewer changes; moving it to the right means you’ll get a more
            creative output with more changes.
          </span>
        </div>
      </div>
    </div>
  );
}
