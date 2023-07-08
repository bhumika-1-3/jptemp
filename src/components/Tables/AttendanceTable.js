import { useState } from "react"
import { HiOutlinePlusCircle } from "react-icons/hi"
import { RenderIf, Chips } from ".."
import { TableContainer, Tbody, Thead, Th, Td, Table } from "./TableStyles"
import { TableFooter } from ".."
import useTable from "../../hooks/useTable"

const AttendanceTable = ({ content, attendanceSelect, rowsPerPage }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<RenderIf isTrue={attendanceSelect}>
						<Th>Select</Th>
					</RenderIf>
					<Th>Attendance Type</Th>
					{/* <Th>Time in</Th>
					<Th>Time out</Th> */}
					{/* <Th>Remarks</Th> */}
					<Th>Latitude</Th>
					<Th>Longitude</Th>
					<Th>Date</Th>
				</Thead>

				<Tbody>
					{slice.map((item) => (
						<tr key={item.id}>
							<RenderIf isTrue={attendanceSelect}>
								<Td>
									<HiOutlinePlusCircle
										className="text-sky-500 w-5 h-5 hover:text-sky-800 duration-500 cursor-pointer"
										onClick={() => attendanceSelect(item.id)}
									/>
								</Td>
							</RenderIf>
							<Td>
								<Chips
									green={item?.attendance_type === "Present"}
									red={item?.attendance_type === "Absent"}
									yellow={item?.attendance_type === "Unavailable"}
								>
									{item.attendance_type}
								</Chips>
							</Td>
							{/* <Td>{item.time_in || "Time in"}</Td>
							<Td>{item.time_out || "Time out"}</Td> */}
							{/* <Td>{item.remarks || "Remarks"}</Td> */}
							<Td>{item.latitude || "Latitude"}</Td>
							<Td>{item.longitude || "Longitude"}</Td>

							<Td>{item.date || "Date"}</Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default AttendanceTable
