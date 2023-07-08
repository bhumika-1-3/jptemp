import { useState } from "react"
import { TableContainer, Tbody, Thead, Th, Td, Table } from "./TableStyles"
import { TableFooter } from ".."
import useTable from "../../hooks/useTable"
import RenderIf from "../RenderIf/RenderIf"

const BulkAttendanceTable = ({
	content,
	employeeSelect,
	attendanceSelect,
	attendanceDateSelect,
	rowsPerPage,
	attendances,
	selectAll,
}) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)

	const handleAllChecked = (item) => {
		const result = attendances.find((el) => el?.employee_id === item?.id)
		if (result) {
			return result?.checked
		}
		return false
	}
	const handleAttendanceType = (item) => {
		const result = attendances.find((el) => el?.employee_id === item?.id)
		if (result) {
			return result?.attendance_type
		}
		return ""
	}
	const handleAttendanceDate = (item) => {
		const result = attendances.find((el) => el?.employee_id === item?.id)
		if (result) {
			return result?.date
		}
		return ""
	}

	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>
						<input
							className="rounded-2xl border border-slate-400 dark:bg-purple_5"
							onChange={selectAll}
							type="checkbox"
						/>
					</Th>
					<Th>Attendance type</Th>
					<Th>Date</Th>
					<Th>Name</Th>
					<Th>Email</Th>
				</Thead>

				<Tbody>
					{slice.map((item) => (
						<tr key={item.id}>
							<Td>
								<input
									className="rounded-2xl border border-slate-400 dark:bg-purple_5"
									onChange={(e) => employeeSelect(e, item.id)}
									type="checkbox"
									checked={handleAllChecked(item)}
								/>
								<p>{item.checked}</p>
							</Td>

							<Td>
								<select
									value={handleAttendanceType(item)}
									onChange={(e) => attendanceSelect(e, item.id)}
									className="py-1 rounded-2xl border borderColor dark:bg-purple_5 shadow-sm dark:shadow-lg"
								>
									<option value="">Select</option>
									<option value="P">Present</option>
									<option value="A">Absent</option>
								</select>
							</Td>
							<Td>
								<input
									value={handleAttendanceDate(item)}
									className="py-1 rounded-2xl border borderColor dark:bg-purple_5 shadow-sm dark:shadow-lg"
									onChange={(e) => attendanceDateSelect(e, item.id)}
									type="date"
									// max={new Date()}
								/>
							</Td>
							<Td>
								{item.first_name || ""} {item?.middle_name || ""}{" "}
								{item?.last_name || ""}{" "}
								<RenderIf
									isTrue={
										!item?.first_name && !item?.middle_name && !item?.last_name
									}
								>
									{"---"}
								</RenderIf>
							</Td>

							<Td>{item?.email || "Email"}</Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default BulkAttendanceTable
