const BigText = ({ children }) => {
	return (
		<h2
			className={`font-light w-fit md:text-3xl text-2xl text-slate-700 dark:text-slate-200 sm:mt-4 sm:mb-8 mb-6 relative after:absolute after:w-1/4 after:rounded-3xl after:h-[2px] after:bg-slate-500 after:-bottom-2 after:left-0`}
		>
			{children}
		</h2>
	)
}

export default BigText
