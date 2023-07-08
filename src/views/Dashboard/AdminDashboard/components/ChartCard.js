import React from "react"

const ChartCard = ({ title, children }) => {
	return (
		<div className="bg-gray-100 custom_shadow  p-4 overflow-hidden rounded-xl dark:bg-purple_5">
			{title && (
				<h4 className="text-slate-600 dark:text-slate-200 font-semibold text-base mb-4">
					{title}
				</h4>
			)}
			{children}
		</div>
	)
}

export default ChartCard
