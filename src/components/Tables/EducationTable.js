import { useState } from "react"
import { HiPencilAlt, HiTrash } from "react-icons/hi"
import { TableContainer, Tbody, Thead, Th, Td, Table } from "./TableStyles"
import { TableFooter } from ".."
import useTable from "../../hooks/useTable"

const EducationTable = ({ content, rowsPerPage, update, _delete }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Institute name</Th>
					<Th>Degree</Th>
					<Th>Specialization</Th>
					<Th>Date of completion</Th>
					<Th>Update</Th>
					<Th>Delete</Th>
				</Thead>

				<Tbody>
					{slice.map((item) => (
						<tr key={item.id}>
							<Td>{item.institute_name || "Institute name"}</Td>
							<Td>{item.degree || "Degree"}</Td>
							<Td>{item.specialization || "Specialization"}</Td>
							<Td>{item.date_of_completion || "Date of completion"}</Td>
							<Td>
								<HiPencilAlt
									onClick={() => update(item.id)}
									className="text-sky-500 text-lg block  hover:text-sky-800 duration-500 cursor-pointer"
								/>
							</Td>
							<Td>
								<HiTrash
									onClick={() => _delete(item.id)}
									className="text-red-500 text-lg block  hover:text-sky-800 duration-500 cursor-pointer"
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

export default EducationTable
