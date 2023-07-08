import { useState } from "react"
import { HiBadgeCheck, HiPencilAlt, HiXCircle } from "react-icons/hi"
import { TableFooter, ChipsV2 } from "../../../../components"
import {
	Tbody,
	Th,
	Td,
	Thead,
	TableContainer,
	Table,
} from "../../../../components/Tables/TableStyles"
import useTable from "../../../../hooks/useTable"

const AllExpensesTable = ({ content, rowsPerPage, onClick, update }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Id</Th>
					{update && <Th>Edit</Th>}
					<Th>Image</Th>
					<Th>Cleared ?</Th>
					<Th>Amount</Th>
					<Th>Description</Th>
				</Thead>

				<Tbody>
					{slice?.map((item) => (
						<tr key={item?.id}>
							<Td>{item?.id || "--"}</Td>
							{update && (
								<Td>
									<HiPencilAlt
										className="h-5 w-5 cursor-pointer text-blue-400 hover:text-blue-600 duration-300"
										onClick={() => update(item)}
									/>
								</Td>
							)}
							<Td>
								<img
									onClick={() => onClick(item || "")}
									className="w-6 h-6 cursor-pointer border-2 hover:border-purple-700 duration-300 rounded-md"
									src={item?.image}
									alt={item?.description}
								/>
							</Td>
							<Td>
								<ChipsV2
									classes={`${
										item?.is_cleared
											? "bg-green-300 text-green-700"
											: "bg-red-300 text-red-700"
									}`}
								>
									{item?.is_cleared ? (
										<HiBadgeCheck className="h-5 w-5" />
									) : (
										<HiXCircle className="h-5 w-5" />
									)}
								</ChipsV2>
							</Td>

							<Td>{item?.amount || "--"}</Td>
							<Td>{item?.description || "--"}</Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default AllExpensesTable
