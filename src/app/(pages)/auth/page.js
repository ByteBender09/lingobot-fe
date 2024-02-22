"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Facebook from "@/app/_externals/assets/ic_facebook.png";
import Google from "@/app/_externals/assets/ic_google.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validate
    router.push("/");
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col px-20 py-14 bg-white rounded-lg">
        <h2 className="text-zinc-800 text-3xl font-bold mb-3">
          Log in to your ParaphraseMaster
        </h2>
        <p className="text-neutral-600 text-lg font-normal mr-12 mb-6">
          Choose one of the option to go
        </p>
        <input
          type="email"
          className="w-full bg-white px-4 py-3 mb-4 text-neutral-950 text-base font-medium rounded-[10px] border outline-none border-neutral-200"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="w-full relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full h-full bg-white px-4 py-3 text-neutral-950 text-base font-medium rounded-[10px] border outline-none border-neutral-200"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute h-full flex justify-center items-center right-3 top-0">
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className=""
              onClick={toggleShowPassword}
            />
          </div>
        </div>

        <button className="text-blue-600 mb-8 self-end">
          Forgot password?
        </button>
        <p className="text-neutral-600 text-base font-normal mb-7">
          Or continue with
        </p>
        <div className="flex w-full mb-10 justify-center">
          <div className="w-[131px] h-[67px] flex justify-center items-center bg-neutral-100 rounded mr-4">
            <Image src={Facebook} alt="Facebook icon" className="size-8" />
          </div>
          <div className="w-[131px] h-[67px] flex justify-center items-center bg-neutral-100 rounded ml-4">
            <Image src={Google} alt="Google icon" className="size-8" />
          </div>
        </div>
        <button
          className="w-2/3 py-3 bg-blue-600 rounded-lg text-white text-base font-normal self-center"
          onClick={handleSubmit}
        >
          Log In
        </button>
        <button className="text-blue-600 mt-4">Dont have an account?</button>
      </div>
    </div>
  );
}
