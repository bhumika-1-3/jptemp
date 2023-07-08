import { useState } from "react"
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

const AllDeductionListTable = ({ content, rowsPerPage, onClick }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Id</Th>
					<Th>Name</Th>
					<Th>Description</Th>
				</Thead>

				<Tbody>
					{content.map((item) => (
						<tr key={item?.id}>
							<Td>{item?.id || "Id"}</Td>
							<Td>
								<span
									onClick={() => onClick(item?.id)}
									className="cursor-pointer font-bold text-blue-500 underline"
								>
									{item?.name || "Name"}
								</span>
							</Td>
							<Td>
								{item?.description?.slice(0, 50) + "..." || "Leave start"}
							</Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default AllDeductionListTable
