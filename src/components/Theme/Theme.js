import React from "react"
import { HiOutlineXCircle, HiCheck, HiRefresh } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { setTheme, resetTheme } from "../../store/slices/theme/themeSlice"
import { SubHeading } from ".."

const themeColors = ["blue", "yellow", "green", "red"]

const Theme = ({ closeThemeMenu }) => {
	const { currentTheme, colors } = useSelector((state) => state.theme)
	const dispatch = useDispatch()

	return (
		<motion.div
			initial={{ opacity: 0.5 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed top-0 left-0 w-full h-full flex justify-end z-50"
		>
			<div
				className={`h-screen w-52 ${
					currentTheme ? colors.bg[currentTheme].light : "bg-purple-100"
				}   dark:customPurpleBg px-4`}
			>
				<div className="w-full flex  justify-between my-4">
					<SubHeading>Themes</SubHeading>
					{/* <h4 className="font-normal  text-slate-800 dark:text-slate-200">
						Themes
					</h4> */}
					<HiOutlineXCircle
						onClick={() => closeThemeMenu(false)}
						className="w-5 h-5 mt-2 cursor-pointer text-slate-800 hover:text-red-600 duration-500 dark:text-slate-200"
					/>
				</div>
				<div className="border-t borderColor">
					<div className="w-full flex gap-3 mt-5">
						{themeColors.map((item, idx) => (
							<button
								key={idx}
								type="button"
								className={`h-6 w-6 rounded-full cursor-pointer flex justify-center items-center ${
									item === currentTheme && "border-2 border-slate-600"
								}`}
								style={{ backgroundColor: item }}
								onClick={() => dispatch(setTheme(item))}
							>
								<HiCheck
									className={` text-white ${
										item === currentTheme ? "block" : "hidden"
									}`}
								/>
							</button>
						))}
					</div>
				</div>
				<div className="mt-5 border-t borderColor">
					<button
						onClick={() => dispatch(resetTheme())}
						className=" mt-4 flex items-center text-slate-100 relative border-none bg-purple-700 rounded-2xl hover:bg-purple-500 duration-500 px-3 py-1"
					>
						<HiRefresh className="w-4 h-4 mr-1" />
						Reset
					</button>
				</div>
			</div>
			<div className="fixed top-0 left-0 w-full h-full bg-black -z-10 opacity-40 duration-500"></div>
		</motion.div>
	)
}

export default Theme
