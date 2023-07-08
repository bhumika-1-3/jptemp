import { TableContainer, Tbody, Thead, Th, Td, Table } from "./TableStyles"
import { Button, TableFooter } from ".."

const AttendanceTableAdmin = ({
	content,
	onClick,
	rowsPerPage,
	pageCount,
	handlePageClick,
	currentPage,
}) => {
	return (
		<TableContainer>
			<Table>
				<Thead>
					<Th>Date</Th>
					<Th>Points</Th>
					<Th>Penalty</Th>
					<Th>Transcript</Th>
				</Thead>

				<Tbody>
					{content.map((item, idx) => (
						<tr key={idx}>
							<Td>
								<span
									onClick={() => onClick(item?.date)}
									className="font-semibold underline hover:opacity-100 opacity-80 cursor-pointer duration-500"
								>
									{item?.date}
								</span>
							</Td>
							<Td>{item?.present}</Td>
							<Td>{item?.absent}</Td>
							<Td><Button>Enter</Button></Td>
						</tr>
					))}
				</Tbody>
			</Table>
			<TableFooter
				rowsPerPage={rowsPerPage}
				count={pageCount}
				handlePageClick={handlePageClick}
				currentPage={currentPage}
			/>
		</TableContainer>
	)
}

export default AttendanceTableAdmin
