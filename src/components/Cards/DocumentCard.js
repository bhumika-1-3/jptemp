import { useSelector } from "react-redux"
const DocumentCard = ({ data, idx }) => {
	const { currentTheme, colors } = useSelector((state) => state.theme)
	const { document_type, file } = data
	return (
		<div className="relative max-w-xs lg:p-4 md:p-3 p-3 rounded-md shadow-md dark:bg-purple_5 border borderColor">
			<h4
				className={`text-md font-semibold ${
					currentTheme ? colors.text[currentTheme].dark : "text-purple-700"
				} mb-3 capitalize dark:text-slate-200`}
			>
				<span
					className={`font-semibold text-white text-sm px-2 rounded-lg mb-1.5 mr-2  dark:bg-purple-800 inline-block ${
						currentTheme ? colors.bg[currentTheme].dark : "bg-purple-800"
					}`}
				>
					{idx + 1}
				</span>
				{document_type.name}
			</h4>
			<div className="w-full overflow-hidden rounded-md shadow-sm">
				<img src={file} alt={document_type.name} />
			</div>
		</div>
	)
}

export default DocumentCard
