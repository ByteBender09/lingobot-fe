"use client";

import { useState, useRef, useEffect } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GENDERS, APIPATH } from "@/app/const";
import { AlertNotify } from "../Others/alertNotify";
import useAxiosPrivate from "../../(pages)/hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import LoadingSpinner from "../Others/spinner";
import authRepository from "@/app/utils/auth";

export default function ModalUpdateUserInfor({ closeModal }) {
  const axiosPrivate = useAxiosPrivate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(GENDERS.MALE);
  const [checkFirstNameValid, setCheckFirstNameValid] = useState(false);
  const [checkLastNameValid, setCheckLastNameValid] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const FirstNameInput = useRef();
  const LastNameInput = useRef();

  const validateBeforeSubmit = () => {
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
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    validateBeforeSubmit();

    if (!checkFirstNameValid && !checkLastNameValid) {
      setLoading(true);
      const object = {
        first_name: firstName,
        last_name: lastName,
        gender: gender,
      };
      axiosPrivate
        .patch(APIPATH.UPDATE_PROFILE, object)
        .then((res) => {
          setLoading(false);
          authRepository.updateUserInfor(firstName + " " + lastName);
          Swal.fire({
            title: "Successfully Update",
            icon: "success",
            timer: 2000,
          });
          closeModal();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    axiosPrivate
      .get(APIPATH.GET_PROFILE)
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

  return (
    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-70 flex flex-col items-center justify-center">
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
        {!isLoading ? (
          <button
            className="w-[140px] h-10 self-center bg-sky-500 hover:bg-sky-600 rounded-[10px] text-white text-sm font-normal mt-9"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
