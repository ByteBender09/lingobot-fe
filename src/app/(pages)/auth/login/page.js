"use client";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertNotify } from "@/app/_components/Others/alertNotify";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosClient } from "../../../_api/axios";
import { PATH, APIPATH } from "@/app/const";
import validateEmail from "@/app/utils/validate";
import Image from "next/image";
import Facebook from "@/app/_externals/assets/ic_facebook.png";
import Google from "@/app/_externals/assets/ic_google.png";
import authRepository from "@/app/utils/auth";
import Swal from "sweetalert2";
import Link from "next/link";
import LoadingSpinner from "@/app/_components/Others/spinner";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkEmailValid, setCheckEmailValid] = useState(false);
  const [checkPasswordValid, setCheckPasswordValid] = useState(false);
  const [checkLogIn, setCheckLogIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const emailInput = useRef();
  const passwordInput = useRef();

  const router = useRouter();
  const goHome = () => router.push(PATH.HOME);

  //Set Visible Password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitLogIn = (e) => {
    e.preventDefault();
    setCheckLogIn(false);

    if (email.length == 0 || !validateEmail(email)) {
      setCheckEmailValid(true);
      emailInput.current.focus();
      return;
    } else {
      setCheckEmailValid(false);
    }

    if (password.length == 0) {
      setCheckPasswordValid(true);
      passwordInput.current.focus();
      return;
    } else {
      setCheckPasswordValid(false);
    }

    if (!checkEmailValid && !checkPasswordValid) {
      setLoading(true);
      const object = {
        email: email,
        password: password,
      };
      axiosClient
        .post(APIPATH.LOGIN, object)
        .then((res) => {
          setCheckLogIn(false);
          authRepository.login(res);
          setLoading(false);
          Swal.fire({
            title: "Successfully Login",
            icon: "success",
          });
          goHome();
        })
        .catch((err) => {
          console.log(err);
          setCheckLogIn(true);
          setLoading(false);
          emailInput.current.focus();
        });
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col px-16 py-14 bg-white rounded-lg min-w-[38%]">
        <h2 className="text-zinc-800 text-2xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-bold mb-3">
          Log in to your LingoBot
        </h2>
        <p className="text-neutral-600 text-base md:text-base lg:text-lg xl:text-lg 2xl:text-lg font-normal mr-12 mb-6">
          Choose one of the option to go
        </p>
        <input
          type="email"
          className="w-full bg-white px-4 py-3 mb-3 text-neutral-950 text-base font-normal rounded-[10px] border outline-none border-neutral-200"
          placeholder="Enter your email"
          value={email}
          ref={emailInput}
          onChange={(e) => setEmail(e.target.value)}
        />
        {checkEmailValid ? AlertNotify("Email is not valid") : ""}
        {checkLogIn ? AlertNotify("Email or password is wrong") : ""}
        <div className="w-full relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full h-full bg-white px-4 py-3 text-neutral-950 text-base font-normal rounded-[10px] border outline-none border-neutral-200"
            placeholder="Enter your password"
            value={password}
            ref={passwordInput}
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
        {checkPasswordValid ? AlertNotify("Password is not valid") : ""}

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
        {!isLoading ? (
          <button
            className="w-2/3 py-3 bg-blue-600 rounded-lg text-white text-base font-normal self-center"
            onClick={handleSubmitLogIn}
          >
            Log In
          </button>
        ) : (
          <LoadingSpinner />
        )}
        <Link className="text-blue-600 mt-4 self-center" href="/auth/register">
          Dont have an account? Register
        </Link>
      </div>
    </div>
  );
}
