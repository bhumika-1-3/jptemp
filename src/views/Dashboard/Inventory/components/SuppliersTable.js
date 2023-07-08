import { useState } from "react"
import { HiTrash } from "react-icons/hi"
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

const SupplierTable = ({ content, rowsPerPage, remove, onClick }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Id</Th>
					<Th>Name</Th>
					<Th>Edit/Delete</Th>
				</Thead>

				<Tbody>
					{slice.map((item) => (
						<tr key={item.id}>
							<Td>{item.id || "--"}</Td>
							<Td>
								<span
									onClick={() => onClick(item?.id)}
									className="font-semibold hover:text-blue-500 text-blue-400 duration-200  hover:underline cursor-pointer"
								>
									{item.name}
								</span>
							</Td>
							<Td>
								<div className="flex items-center space-x-4 pl-2">
									<HiTrash
										onClick={() => remove(item?.id)}
										className="cursor-pointer h-5 w-5 text-red-400 hover:text-red-600 duration-200"
									/>
								</div>
							</Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default SupplierTable
