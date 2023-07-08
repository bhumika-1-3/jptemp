const Button2 = ({ onClick, type, danger, Icon, children }) => {
	return (
		<button
			onClick={onClick}
			className={`${
				danger
					? "bg-transparent active:bg-red-500 active:text-white focus:ring-red-600/50 text-red-500 border-2 border-red-500"
					: "bg-transparent active:bg-blue-600 active:text-white focus:ring-blue-500/50 text-blue-600 border-2 border-blue-600"
			} focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm p-1 text-center inline-flex items-center mr-2 mb-2 shadow-lg`}
			type={type}
		>
			{Icon && <Icon className="w-6 h-6" />}
			{children}
		</button>
	)
}

export default Button2
