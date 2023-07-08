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

const ProductTable = ({ content, rowsPerPage, onClick }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Sku</Th>
					<Th>Name</Th>
					<Th>Price</Th>
					<Th>Quantity</Th>
					<Th>Category</Th>
				</Thead>

				<Tbody>
					{slice.map((item) => (
						<tr key={item.id}>
							<Td>{item.sku || "--"}</Td>
							<Td>
								<span
									onClick={() => onClick(item?.id)}
									className="font-semibold hover:text-blue-500 text-blue-400 duration-200  hover:underline cursor-pointer"
								>
									{item.name || "--"}
								</span>
							</Td>
							<Td>{item.price || "--"}</Td>
							<Td>{item.quantity || "--"}</Td>
							<Td>{item.category.name || "--"}</Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default ProductTable
