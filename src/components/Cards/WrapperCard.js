import React from "react"

const WrapperCard = ({ classes }) => {
	return (
		<div
			className={`p-6 rounded-xl overflow-hidden custom_shadow bg-gray-100 dark:bg-purple_5 ${classes}`}
		></div>
	)
}

export default WrapperCard
