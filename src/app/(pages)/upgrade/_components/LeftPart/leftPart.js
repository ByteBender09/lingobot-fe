"use client";

import { memo } from "react";
import { SubExplain1 } from "./subExplains";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import OptionItem from "../payOptionItem";
import useAxios from "@/app/_hooks/useAxios";
import useAxiosPrivate from "@/app/_hooks/useAxiosPrivate";

const LeftPart = () => {
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const [dataSubscribtionPlans, ,] = useAxios(
    "get",
    "/payment/subscription-plan/plan/",
    {},
    {},
    []
  );

  const handleOptionSelect = (option) => {
    axiosPrivate
      .post("/payment/create-checkout-session/", {
        subscription_plan_id: option.id,
        quantity: 1,
      })
      .then((res) => {
        router.push(res.data.data.url);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "You are in premium mode!",
          icon: "error",
          timer: 4000,
        });
      });
  };
  return (
    <div
      className="flex flex-[1] flex-col items-center 
    ml-0 md:ml-0 lg:ml-12 xl:ml-12 2xl:ml-12
    mb-8 md:mb-8 lg:mb-0 xl:mb-0 2xl:mb-0"
    >
      <>
        <h2 className="text-black dark:text-white text-[26px] font-normal mb-5">
          Select your plan
        </h2>
        <div className="w-full">
          {dataSubscribtionPlans?.data?.PREMIUM.map((item, index) => (
            <OptionItem
              key={index}
              id={item.id}
              firstChild={index === 0}
              title={item.display_name}
              pricePerTime={item.price_per_plan}
              duration={item.duration}
              onSelect={handleOptionSelect}
            />
          ))}
        </div>
        <SubExplain1 />
      </>
    </div>
  );
};

export default memo(LeftPart);
