import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HiKey, HiMail, HiOutlineLogin } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { AiFillCreditCard } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { login, toastReset, setRole } from "../../store/slices/auth/authSlice";
import axios from "axios";
let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
let first = alphabets[Math.floor(Math.random() * alphabets.length)];
let second = Math.floor(Math.random() * 10);
let third = Math.floor(Math.random() * 10);
let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
let sixth = Math.floor(Math.random() * 10);
var captcha =
  first.toString() +
  second.toString() +
  third.toString() +
  fourth.toString() +
  fifth.toString() +
  sixth.toString();

export default function Signup() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [pan, setPan] = useState(false);
  const panNumber = useRef(null);
  const verify = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      url: "https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "601658785cmshef7fb52de4dea3ep1aa7e1jsn69d3aee4fc37",
        "X-RapidAPI-Host": "pan-card-verification1.p.rapidapi.com",
      },
      data: `{"task_id":"74f4c926-250c-43ca-9c53-453e87ceacd1","group_id":"8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e","data":{"id_number":"${panNumber.current.value}"}}`,
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setPan(true);
        toast.success("Pan number verified", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Pan number not valid", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  // var captcha = "";
  const { success, showToast, message, isAuthenticated, role } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const inputChangeHandler = (e) => {
    setUserInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const loginHandler = () => {
    if (userInput.captcha != captcha) {
      alert("Invalid Captcha!");
      return;
    }
    if (!userInput.email.includes("@")) {
      alert("Enter a valid email address!");
      return;
    }
    if (userInput.email.length === 0) {
      alert("Email field can't be empty!");
      return;
    }
    if (userInput.password.length === 0) {
      alert("Password field can't be empty!");
      return;
    }

    dispatch(login(userInput));
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setRole());
    }
    if (role === "SUPER_ADMIN") {
      window.location = "/admin/dashboard/";
    }
    if (role === "HR") {
      window.location = "/hr/dashboard/";
    }
    if (role === "INVENTORY") {
      window.location = "/inventory/dashboard/";
    }
    if (role === "FINANCE") {
      window.location = "/finance/dashboard/";
    }
    if (role === "EMPLOYEE") {
      window.location = "/employee/dashboard/";
    }
  }, [isAuthenticated, success, dispatch, role]);

  useEffect(() => {
    if (!success && showToast) {
      toast(message);
    }
    return () => dispatch(toastReset());
  }, [showToast, message, dispatch, success]);

  // if (isLoading) {
  // 	return <div className="text-2xl text-white">Loading...</div>
  // }
  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    <form className="max-w-sm bg-white px-8 py-7 rounded-2xl shadow-xl w-full">
      <h2 className="text-2xl mb-6 font-normal text-slate-500">
        Welcome to the Family
      </h2>
      <ToastContainer />
      <div className="relative w-full mb-3">
        <label
          className="flex items-center text-slate-500 text-xs font-semibold mb-2"
          htmlFor="grid-password"
        >
          <CgProfile className="mr-1" />
          Full name
        </label>
        <input
          value={userInput.name}
          onChange={inputChangeHandler}
          name="name"
          type="text"
          className="px-3 py-3 placeholder-blueGray-300 text-slate-700 bg-gray-50 placeholder:text-slate-400 rounded-xl text-sm border borderColor  focus:outline-none  w-full ease-linear transition-all duration-150"
          placeholder="Enter your name..."
          required
        />
      </div>
      <div className="relative w-full mb-3">
        <label
          className="flex items-center text-slate-500 text-xs font-semibold mb-2"
          htmlFor="grid-password"
        >
          <HiMail className="mr-1" />
          Email
        </label>
        <input
          value={userInput.email}
          onChange={inputChangeHandler}
          name="email"
          type="email"
          className="px-3 py-3 placeholder-blueGray-300 text-slate-700 bg-gray-50 placeholder:text-slate-400 rounded-xl text-sm border borderColor  focus:outline-none  w-full ease-linear transition-all duration-150"
          placeholder="Enter your email address..."
          required
        />
      </div>

      <div className="relative w-full mb-3">
        <label
          className="flex items-center text-slate-500 text-xs font-semibold mb-2"
          htmlFor="grid-password"
        >
          <HiKey className="mr-1" />
          Password
        </label>
        <input
          value={userInput.password}
          onChange={inputChangeHandler}
          name="password"
          type="password"
          className="px-3 py-3 placeholder-blueGray-300 text-slate-700 placeholder:text-slate-400 bg-gray-50  border borderColor rounded-xl text-sm  focus:outline-none w-full ease-linear transition-all duration-150"
          placeholder="Enter password..."
          required
        />
      </div>
      <div className="flex">
        <div className="relative w-full mb-3">
          <label
            className="flex items-center text-slate-500 text-xs font-semibold mb-2"
            htmlFor="grid-password"
          >
            <AiFillCreditCard className="mr-1" />
            Pan Number
          </label>
          <input
            ref={panNumber}
            type="text"
            className="px-3 py-3 placeholder-blueGray-300 text-slate-700 bg-gray-50 placeholder:text-slate-400 rounded-xl text-sm border borderColor  focus:outline-none  w-full ease-linear transition-all duration-150"
            placeholder="Enter your pancard number..."
            required
          />
        </div>

        <div className="text-center mt-6">
          <button
            className="bg-purple-600 hover:bg-purple-700 flex justify-end text-white active:bg-blueGray-600 text-xl font-base px-6 py-3 rounded-xl shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
            onClick={verify}
          >
            {/* <HiOutlineLogin className="mr-2 h-6 w-6" /> */}
            <TiTick />
          </button>
        </div>
      </div>
      <div className="text-center mt-6">
        {pan == true ?
          <button
            className="bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-white active:bg-blueGray-600 text-lg font-base px-6 py-2 rounded-xl shadow outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            type="submit"
            onClick={loginHandler}
          >
            <HiOutlineLogin className="mr-2 h-6 w-6" />
            Sign Up
          </button>
          :
          <button
           disabled
            className="bg-slate-300 flex items-center justify-center text-white active:bg-blueGray-600 text-lg font-base px-6 py-2 rounded-xl shadow outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          >
            <HiOutlineLogin className="mr-2 h-6 w-6" />
            Sign Up
          </button>


        }

      </div>
    </form >
  );
}
