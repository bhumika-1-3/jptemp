import { useState } from "react"
import { createPortal } from "react-dom"
import { HiXCircle } from "react-icons/hi"
import { motion } from "framer-motion"

const Modal = ({ activator, title, children }) => {
	const [show, setShow] = useState(false)

	const inViewAnimation = {
		start: {
			y: "10px",
			opacity: 0,
		},
		end: {
			y: "0",
			opacity: 1,
		},
	}

	const content = show && (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center px-4">
			<motion.div
				variants={inViewAnimation}
				initial="start"
				whileInView="end"
				transition={{ duration: 0.2 }}
				className="max-w-4xl sm:min-w-[400px] min-w-[270px] max-h-[80vh] rounded-xl sm:px-6 sm:py-5 p-5 bg-white dark:customPurpleBg_2 shadow-2xl relative overflow-hidden no-scrollbar overflow-y-auto"
			>
				{title && (
					<h2 className="text-slate-800 font-medium mb-4  dark:text-slate-200 w-fit  relative after:absolute after:w-1/4 after:rounded-3xl after:h-[2px] after:dark:h-[1.6px] after:bg-slate-500 after:-bottom-1 after:left-0">
						{title}
					</h2>
				)}
				{children}
				<HiXCircle
					className="absolute h-6 w-6 top-2 right-2 text-red-500  cursor-pointer hover:text-red-700 duration-500"
					onClick={() => {
						setShow(false)
					}}
				/>
			</motion.div>
			<div className="fixed top-0 left-0 w-full h-full bg-black -z-10 opacity-40 duration-500"></div>
		</div>
	)
	return (
		<>
			{activator({ setShow })}
			{createPortal(content, document.getElementById("modal-portal"))}
		</>
	)
}

export default Modal
