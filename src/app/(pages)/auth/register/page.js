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
import Swal from "sweetalert2";
import Link from "next/link";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

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

  const EmailInput = useRef();
  const PasswordInput = useRef();
  const FirstNameInput = useRef();
  const LastNameInput = useRef();

  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckRegister(false);

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

    if (firstName.length == 0) {
      setCheckFirstNameValid(true);
      FirstNameInput.current.focus();
      return;
    } else {
      setCheckFirstNameValid(false);
    }

    if (lastName.length == 0) {
      setCheckLastNameValid(true);
      LastNameInput.current.focus();
      return;
    } else {
      setCheckLastNameValid(false);
    }

    if (
      !checkEmailValid &&
      !checkPasswordValid &&
      !checkFirstNameValid &&
      !checkLastNameValid
    ) {
      const object = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        gender: "male",
      };
      axiosClient
        .post("/auth/register/", object)
        .then(() => {
          setCheckRegister(false);
          Swal.fire({
            title: "Successfully Register",
            icon: "success",
          });
          router.push("/auth/login");
        })
        .catch((err) => {
          console.log(err);
          setCheckRegister(true);
          EmailInput.current.focus();
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
          ref={EmailInput}
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
        <input
          type="text"
          className="w-full h-full bg-white mb-3 px-4 py-3 text-neutral-950 text-base font-normal rounded-[10px] border outline-none border-neutral-200"
          placeholder="Enter your first name"
          value={firstName}
          ref={FirstNameInput}
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
          ref={LastNameInput}
          onChange={(e) => setLastName(e.target.value)}
        />
        <span>
          {checkLastNameValid ? AlertNotify("Last name mustn't be empty") : ""}
        </span>
        <button
          className="w-2/3 py-3 bg-blue-600 rounded-lg text-white text-base font-normal self-center mt-7"
          onClick={handleSubmit}
        >
          Register
        </button>
        <Link className="text-blue-600 mt-4 self-center" href="/auth/login">
          Already have an account? Log In
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
