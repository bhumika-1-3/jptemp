import { useState } from "react"
import { HiPencilAlt, HiTrash } from "react-icons/hi"
import { TableContainer, Tbody, Thead, Th, Td, Table } from "./TableStyles"
import { TableFooter } from ".."
import useTable from "../../hooks/useTable"

const WorkExperienceTable = ({ content, rowsPerPage, update, _delete }) => {
	const [page, setPage] = useState(1)
	const { slice, range } = useTable(content, page, rowsPerPage)
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Previous company</Th>
					<Th>Job title</Th>
					<Th>Start date</Th>
					<Th>End date</Th>
					<Th>Job description</Th>
					<Th>Update</Th>
					<Th>Delete</Th>
				</Thead>

				<Tbody>
					{slice.map((item) => (
						<tr key={item.id}>
							<Td>{item.previous_company_name || "Company name"}</Td>
							<Td>{item.job_title || "Job title"}</Td>
							<Td>{item.start_date || "Start date"}</Td>
							<Td>{item.end_date || "End date"}</Td>
							<Td>{item.job_description || "Job description"}</Td>
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

export default WorkExperienceTable
