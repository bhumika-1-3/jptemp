import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { HiSearch } from "react-icons/hi"
import { logout } from "../../store/slices/auth/authSlice"
import { ThemeToggle } from ".."
import UserNavCard from "../Cards/UserNavCard"
import axios from "../../Services/axios"
import RenderIf from "../RenderIf/RenderIf"
export default function Navbar() {
	const [adminInfo, setAdminInfo] = useState(null)
	const { profile } = useSelector((state) => state.employee)
	const { isEmployee, isAdmin, isHr } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const logoutHandler = () => {
		dispatch(logout())
		window.location = "/auth/login"
	}
	const [counter, setCounter] = useState(0);
	useEffect(() => {
		const getAdmin = async () => {
			const res = await axios.get("user/profile/")
			const data = await res.data
			setAdminInfo(data?.data)
		}
		if (isAdmin) {
			getAdmin()
		}
	}, [isAdmin])

	
	return (
		<>
			{/* Navbar */}
			<nav className="absolute top-0 left-0 w-full md:flex-row md:flex-nowrap md:justify-start md:flex items-center p-2 hidden border-b borderColor ">
				<div className="w-full mx-autp items-center flex justify-end md:flex-nowrap flex-wrap md:px-10 px-4">
					<div className="flex items-center">
						{/* Form */}
						{/* <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
							<div className="relative flex w-full flex-wrap items-stretch">
								<span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
									<HiSearch className="fas fa-search dark:text-slate-400 text-slate-600"></HiSearch>
								</span>
								<input
									type="text"
									placeholder="Search here..."
									className="border borderColor px-3 py-2 placeholder-slate-500 dark:text-slate-200 text-slate-700 relative  dark:customPurpleBg_2   rounded text-sm outline-none focus:outline-none w-full pl-10"
								/>
							</div>
						</form> */}
						{/* Dark mode toggle */}
						<ThemeToggle />
						{/* User */}
						<ul className="flex-col md:flex-row list-none items-center hidden md:flex ml-2">
							<RenderIf isTrue={isEmployee || isHr}>
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
							</RenderIf>
							<RenderIf isTrue={true}>
								<UserNavCard
									logout={logoutHandler}
									name={adminInfo?.first_name || ""}
									email={adminInfo?.email || ""}
								/>
							</RenderIf>
						</ul>
					</div>
				</div>
			</nav>
			{/* End Navbar */}
		</>
	)
}
