import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaAngleDown } from "react-icons/fa"

function SidebarSubmenu({ sidebarSubmenu }) {
	const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)
	const { currentTheme, colors } = useSelector((state) => state.theme)
	function handleDropdownMenuClick() {
		setIsDropdownMenuOpen(!isDropdownMenuOpen)
	}

	const activeSubLink = `px-2 py-1 font-semibold transition-colors duration-150 dark:text-purple_2 ${
		currentTheme ? colors.text[currentTheme].dark : "text-purple-700"
	} my-2 flex items-center w-full`
	const inActiveSubLink =
		"px-2 py-1 transition-colors duration-150 text-slate-700 my-2 flex items-center w-full dark:text-slate-300 font-medium"

	return (
		<li className="relative cursor-pointer" key={sidebarSubmenu.name}>
			{/* <button
				className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
				onClick={handleDropdownMenuClick}
				aria-haspopup="true"
			>
				<span className="inline-flex items-center">
					<span className="ml-4">{route.name}</span>
				</span>
				<FaAngleDown className="w-4 h-4" aria-hidden="true" />
			</button> */}
			<span
				onClick={handleDropdownMenuClick}
				className={`items-center text-sm capitalize py-2 px-2  my-1 font-semibold flex text-slate-700 dark:text-slate-300 ${
					currentTheme ? colors.bg[currentTheme].hover : "hover:bg-purple-300"
				} border border-transparent rounded-md dark:hover:border dark:hover:border-slate-50/[0.06] dark:hover:bg-transparent  hover:text-slate-900 hover:rounded-md duration-300`}
			>
				<sidebarSubmenu.icon className="w-4 h-4 mr-2 " />
				{sidebarSubmenu.name}
				<FaAngleDown className="w-4 h-4 ml-auto" aria-hidden="true" />
			</span>
			<ul
				className={`${
					isDropdownMenuOpen ? "block" : "hidden"
				}  p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium  rounded-md shadow-inner duration-700  ${
					currentTheme ? colors.bg[currentTheme].medium : "bg-purple-200"
				} dark:customPurpleBg_2 dark:border   dark:border-slate-50/[0.06]`}
				aria-label="submenu"
			>
				{sidebarSubmenu.submenu.map((r) => (
					<li key={r.name}>
						<NavLink
							className={({ isActive }) =>
								isActive ? activeSubLink : inActiveSubLink
							}
							to={r.path}
						>
							{r.name}
							{r.icon && <r.icon className="w-5 h-5 ml-2" />}
						</NavLink>
					</li>
				))}
			</ul>
		</li>
	)
}

export default SidebarSubmenu
