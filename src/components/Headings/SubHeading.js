import { useSelector } from "react-redux"

const SubHeading = ({ children }) => {
	const { currentTheme, colors } = useSelector((state) => state.theme)
	return (
		<h3
			className={`font-md text-slate-700 font-semibold inline-block py-1 px-1 border-b-2 dark:text-slate-200 dark:border-purple-700 ${
				currentTheme ? colors.text[currentTheme].border : "border-purple-700"
			} mb-4`}
		>
			{children}
		</h3>
	)
}

export default SubHeading
