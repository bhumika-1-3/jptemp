import { useState } from "react"
import { HiUserAdd } from "react-icons/hi"
import { Chips } from "../../../../components"
import {
	TableContainer,
	Tbody,
	Thead,
	Th,
	Td,
	Table,
} from "../../../../components/Tables/TableStyles"
import TableFooter from "../../../../components/Tables/TableFooter"
import useTable from "../../../../hooks/useTable"

const AttendanceTable = ({ cont, rowsPerPage, employeeSelect }) => {
	const content = [{ "date": "2023-02-02", "present": true, "absent": false }, { "date": "2023-01-02", "present": true, "absent": false }, { "date": "2023-02-03", "present": false, "absent": true }, { "date": "2023-01-24", "present": false, "absent": true }, { "date": "2023-02-05", "present": false, "absent": true }, { "date": "2023-02-06", "present": true, "absent": false }, { "date": "2023-01-07", "present": true, "absent": false }, { "date": "2023-01-08", "present": true, "absent": false }, { "date": "2023-01-18", "present": false, "absent": true }, { "date": "2023-01-16", "present": false, "absent": true }]
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Update</Th>
					<Th>Name</Th>
					{/* <Th>Username</Th> */}
					<Th>Attendance type</Th>
					<Th>Date</Th>

					<Th>Email</Th>
					<Th>Phone</Th>
					<Th>Gender</Th>
					<Th>Employee type</Th>
					<Th>Department</Th>
					<Th>Designation</Th>
				</Thead>

				<Tbody>
					{slice.map((item) => (
						<tr key={item.id}>
							<Td>
								<HiUserAdd
									onClick={() => employeeSelect(item)}
									className="text-sky-500 w-5 h-5 hover:text-sky-800 duration-500 cursor-pointer"
								/>
							</Td>
							<Td>
								{item.employee.first_name || ""}{" "}
								{item.employee.middle_name || ""}{" "}
								{item.employee.last_name || ""}{" "}
								{/* {item.employee.first_name +
									" " +
									item.employee.middle_name +
									" " +
									item.employee.last_name || "Name"} */}
							</Td>
							{/* <Td>{item.employee.username || "Username"}</Td> */}
							<Td>
								<Chips
									red={item?.attendance_type === "Absent"}
									green={item?.attendance_type === "Present"}
								>
									{item.attendance_type || "Attendance Type"}
								</Chips>
							</Td>
							<Td>{item.date || "Date"}</Td>
							<Td>{item.employee.email || "Email"}</Td>

							<Td>{item.employee.phone || "Phone"}</Td>
							<Td>{item.employee.gender || "Gender"}</Td>
							<Td>{item.employee.employee_type.name || "Employee type"}</Td>
							<Td>{item.employee.department.name || "Department"}</Td>
							<Td>{item.employee.designation.name || "Designation"}</Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default AttendanceTable
