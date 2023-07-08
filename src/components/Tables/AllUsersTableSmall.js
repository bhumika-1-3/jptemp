import { useState } from "react"
import { RenderIf } from ".."
import { TableContainer, Tbody, Thead, Th, Td, Table } from "./TableStyles"
import { TableFooter } from ".."
import useTable from "../../hooks/useTable"

const AllUsersTableSmall = ({ content, rowsPerPage, onClick }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Name</Th>
					<Th>Email</Th>
					<Th>Role</Th>
				</Thead>

				<Tbody>
					{slice.map((item) => (
						<tr key={item.id}>
							<Td>
								<span
									onClick={() => onClick(item)}
									className="capitalize underline font-bold text-purple-600 cursor-pointer"
								>
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
							</Td>
							<Td>{item.email || "Email"}</Td>
							<Td>
								<RenderIf isTrue={item?.is_staff}>Staff</RenderIf>
								<RenderIf isTrue={item?.is_admin}>Admin</RenderIf>
								<RenderIf isTrue={item?.is_employee}>Employee</RenderIf>
							</Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default AllUsersTableSmall
