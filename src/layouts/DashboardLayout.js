import { useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { IoColorPaletteSharp } from "react-icons/io5"
import { ToastContainer } from "react-toastify"
import { AnimatePresence } from "framer-motion"
import "react-toastify/dist/ReactToastify.css"
import { EmployeeSidebar, Theme } from "../components"

// Components
import {
	FooterAdmin,
	Navbar,
	AdminSidebar,
	HRSidebar,
	InventorySidebar,
	FinanceSidebar,
} from "../components"

const DashboardLayout = () => {
	const [themeMenu, setThemeMenu] = useState(false)
	const { currentTheme, colors } = useSelector((state) => state.theme)
	const { role } = useSelector((state) => state.auth)

	return (
		<div className="dark:customPurpleBg font-lato remove-tap-highlight">
			<ToastContainer position="top-center" />
			{<AdminSidebar />}
			{role === "HR" && <HRSidebar />}
			{role === "INVENTORY" && <InventorySidebar />}
			{role === "FINANCE" && <FinanceSidebar />}
			{role === "EMPLOYEE" && <EmployeeSidebar />}
			<div className="relative md:ml-64  dark:bg-transparent ">
				<Navbar />
				<div className="px-6 pt-3 md:px-6 mx-auto w-full md:pt-16 min-h-screen flex flex-col">
					<div className="mt-3 sm:mt-2">
						<Outlet />
					</div>
					<FooterAdmin />
				</div>
			</div>
			<AnimatePresence>
				{themeMenu && <Theme closeThemeMenu={setThemeMenu} />}
			</AnimatePresence>
			<button
				onClick={() => setThemeMenu(true)}
				className={`fixed bottom-3 right-3 ${
					currentTheme ? colors.bg[currentTheme].dark : "bg-purple-800"
				} px-3 py-3 flex items-center rounded-full shadow-lg font-semibold text-white hover:opacity-80 duration-500`}
			>
				<IoColorPaletteSharp className="h-6 w-6" />
			</button>
		</div>
	)
}

export default DashboardLayout
