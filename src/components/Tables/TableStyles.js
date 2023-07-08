import { useSelector } from "react-redux"

export const TableContainer = ({ children }) => {
	return (
		<div className="overflow-hidden overflow-x-auto border borderColor rounded-md">
			{children}
		</div>
	)
}

export const Table = ({ children }) => {
	return (
		<table className="min-w-full text-sm divide-y divide-slate-50/[0.06]">
			{children}
		</table>
	)
}

export const Tbody = ({ children }) => {
	return (
		<tbody className="divide-y divide-slate-900/10  dark:divide-slate-50/[0.06] dark:bg-purple_5 ">
			{children}
		</tbody>
	)
}

export const Td = ({ children }) => {
	return (
		<td className="px-4 py-2 font-medium dark:text-slate-300 text-slate-600 text-sm whitespace-nowrap">
			{children}
		</td>
	)
}

export const Th = ({ children }) => {
	const { currentTheme, colors } = useSelector((state) => state.theme)
	return (
		<th
			className={`px-4 py-2 font-semibold text-left ${
				currentTheme ? colors.text[currentTheme].dark : "text-purple-800"
			} dark:text-slate-300 whitespace-nowrap`}
		>
			{children}
		</th>
	)
}

export const Thead = ({ children }) => {
	const { currentTheme, colors } = useSelector((state) => state.theme)
	return (
		<thead>
			<tr
				className={`${
					currentTheme ? colors.bg[currentTheme].light : "bg-purple-100"
				} dark:customPurpleBg_2`}
			>
				{children}
			</tr>
		</thead>
	)
}
