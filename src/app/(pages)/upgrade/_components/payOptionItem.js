export default function OptionItem({
  firstChild = false,
  id,
  title,
  pricePerTime,
  duration,
  onSelect,
}) {
  const handleItemClick = () => {
    onSelect({
      id,
      title,
      pricePerTime,
      duration,
    });
  };

  return (
    <div
      className={`flex w-full justify-between border py-4
      ${firstChild ? "border-blue-700" : "border-blue-300"}
      bg-white dark:bg-neutral-900 hover:bg-neutral-100 hover:dark:bg-gray-800
      cursor-pointer px-6 rounded-[38px] mb-5`}
    >
      <div
        className="flex items-center justify-center w-1/5
        px-2 md:px-2 lg:px-6 xl:px-6 2xl:px-6
        border-r border-neutral-200 text-center text-black dark:text-white text-sm font-normal"
      >
        {title}
      </div>
      <div
        className="flex flex-col items-start justify-center 
        px-4 md:px-4 lg:px-10 xl:px-10 2xl:px-10"
      >
        <span className="text-black dark:text-white text-xs font-normal mb-1">
          <strong className="text-sm font-medium">${pricePerTime} </strong>
          USD per{" "}
          {duration == 1 ? `${duration} per month` : `with ${duration} months`}
        </span>
      </div>
      <div
        className="flex items-center justify-end 
        px-0 md:px-0 lg:px-3 xl:px-3 2xl:px-3"
      >
        <button
          className={`py-2 px-5 border border-sky-600
        ${
          firstChild
            ? "text-white bg-sky-600 hover:bg-sky-700"
            : "text-sky-600  bg-transparent hover:bg-sky-600 hover:text-white"
        }
        rounded-[18px]`}
          onClick={handleItemClick}
        >
          Select
        </button>
      </div>
    </div>
  );
}
