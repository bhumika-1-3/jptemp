import { useState } from "react"
import { HiTrash } from "react-icons/hi"
import { TableContainer, Tbody, Thead, Th, Td, Table } from "./TableStyles"
import { TableFooter } from ".."
import useTable from "../../hooks/useTable"
import { Link } from "react-router-dom"

const AllowanceTable = ({ content, rowsPerPage, _delete, baseUrl }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Id</Th>
					<Th>Name</Th>
					<Th>Description</Th>
					<Th>Delete</Th>
				</Thead>

				<Tbody>
					{slice.map((item) => (
						<tr key={item.id}>
							<Td>{item?.id || "Id"}</Td>
							<Td>
								<Link to={`${baseUrl}${item.id}`}>
									<span className="cursor-pointer font-bold text-blue-500 underline">
										{item?.name || "Name"}
									</span>
								</Link>
							</Td>
							<Td>
								{item?.description?.slice(0, 50) + "..." || "Leave start"}
							</Td>
							<Td>
								<HiTrash
									onClick={() => _delete(item.id)}
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

export default AllowanceTable
