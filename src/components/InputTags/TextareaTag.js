const TextareaTag = ({
	value,
	label,
	onChange,
	type,
	placeholder,
	Icon,
	notRequired,
	bgWhite,
}) => {
	return (
		<div className="w-full">
			<div className="relative w-full mb-3">
				<label className=" text-slate-700 dark:text-slate-400 text-sm font-normal mb-2 flex items-center">
					{Icon && <Icon className="mr-2" />}
					{label}
				</label>
				<textarea
					placeholder={placeholder}
					required={!notRequired ? true : false}
					value={value}
					onChange={onChange}
					type={type}
					className={`border-0 px-3 py-3 placeholder-blueGray-300 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200 ${
						bgWhite ? "bg-white" : "bg-gray-200"
					} dark:bg-transparent dark:border rounded-md text-sm shadow-sm outline-none w-full ease-linear transition-all duration-150`}
				/>
			</div>
		</div>
	)
}

export default TextareaTag
