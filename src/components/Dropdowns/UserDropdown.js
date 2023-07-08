import React, { useState, useRef } from "react"
import { createPopper } from "@popperjs/core"
import { FaUserCircle } from "react-icons/fa"

const UserDropdown = ({ logout }) => {
	// dropdown props
	const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false)
	const btnDropdownRef = useRef()
	const popoverDropdownRef = useRef()
	const openDropdownPopover = () => {
		createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
			placement: "bottom-end",
		})
		setDropdownPopoverShow(true)
	}
	const closeDropdownPopover = () => {
		setDropdownPopoverShow(false)
	}
	return (
		<>
			<a
				href="/"
				className="text-slate-700 block cursor-pointer"
				ref={btnDropdownRef}
				onClick={(e) => {
					e.preventDefault()
					dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
				}}
			>
				<div className="items-center flex">
					<span className="dark:text-slate-400 text-slate-200 bg-blueGray-800 inline-flex items-center justify-center rounded-full">
						{/* <img
							alt="..."
							className="w-full rounded-full align-middle border-none shadow-lg"
							src=""
							
						/> */}
						<FaUserCircle className="rounded-full align-middle border-none w-8 h-8" />
					</span>
				</div>
			</a>
			<div
				ref={popoverDropdownRef}
				className={
					(dropdownPopoverShow ? "block " : "hidden ") +
					"dark:customPurpleBg_2 border bg-purple_3 borderColor text-base z-50 float-left p-2 list-none text-left rounded shadow-lg min-w-48"
				}
			>
				{/* <Link
					to="/"
					className={
						"text-sm font-semibold py-2 px-4 rounded hover:bg-slate-500 duration-300 hover:text-slate-100 block w-full whitespace-nowrap bg-transparent text-blueGray-700"
					}
					onClick={(e) => e.preventDefault()}
				>
					Profile
				</Link> */}
				<div className="border border-solid borderColor" />
				<button
					onClick={logout}
					className="rounded-md w-full py-1 hover:opacity-90 duration-300 text-slate-200 bg-red-700"
				>
					Logout
				</button>
			</div>
		</>
	)
}

export default UserDropdown
