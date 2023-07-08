import { HiMinusCircle, HiXCircle, HiCheckCircle } from "react-icons/hi"

const Chips = ({ green, red, yellow, children }) => {
	return (
		<div
			className={`px-2 py-1 rounded-3xl text-sm font-bold  flex items-center w-fit ${
				red ? "bg-red-200 dark:bg-red-800 dark:text-slate-200 text-red-800" : ""
			} ${
				green
					? "bg-green-200 dark:bg-green-800 dark:text-slate-200 text-green-900"
					: ""
			} ${
				yellow
					? "bg-yellow-200 text-yellow-900 dark:bg-yellow-800 dark:text-slate-200"
					: ""
			}`}
		>
			{green && <HiCheckCircle className="w-4 h-4 mr-1" />}{" "}
			{red && <HiXCircle className="w-4 h-4 mr-1" />}{" "}
			{yellow && <HiMinusCircle className="w-4 h-4 mr-1" />} {children}
		</div>
	)
}

export default Chips
