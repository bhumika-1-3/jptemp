import React from "react"

const SelectTag = ({
	onChange,
	label,
	content,
	value,
	Icon,
	notRequired,
	bgWhite,
}) => {
	return (
		<div className="w-full">
			<div className="relative w-full mb-3">
				<label className="text-slate-700 dark:text-slate-300 text-sm font-normal mb-2 flex items-center">
					{Icon && <Icon className="mr-2" />}
					{label}
					{!notRequired && (
						<span className="text-red-500 font-extrabold ml-1 text-md">*</span>
					)}
				</label>
				<select
					value={value}
					className={`"border-0 border-transparent px-3 py-3 dark:placeholder-slate-300 dark:text-slate-600 ${
						bgWhite ? "bg-white" : "bg-gray-200"
					}  dark:bg-transparent dark:border dark:border-slate-500 rounded-md text-sm shadow-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"`}
					onChange={onChange}
					required={!notRequired ? true : false}
				>
					<option value="">Select</option>
					{content.map((item) => (
						<option value={item.id} key={item.id}>
							{item.email || item.name}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default SelectTag
