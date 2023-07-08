import { useState } from "react"
import { HiOutlinePlusCircle } from "react-icons/hi"
import { TableContainer, Tbody, Thead, Th, Td, Table } from "./TableStyles"
import { Chips } from ".."
import { TableFooter } from ".."
import useTable from "../../hooks/useTable"

const LeaveTable = ({
	content,
	selectLeave,
	rowsPerPage,
	forSpecificEmployee,
}) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Update</Th>
					<Th>Leave status</Th>
					{!forSpecificEmployee && <Th>Name</Th>}
					{!forSpecificEmployee && <Th>Email</Th>}
					<Th>Start</Th>
					<Th>End</Th>
					{forSpecificEmployee && <Th>Duration</Th>}
					<Th>Leave type</Th>
					<Th>Leave reason</Th>
					{!forSpecificEmployee && <Th>Employee type</Th>}
					{!forSpecificEmployee && <Th>Department</Th>}
					{!forSpecificEmployee && <Th>Designation</Th>}
				</Thead>

				<Tbody>
					{content.map((item) => (
						<tr key={item.id}>
							<Td>
								<HiOutlinePlusCircle
									onClick={() => selectLeave(item.id)}
									className="text-sky-500 text-lg block  hover:text-sky-800 duration-500 cursor-pointer"
								/>
							</Td>
							<Td>
								<Chips
									green={item.review_status === "Approved"}
									yellow={item.review_status === "Pending"}
									red={item.review_status === "Rejected"}
								>
									{item.review_status || "Leave status"}
								</Chips>
							</Td>
							{!forSpecificEmployee && (
								<Td>
									{item.employee.first_name +
										" " +
										item.employee.middle_name +
										" " +
										item.employee.last_name || "Name"}
								</Td>
							)}
							{!forSpecificEmployee && (
								<Td>{item.employee.email || "Email"}</Td>
							)}
							<Td>{item.start || "Leave start"}</Td>
							<Td>{item.end || "Leave end"}</Td>
							<Td>{item.leave_type || "Leave type"}</Td>
							<Td>{item.review_reason || "Leave reason"}</Td>
							{!forSpecificEmployee && (
								<Td>{item.employee.employee_type.name || "Employee type"}</Td>
							)}
							{!forSpecificEmployee && (
								<Td>{item.employee.department.name || "Department"}</Td>
							)}
							{!forSpecificEmployee && (
								<Td>{item.employee.designation.name || "Designation"}</Td>
							)}
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default LeaveTable
