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
import { Chips } from "../../../../components"

const PurchasesTable = ({ content, rowsPerPage, remove, onClick }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Id</Th>
					<Th>Delivery reference number</Th>
					<Th>Order status</Th>
					<Th>Agreed delivery date</Th>
					<Th>Delete</Th>
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
									{item.delivery_reference_number || "--"}
								</span>
							</Td>
							<Td>
								<Chips
									green={item?.order_status === "Accepted"}
									red={item?.order_status === "Rejected"}
									yellow={
										item?.order_status === "Placed" ||
										item?.order_status === "In transit"
									}
								>
									{item.order_status}
								</Chips>
							</Td>
							<Td>{item.agreed_delivery_date || "--"}</Td>
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

export default PurchasesTable
