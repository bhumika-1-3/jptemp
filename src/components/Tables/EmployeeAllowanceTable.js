import { useState } from "react"
import { HiTrash } from "react-icons/hi"
import { TableContainer, Tbody, Thead, Th, Td, Table } from "./TableStyles"
import { TableFooter } from ".."
import useTable from "../../hooks/useTable"

const EmployeeAllowanceTable = ({
	content,
	rowsPerPage,
	_delete,
	onClick,
	isDeduction,
}) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Id</Th>
					<Th>Name</Th>
					<Th>Amount</Th>
					<Th>{!isDeduction ? "Allowance Type" : "Deduction Type"}</Th>
					<Th>Effective Date</Th>
					<Th>Remove</Th>
				</Thead>

				<Tbody>
					{content.map((item) => (
						<tr key={item.id}>
							<Td>{item?.id || "Id"}</Td>
							<Td>
								<span
									onClick={() => onClick(item?.id)}
									className="cursor-pointer font-bold text-blue-500 underline"
								>
									{!isDeduction
										? item?.allowance?.name
										: item?.deduction?.name || "Name"}
								</span>
							</Td>
							<Td>{item?.amount}</Td>
							<Td>
								{!isDeduction ? item?.allowance_type : item?.deduction_type}
							</Td>
							<Td>{item?.effective_date}</Td>
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

export default EmployeeAllowanceTable
