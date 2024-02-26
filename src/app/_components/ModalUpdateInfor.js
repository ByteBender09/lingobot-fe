"use client";

import { useState, useRef, useEffect } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../(pages)/hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const GENDERS = {
  MALE: "male",
  FEMALE: "female",
};

export default function ModalUpdateInfor({ closeModal }) {
  const axiosPrivate = useAxiosPrivate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(GENDERS.MALE);
  const [checkFirstNameValid, setCheckFirstNameValid] = useState(false);
  const [checkLastNameValid, setCheckLastNameValid] = useState(false);

  const FirstNameInput = useRef();
  const LastNameInput = useRef();

  useEffect(() => {
    axiosPrivate
      .get("/auth/profile/")
      .then((res) => {
        setFirstName(res.data?.data?.first_name);
        setLastName(res.data?.data?.last_name);
        setGender(res.data?.data?.gender);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

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

    if (!checkFirstNameValid && !checkLastNameValid) {
      const object = {
        first_name: firstName,
        last_name: lastName,
        gender: gender,
      };
      axiosPrivate
        .patch("/auth/update/", object)
        .then(() => {
          Swal.fire({
            title: "Successfully Update",
            icon: "success",
            timer: 2000,
          });
          closeModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="w-screen h-screen bg-black bg-opacity-60 flex items-center justify-center absolute top-0 left-0">
      <div
        className="flex flex-col 
      px-4 md:px-4 lg:px-10 xl:px-10 2xl:px-10
       py-9 bg-white rounded-[20px] min-w-[40%] relative"
      >
        <button className="absolute top-10 right-10" onClick={closeModal}>
          <FontAwesomeIcon icon={faClose} size="1x" />
        </button>
        <h3 className="text-black text-xl font-medium mb-9 self-center">
          Update Information
        </h3>
        <div className="flex justify-between items-start">
          <div className="flex flex-col justify-start mr-[1%]">
            <span className="text-neutral-600 text-base font-normal mb-2">
              First Name
            </span>
            <input
              type="text"
              className="w-full bg-white px-4 py-2 mb-2 text-neutral-950 text-base font-normal rounded-[10px] border outline-none border-neutral-200"
              value={firstName}
              ref={FirstNameInput}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <span>
              {checkFirstNameValid
                ? AlertNotify("First name mustn't be empty")
                : ""}
            </span>
          </div>
          <div className="flex flex-col ml-[1%]">
            <span className="text-neutral-600 text-base font-normal mb-2">
              Last Name
            </span>
            <input
              type="text"
              className="w-full bg-white px-4 py-2 mb-2 text-neutral-950 text-base font-normal rounded-[10px] border outline-none border-neutral-200"
              value={lastName}
              ref={LastNameInput}
              onChange={(e) => setLastName(e.target.value)}
            />
            <span>
              {checkLastNameValid
                ? AlertNotify("Last name mustn't be empty")
                : ""}
            </span>
          </div>
        </div>
        <h3 className="text-neutral-600 text-base font-normal mt-7">Gender</h3>
        <div className="flex w-full justify-around items-center">
          <div className="flex items-center">
            <input
              type="radio"
              name="gender"
              id="genderMale"
              value={GENDERS.MALE}
              checked={gender === GENDERS.MALE}
              onChange={() => setGender(GENDERS.MALE)}
            />
            <label
              htmlFor="genderMale"
              className="text-black text-base font-normal ml-4"
            >
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="gender"
              id="genderFemale"
              value={GENDERS.FEMALE}
              checked={gender === GENDERS.FEMALE}
              onChange={() => setGender(GENDERS.FEMALE)}
            />
            <label
              htmlFor="genderFemale"
              className="text-black text-base font-normal ml-4"
            >
              Female
            </label>
          </div>
        </div>
        <button
          className="w-[140px] h-10 self-center bg-sky-500 hover:bg-sky-600 rounded-[10px] text-white text-sm font-normal mt-9"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
}

const AlertNotify = (title) => {
  return <span className="text-sm font-light text-red-600 mb-3">{title}</span>;
};
