import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { HiX } from "react-icons/hi"

const GroupDetailModal = ({ data, closeModal }) => {
	const { isLoading } = useSelector((state) => state.user)

	if (isLoading) {
		return <div className="text-2xl">Loading...</div>
	}

	return createPortal(
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center px-4">
			<div className="max-w-md w-full rounded-md p-5 bg-white shadow-2xl relative dark:customPurpleBg_2">
				<h4 className="text-slate-600 text-xl font-normal mb-2 z-20 dark:text-slate-200">
					Group name:{" "}
					<span className="text-purple-500 font-bold">{data.name}</span>
				</h4>
				<div>
					<span className="block font-semibold text-blueGray-600 underline mb-1 dark:text-slate-400">
						Permissions:
					</span>
					{data.permissions.map((per, idx) => (
						<span
							className="block text-slate-500 dark:text-slate-400"
							key={idx + "abcd"}
						>
							{per.name}
						</span>
					))}
				</div>

				<HiX
					className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer"
					onClick={closeModal}
				/>
				<div className="fixed top-0 left-0 w-full h-full bg-black -z-10 opacity-40 duration-500"></div>
			</div>
		</div>,
		document.getElementById("modal-portal")
	)
}

export default GroupDetailModal
