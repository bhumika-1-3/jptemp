import React from "react"

const DataTag = ({
    value,
    label,
    onChange,
    type,
    placeholder,
    Icon,
    notRequired,
    bgWhite,
    number,
}) => {
    return (
        <div className="w-full">
            <div className="relative w-full mb-3">
                <label className=" text-slate-700 dark:text-slate-300 text-lg font-normal mb-2 flex items-center">
                    {Icon && <Icon className="mr-2" />}
                    {label}
                    {!notRequired && (
                        <span className="text-red-500 font-extrabold ml-1 text-md">*</span>
                    )}
                </label>
            </div>
        </div>
        // <div className="w-full">
        // 	<div className="relative w-full mb-3">
        // 		<label className=" text-slate-700 dark:text-slate-300 text-sm font-normal mb-2 flex items-center">
        // 			{Icon && <Icon className="mr-2" />}
        // 			{label}
        // 			{!notRequired && (
        // 				<span className="text-red-500 font-extrabold ml-1 text-md">*</span>
        // 			)}
        // 		</label>
        // 		<input
        // 			placeholder={placeholder}
        // 			required={!notRequired ? true : false}
        // 			value={value}
        // 			onChange={onChange}
        // 			type={type}
        // 			className="border-0 px-3 py-3 placeholder-blueGray-300 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200 bg-white dark:bg-transparent dark:border rounded text-sm shadow-cardShadow outline-none w-full ease-linear transition-all duration-150"
        // 		/>
        // 	</div>
        // </div>
    )
}

export default DataTag
