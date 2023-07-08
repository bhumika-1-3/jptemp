import React from "react"
import { HiTrash, HiPencilAlt } from "react-icons/hi"

const AddressCard = ({ content, deleteAddress, editAddress }) => {
	return (
		<div className="relative flex flex-col min-w-0 break-words bg-white w-full p-4 shadow-cardShadow rounded-lg dark:bg-purple_5 border borderColor">
			<div className="text-slate-800 font-medium dark:text-slate-200">
				<span className="block">{content?.line_1}</span>
				<span>{content?.line_2}</span>
			</div>
			<div className="font-medium text-slate-800 dark:text-slate-400">
				<span>{content?.landmark}</span>
			</div>
			<div className="mt-2">
				<span className="text-sm text-slate-600 dark:text-slate-400">
					{content?.city?.name}, {content?.city?.state?.name},{" "}
					{content?.city?.state?.country?.name}
				</span>
				<span className="block text-slate-600 text-sm font-semibold dark:text-slate-400">
					{content?.pincode}
				</span>
			</div>
			<div className="mt-6 flex">
				{editAddress && (
					<HiPencilAlt
						onClick={() => editAddress(content.id)}
						className="text-lg text-sky-700 mr-3 cursor-pointer"
					/>
				)}
				{deleteAddress && (
					<HiTrash
						onClick={() => deleteAddress(content.id)}
						className="text-lg text-red-700 cursor-pointer"
					/>
				)}
			</div>
		</div>
	)
}

export default AddressCard
