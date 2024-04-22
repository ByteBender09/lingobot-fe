"use client";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosClient } from "../../../_api/axios";
import { AlertNotify } from "@/app/_components/Others/alertNotify";
import { PATH, APIPATH } from "@/app/const";
import validateEmail from "@/app/utils/validate";
import Swal from "sweetalert2";
import Link from "next/link";
import LoadingSpinner from "@/app/_components/Others/spinner";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkEmailValid, setCheckEmailValid] = useState(false);
  const [checkFirstNameValid, setCheckFirstNameValid] = useState(false);
  const [checkLastNameValid, setCheckLastNameValid] = useState(false);
  const [checkPasswordValid, setCheckPasswordValid] = useState(false);
  const [checkRegister, setCheckRegister] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const emailInput = useRef();
  const passwordInput = useRef();
  const firstNameInput = useRef();
  const lastNameInput = useRef();

  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateBeforeSubmit = () => {
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

    if (firstName.length == 0) {
      setCheckFirstNameValid(true);
      firstNameInput.current.focus();
      return;
    } else {
      setCheckFirstNameValid(false);
    }

    if (lastName.length == 0) {
      setCheckLastNameValid(true);
      lastNameInput.current.focus();
      return;
    } else {
      setCheckLastNameValid(false);
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    setCheckRegister(false);

    validateBeforeSubmit();

    if (
      !checkEmailValid &&
      !checkPasswordValid &&
      !checkFirstNameValid &&
      !checkLastNameValid
    ) {
      setLoading(true);
      const object = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        gender: "male",
      };
      axiosClient
        .post(APIPATH.REGISTER, object)
        .then(() => {
          setCheckRegister(false);
          setLoading(false);
          Swal.fire({
            title: "Successfully Register",
            icon: "success",
          });
          router.push(PATH.LOGIN);
        })
        .catch((err) => {
          console.log(err);
          setCheckRegister(true);
          setLoading(false);
          emailInput.current.focus();
        });
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col px-16 py-14 bg-white rounded-lg min-w-[38%]">
        <h2 className="text-zinc-800 text-3xl font-bold mb-5">
          Create your account
        </h2>
        <input
          type="email"
          className="w-full bg-white px-4 py-3 mb-3 text-neutral-950 text-base font-normal rounded-[10px] border outline-none border-neutral-200"
          placeholder="Enter your email"
          value={email}
          ref={emailInput}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>
          {checkEmailValid ? AlertNotify("Email is not valid") : ""}
          {checkRegister
            ? AlertNotify("User with this email already exists.")
            : ""}
        </span>
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
        <span>
          {checkPasswordValid ? AlertNotify("Password is not valid") : ""}
        </span>
        <input
          type="text"
          className="w-full h-full bg-white mb-3 px-4 py-3 text-neutral-950 text-base font-normal rounded-[10px] border outline-none border-neutral-200"
          placeholder="Enter your first name"
          value={firstName}
          ref={firstNameInput}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <span>
          {checkFirstNameValid
            ? AlertNotify("First name mustn't be empty")
            : ""}
        </span>
        <input
          type="text"
          className="w-full h-full bg-white mb-3 px-4 py-3 text-neutral-950 text-base font-normal rounded-[10px] border outline-none border-neutral-200"
          placeholder="Enter your last name"
          value={lastName}
          ref={lastNameInput}
          onChange={(e) => setLastName(e.target.value)}
        />
        <span>
          {checkLastNameValid ? AlertNotify("Last name mustn't be empty") : ""}
        </span>
        {!isLoading ? (
          <button
            className="w-2/3 py-3 bg-blue-600 rounded-lg text-white text-base font-normal self-center mt-7"
            onClick={handleSubmitRegister}
          >
            Register
          </button>
        ) : (
          <LoadingSpinner />
        )}
        <Link className="text-blue-600 mt-4 self-center" href="/auth/login">
          Already have an account? Log In
        </Link>
      </div>
    </div>
  );
}
