import React from "react"

const SectionHeading = ({ children }) => {
	return (
		<h4 className="text-slate-500 text-2xl font-semibold mb-7 border-b-2 inline-block pb-1 border-b-slate-200 border-l-4 border-l-slate-400 pl-2">
			{children}
		</h4>
	)
}

export default SectionHeading
