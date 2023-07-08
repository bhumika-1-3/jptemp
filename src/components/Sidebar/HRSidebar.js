/*eslint-disable*/
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { FaUserTie } from "react-icons/fa"
import {
	HiViewGrid,
	HiMenuAlt2,
	HiViewBoards,
	HiCurrencyRupee,
	HiSearch,
} from "react-icons/hi"

// import NotificationDropdown from "../Dropdowns/NotificationDropdown"
// import UserDropdown from "../Dropdowns/UserDropdown"
import { ThemeToggle } from ".."
import UserNavCard from "../Cards/UserNavCard"
import { employeeProfile } from "../../store/slices/employee/employeeSlice"
import { logout } from "../../store/slices/auth/authSlice"

import RenderIf from "../RenderIf/RenderIf"

export default function Sidebar() {
	const [collapseShow, setCollapseShow] = useState(false)

	// const { isAdmin } = useSelector((state) => state.auth)
	const { currentTheme, colors } = useSelector((state) => state.theme)
	const { profile } = useSelector((state) => state.employee)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const logoutHandler = () => {
		dispatch(logout())
		navigate("/auth/login")
	}

	const activeLink = `items-center text-sm capitalize py-2 px-2 my-1 font-semibold flex ${
		currentTheme ? colors.text[currentTheme].dark : "text-purple-700"
	}  ${
		currentTheme ? colors.bg[currentTheme].medium : "bg-purple-300"
	} dark:bg-purple-900 dark:text-slate-200 rounded-md duration-300`
	const inActiveLink = `items-center text-sm capitalize py-2 px-2 my-1 font-semibold flex text-slate-700 dark:text-slate-300 ${
		currentTheme ? colors.bg[currentTheme].hover : "hover:bg-purple-300"
	} dark:hover:bg-purple-900  hover:rounded-md duration-300`

	// isAdmin = false;
	useEffect(() => {
		if (!isAdmin) {
			dispatch(employeeProfile())
		}
	}, [dispatch, isAdmin])

	return (
		<>
			<nav
				className={`md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden  dark:bg-transparent flex flex-wrap items-center justify-between md:w-64 md:py-2 pt-4 pb-4 px-3 md:px-4 border-r borderColor border-b borderColor ${
					currentTheme ? colors.bg[currentTheme].light : "bg-gray-100"
				}`}
			>
				<div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
					{/* Brand */}
					<Link
						className="md:mt-4 md:ml-3 md:block inline-block text-left text-purple_1 dark:border-purple-700 dark:text-slate-200 ml-2  mr-0 whitespace-nowrap text-lg font-semibold"
						to="/hr/dashboard/"
					>
						ERP
					</Link>

					{/* Toggler */}
					<button
						className="cursor-pointer md:hidden bg-transparent border-none"
						type="button"
						onClick={() => setCollapseShow(true)}
					>
						<HiMenuAlt2 className="text-slate-700 w-7 h-7 dark:text-slate-100 " />
					</button>
					{/* User */}
					{/* <ul className="md:hidden items-center flex flex-wrap list-none">
						<li className="inline-block relative">
							<NotificationDropdown />
						</li>
						<li className="inline-block relative">
							<UserDropdown />
						</li>
					</ul> */}
					{/* Collapse */}
					{collapseShow && (
						<div
							onClick={() => setCollapseShow(false)}
							className="fixed top-0 left-0 w-full h-full bg-black z-20 opacity-40 duration-500"
						></div>
					)}
					<div
						className={`flex flex-col items-stretch md:opacity-100 md:relative md:left-0 md:mt-4 md:shadow-none z-40 overflow-y-auto overflow-x-hidden md:h-auto  flex-1 md:bg-transparent md:dark:bg-none dark:customPurpleBg md:w-auto ${
							currentTheme ? colors.bg[currentTheme].light : "bg-purple-100"
						} shadow-2xl fixed top-0 bottom-0 h-screen duration-300 ${
							collapseShow ? "left-0 w-64 px-4" : "-left-full w-64 "
						}`}
					>
						{/* Form */}
						<div className="md:hidden flex  mt-4">
							<form className="mr-2">
								<div className="">
									<span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
										<HiSearch className="fas fa-search dark:text-slate-400 text-slate-600"></HiSearch>
									</span>
									<input
										type="text"
										placeholder="Search"
										className="border borderColor px-3 py-2 w-full placeholder-slate-500 text-slate-700 relative bg-purple_3/20 dark:customPurpleBg_2   rounded text-sm outline-none focus:outline-none pl-10"
									/>
								</div>
							</form>
							<ThemeToggle />
						</div>

						{/* Divider */}
						<hr className="my-4 md:min-w-full border-r borderColor" />
						{/* Heading */}

						{/* Navigation */}
						<ul className="md:flex-col md:min-w-full flex flex-col list-none">
							{/* Organization */}
							{/* {isAdmin && (
								<SidebarSubmenu sidebarSubmenu={sidebarMenu.organization} />
							)} */}

							<h6 className="max-w-fit text-slate-500 text-sm capitalize font-bold block px-2 pb-2 border-b-2 border-b-slate-400 dark:border-b-slate-500 mb-2">
								Dashboard
							</h6>

							{/* Employee (Only visible to logged in employees) */}

							<li key="dashboard">
								<NavLink
									className={({ isActive }) =>
										isActive ? activeLink : inActiveLink
									}
									onClick={() => setCollapseShow(false)}
									to="/hr/dashboard/"
								>
									<HiViewGrid className="w-5 h-5 mr-2" />
									Dashboard
								</NavLink>
							</li>

							<h6 className="max-w-fit text-slate-500 text-sm capitalize font-bold block px-2 pb-2 border-b-2 border-b-slate-400 dark:border-b-slate-500 mb-2 mt-4">
								General
							</h6>

							<li key="finance">
								<NavLink
									className={({ isActive }) =>
										isActive ? activeLink : inActiveLink
									}
									onClick={() => setCollapseShow(false)}
									to="/hr/finance"
								>
									<HiCurrencyRupee className="w-5 h-5 mr-2" />
									Finance
								</NavLink>
							</li>

							<li key="users">
								<NavLink
									className={({ isActive }) =>
										isActive ? activeLink : inActiveLink
									}
									onClick={() => setCollapseShow(false)}
									to="/hr/users"
								>
									<FaUserTie className="w-5 h-5 mr-2" />
									Users
								</NavLink>
							</li>

							<li key="employee">
								<NavLink
									className={({ isActive }) =>
										isActive ? activeLink : inActiveLink
									}
									onClick={() => setCollapseShow(false)}
									to="/hr/employee"
								>
									<FaUserTie className="w-5 h-5 mr-2" />
									Employee
								</NavLink>
							</li>

							{/* Apps */}
							{/* <h6 className="max-w-fit text-slate-500 text-sm capitalize font-bold block px-2 pb-2 border-b-2 border-b-slate-400 dark:border-b-slate-500 mb-2 mt-4">
								Apps
							</h6> */}
							{/* Kanban board */}
							{/* <li key="kanban-board">
								<NavLink
									className={({ isActive }) =>
										isActive ? activeLink : inActiveLink
									}
									onClick={() => setCollapseShow(false)}
									to="/dashboard/kanban"
								>
									<HiViewBoards className="w-5 h-5 mr-2" />
									Kanban
								</NavLink>
							</li> */}
						</ul>

						<div className="md:hidden mt-12 mb-4">
							<UserNavCard
								logout={logoutHandler}
								name={
									profile?.first_name +
									" " +
									profile?.middle_name +
									" " +
									profile?.last_name
								}
								email={profile?.email}
							/>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}
