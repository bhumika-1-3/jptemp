import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { HiKey, HiMail, HiOutlineLogin } from "react-icons/hi"
import { GiRecycle } from "react-icons/gi"
import { ToastContainer, toast } from "react-toastify"
import { CgProfile } from "react-icons/cg"
import { AiOutlineBook } from "react-icons/ai"
import "react-toastify/dist/ReactToastify.css"
import { login, toastReset, setRole } from "../../store/slices/auth/authSlice"
import Drop from "./Drop"
let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
let first = alphabets[Math.floor(Math.random() * alphabets.length)];
let second = Math.floor(Math.random() * 10);
let third = Math.floor(Math.random() * 10);
let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
let sixth = Math.floor(Math.random() * 10);
var captcha = first.toString() + second.toString() + third.toString() + fourth.toString() + fifth.toString() + sixth.toString();


export default function Profile() {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        password: "",
    })
    // var captcha = "";
    const { success, showToast, message, isAuthenticated, role } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch()
    const inputChangeHandler = (e) => {
        setUserInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    const loginHandler = () => {
        if (userInput.captcha != captcha) {
            alert("Invalid Captcha!")
            return
        }
        if (!userInput.email.includes("@")) {
            alert("Enter a valid email address!")
            return
        }
        if (userInput.email.length === 0) {
            alert("Email field can't be empty!")
            return
        }
        if (userInput.password.length === 0) {
            alert("Password field can't be empty!")
            return
        }

        dispatch(login(userInput))
    }

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(setRole())
        }
        if (role === "SUPER_ADMIN") {
            window.location = "/admin/dashboard/"
        }
        if (role === "HR") {
            window.location = "/hr/dashboard/"
        }
        if (role === "INVENTORY") {
            window.location = "/inventory/dashboard/"
        }
        if (role === "FINANCE") {
            window.location = "/finance/dashboard/"
        }
        if (role === "EMPLOYEE") {
            window.location = "/employee/dashboard/"
        }
    }, [isAuthenticated, success, dispatch, role])

    useEffect(() => {

        if (!success && showToast) {
            toast(message)
        }
        return () => dispatch(toastReset())
    }, [showToast, message, dispatch, success])

    // if (isLoading) {
    // 	return <div className="text-2xl text-white">Loading...</div>
    // }
    const [file, setFile] = useState()

    function handleChange(event) {
        setFile(event.target.files[0])
    }


    return (
        <center>

            <form className="max-w-sm m-10 al bg-white px-8 py-7 rounded-2xl shadow-xl w-full">
                <h2 className="text-2xl mb-6 font-normal text-slate-500">
                    Profile Update
                </h2>
                <ToastContainer />
                <Drop />
                <br/>
                <br/>
                <br/>
                <div className="relative w-full mb-3">
                    <label
                        className="flex items-center text-slate-500 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                    >
                        <AiOutlineBook className="mr-1" />
                        Resume
                    </label>
                    <input
                        onChange={handleChange}
                        name="file"
                        type="file"
                        className="px-3 py-3 placeholder-blueGray-300 text-slate-700 placeholder:text-slate-400 bg-gray-50  border borderColor rounded-xl text-sm  focus:outline-none w-full ease-linear transition-all duration-150"
                        placeholder="Enter password..."
                        required
                    />
                </div>
                <div className="text-center mt-6">
                    <button
                        className="bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-white active:bg-blueGray-600 text-lg font-base px-6 py-2 rounded-xl shadow outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                        onClick={loginHandler}
                    >
                        <HiOutlineLogin className="mr-2 h-6 w-6" />
                        Profile Complete
                    </button>
                </div>

            </form>
        </center>

    )
}
