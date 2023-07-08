import React from "react"

const SectionHeader = ({ text, children }) => {
	return (
		<div className="px-2 py-1 border-b borderColor flex md:justify-between md:items-center md:flex-row mb-4 flex-col">
			<h4 className="font-medium text-sm text-slate-700 dark:text-slate-400">
				{text}
			</h4>
			<div className="md:mt-0 md:mb-0 mb-2 mt-3">{children}</div>
		</div>
	)
}

export default SectionHeader
