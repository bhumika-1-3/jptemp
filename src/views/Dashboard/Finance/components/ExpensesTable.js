import { useState } from "react"
import { TableFooter } from "../../../../components"
import {
	Tbody,
	Th,
	Td,
	Thead,
	TableContainer,
	Table,
} from "../../../../components/Tables/TableStyles"
import useTable from "../../../../hooks/useTable"

const ExpensesTable = ({ content, rowsPerPage, onClick, update }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Id</Th>
					<Th>Name</Th>
					<Th>Image</Th>
					<Th>Cleared ?</Th>
					<Th>Amount</Th>
					<Th>Description</Th>
				</Thead>

				<Tbody>
					{slice?.map((item) => (
						<tr key={item?.id}>
							<Td>{item?.id || "--"}</Td>
							<Td>
								{(item?.employee?.first_name || "") +
									" " +
									(item?.employee?.middle_name || "") +
									" " +
									(item?.employee?.last_name || "")}
							</Td>
							<Td>
								<img
									onClick={() => onClick(item || "")}
									className="w-6 h-6 cursor-pointer border-2 hover:border-purple-700 duration-300 rounded-md"
									src={item?.image}
									alt={item?.description}
								/>
							</Td>
							<Td>
								{/* Filters */}
								<div>
									<select
										value={item?.is_cleared}
										onChange={(e) => update(item, e.target.value)}
										className={`${
											item?.is_cleared
												? "bg-green-200 font-bold text-green-600"
												: "bg-red-200 font-bold text-red-600"
										} py-1 rounded-2xl border borderColor block  dark:bg-purple_5 shadow-sm dark:shadow-lg`}
									>
										<option value="">Select</option>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</select>
								</div>
							</Td>

							<Td>&#8377; {item?.amount || "--"}</Td>
							<Td>{item?.description || "--"}</Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
		</TableContainer>
	)
}

export default ExpensesTable
