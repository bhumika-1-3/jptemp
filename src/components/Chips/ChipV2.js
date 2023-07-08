const ChipsV2 = ({ children, Icon, classes }) => {
	return (
		<div
			className={`px-3 py-1 rounded-3xl text-base font-normal shadow-md  flex items-center w-fit bg-slate-400 dark:bg-purple_5 text-white capitalize ${
				classes ? classes : ""
			}`}
		>
			{Icon && <Icon className="h-4 w-4 text-white mr-2" />}
			{children}
		</div>
	)
}

export default ChipsV2
