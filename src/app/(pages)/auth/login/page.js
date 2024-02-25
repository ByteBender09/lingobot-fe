"use client";

import {
  faEye,
  faEyeSlash,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosClient } from "../../api/axios";
import Image from "next/image";
import Facebook from "@/app/_externals/assets/ic_facebook.png";
import Google from "@/app/_externals/assets/ic_google.png";
import auth from "@/app/utils/auth";
import Swal from "sweetalert2";
import Link from "next/link";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkEmailValid, setCheckEmailValid] = useState(false);
  const [checkPasswordValid, setCheckPasswordValid] = useState(false);
  const [checkLogIn, setCheckLogIn] = useState(false);

  const EmailInput = useRef();
  const PasswordInput = useRef();

  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckLogIn(false);

    if (email.length == 0 || !validateEmail(email)) {
      setCheckEmailValid(true);
      EmailInput.current.focus();
      return;
    } else {
      setCheckEmailValid(false);
    }

    if (password.length == 0) {
      setCheckPasswordValid(true);
      PasswordInput.current.focus();
      return;
    } else {
      setCheckPasswordValid(false);
    }

    if (!checkEmailValid && !checkPasswordValid) {
      const object = {
        email: email,
        password: password,
      };
      axiosClient
        .post("/auth/login/", object)
        .then((res) => {
          setCheckLogIn(false);
          auth.login(res);
          Swal.fire({
            title: "Successfully Login",
            icon: "success",
          });
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          setCheckLogIn(true);
          EmailInput.current.focus();
        });
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col px-16 py-14 bg-white rounded-lg min-w-[38%]">
        <h2 className="text-zinc-800 text-3xl font-bold mb-3">
          Log in to your LingoBot
        </h2>
        <p className="text-neutral-600 text-lg font-normal mr-12 mb-6">
          Choose one of the option to go
        </p>
        <input
          type="email"
          className="w-full bg-white px-4 py-3 mb-3 text-neutral-950 text-base font-normal rounded-[10px] border outline-none border-neutral-200"
          placeholder="Enter your email"
          value={email}
          ref={EmailInput}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>
          {checkEmailValid ? AlertNotify("Email is not valid") : ""}
          {checkLogIn ? AlertNotify("Email or password is wrong") : ""}
        </span>
        <div className="w-full relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full h-full bg-white px-4 py-3 text-neutral-950 text-base font-normal rounded-[10px] border outline-none border-neutral-200"
            placeholder="Enter your password"
            value={password}
            ref={PasswordInput}
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
        <span>
          {checkPasswordValid ? AlertNotify("Password is not valid") : ""}
        </span>

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
        <Link className="text-blue-600 mt-4 self-center" href="/auth/register">
          Dont have an account? Register
        </Link>
      </div>
    </div>
  );
}

const AlertNotify = (title) => {
  return (
    <div className="text-sm font-light text-red-600 mb-3">
      <FontAwesomeIcon
        icon={faExclamationCircle}
        style={{ paddingRight: "4px" }}
      />
      {title}
    </div>
  );
};
