import { useSelector } from "react-redux"
import React, { useMemo } from "react"
import ReactPaginate from "react-paginate"
import { HiChevronRight, HiChevronLeft } from "react-icons/hi"

const TableFooter = ({ rowsPerPage, count, handlePageClick, currentPage }) => {
	const { currentTheme, colors } = useSelector((state) => state.theme)

	const pages = useMemo(() => {
		return Math.ceil(count / rowsPerPage)
	}, [count, rowsPerPage])

	return (
		<ReactPaginate
			forcePage={currentPage}
			breakLabel="..."
			nextLabel={<HiChevronRight />}
			onPageChange={(e) => {
				handlePageClick(e)
			}}
			pageRangeDisplayed={5}
			pageCount={pages}
			previousLabel={<HiChevronLeft />}
			renderOnZeroPageCount={null}
			className={`px-4 py-2 flex items-center ${
				currentTheme ? colors.bg[currentTheme].light : "bg-purple-100"
			} dark:customPurpleBg_2`}
			pageLinkClassName={`bg-white dark:bg-purple_5 px-3 py-1 mr-2 rounded-lg  dark:text-slate-200 text-sm font-bold  shadow-md border borderColor dark:bg-purple-800`}
			activeLinkClassName={"bg-red-800 block py-3"}
			nextLinkClassName={
				"text-2xl ml-6 block text-slate-500 hover:text-slate-800"
			}
			previousLinkClassName={
				"text-2xl mr-6 block text-slate-500 hover:text-slate-800"
			}
		/>
	)
}

export default React.memo(TableFooter)
