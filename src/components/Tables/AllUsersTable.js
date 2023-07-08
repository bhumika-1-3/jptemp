import { useState } from "react"
import { Link } from "react-router-dom"
import { RenderIf } from ".."
import { TableContainer, Tbody, Thead, Th, Td, Table } from "./TableStyles"
import { TableFooter } from ".."
import useTable from "../../hooks/useTable"

const AllUsersTable = ({ content, rowsPerPage, baseUrl }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Name</Th>
					<Th>Email</Th>
					<Th>Phone</Th>
					<Th>Role</Th>
					<Th>Status</Th>
				</Thead>

				<Tbody>
					{slice.map((item) => (
						<tr key={item.id}>
							<Td>
								<Link to={`${baseUrl}${item.id}`} className="block">
									<span className="capitalize underline font-bold text-purple-600">
										{item.first_name || ""} {item.middle_name || ""}{" "}
										{item.last_name || ""}{" "}
										<RenderIf
											isTrue={
												item.first_name === null &&
												item.middle_name === null &&
												item.last_name === null
											}
										>
											{"Name"}
										</RenderIf>
									</span>
								</Link>
							</Td>
							<Td>{item.email || "Email"}</Td>
							<Td>{item.phone || "Phone"}</Td>
							<Td>
								<RenderIf isTrue={item?.is_staff}>Staff</RenderIf>
								<RenderIf isTrue={item?.is_admin}>Admin</RenderIf>
								<RenderIf isTrue={item?.is_employee}>Employee</RenderIf>
							</Td>
							<Td>
								<RenderIf isTrue={item?.is_active}>Active</RenderIf>
								<RenderIf isTrue={!item?.is_active}>Not active</RenderIf>
							</Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default AllUsersTable
