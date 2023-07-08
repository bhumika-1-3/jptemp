import React from "react"

const LoadingSpinner = () => {
	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
			<div className="loading-spinner"></div>
			<div className="fixed top-0 left-0 w-full h-full bg-black -z-10 opacity-40 duration-500"></div>
		</div>
	)
}

export default LoadingSpinner
