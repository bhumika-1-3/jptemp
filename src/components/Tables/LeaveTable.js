import { useState } from "react"
import { Chips } from ".."
import { TableContainer, Tbody, Thead, Th, Td, Table } from "./TableStyles"
import { TableFooter } from ".."
import useTable from "../../hooks/useTable"

const LeaveTable = ({ content, rowsPerPage }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Start</Th>
					<Th>End</Th>
					<Th>Leave type</Th>
					<Th>Leave reason</Th>
					<Th>Leave status</Th>
				</Thead>

				<Tbody>
					{content.map((item) => (
						<tr key={item.id}>
							<Td>{item.start || "Leave start"}</Td>
							<Td>{item.end || "Leave end"}</Td>
							<Td>{item.leave_type || "Leave type"}</Td>
							<Td>{item.review_reason || "Leave reason"}</Td>
							<Td>
								<Chips
									yellow={item.review_status === "Pending"}
									green={item.review_status === "Approved"}
									red={item.review_status === "Rejected"}
								>
									{item.review_status || "Leave status"}
								</Chips>
							</Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default LeaveTable
