import { useState } from "react"
import { HiTrash } from "react-icons/hi"
import { TableContainer, Tbody, Thead, Th, Td, Table } from "./TableStyles"
import { TableFooter } from ".."
import useTable from "../../hooks/useTable"

const UserTable = ({ content, rowsPerPage, onClick }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Username</Th>
					<Th>Email</Th>
					<Th>Phone</Th>
					<Th>Remove</Th>
				</Thead>

				<Tbody>
					{slice.map((item) => (
						<tr key={item.id}>
							<Td>
								<span className="font-semibold underline cursor-pointer">
									{item.username || "Username"}
								</span>
							</Td>
							<Td>{item.email || "Email"}</Td>
							<Td>{item.phone || "Phone"}</Td>
							<Td>
								<HiTrash
									onClick={() => onClick(item.id)}
									className="w-4 h-4 mr-1 text-red-600 cursor-pointer"
								/>
							</Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default UserTable
