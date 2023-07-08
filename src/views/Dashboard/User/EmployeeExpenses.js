import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	fetchExpensesByEmployee,
	fetchExpensesDetails,
	updateExpenses,
} from "../../../store/slices/finance/financeSlice"

import {
	WrapperModal,
	RenderIf,
	NoteText,
	FadedText,
	SubHeading,
} from "../../../components"
import EmployeeExpensesTable from "./components/EmployeeExpensesTable"
const EmployeeExpenses = ({ userId }) => {
	const [detailsModal, setDetailsModal] = useState(false)
	const { individualEmployeeExpenses, expenseDetails } = useSelector(
		(state) => state.finance
	)
	const dispatch = useDispatch()

	const expenseDetailsHandler = (item) => {
		dispatch(fetchExpensesDetails(item?.id))
		setDetailsModal(true)
	}

	const expenseUpdateHanlder = (item, value) => {
		dispatch(updateExpenses({ id: item?.id, content: { is_cleared: value } }))
		setTimeout(() => {
			dispatch(fetchExpensesByEmployee(userId))
		}, 500)
	}

	useEffect(() => {
		dispatch(fetchExpensesByEmployee(userId))
	}, [dispatch, userId])
	return (
		<div>
			{/* All expenses table */}
			<SubHeading>All the expenses</SubHeading>
			<RenderIf
				isTrue={
					individualEmployeeExpenses && individualEmployeeExpenses?.length > 0
				}
			>
				<NoteText>Click on image to see details</NoteText>
				<div className="max-w-4xl">
					<EmployeeExpensesTable
						content={individualEmployeeExpenses}
						rowsPerPage={10}
						onClick={expenseDetailsHandler}
						update={expenseUpdateHanlder}
					/>
				</div>
			</RenderIf>

			<RenderIf
				isTrue={
					individualEmployeeExpenses?.length < 1 || !individualEmployeeExpenses
				}
			>
				<FadedText>Found Nothing!</FadedText>
			</RenderIf>

			{/* Expense details modal */}
			<RenderIf isTrue={detailsModal}>
				<WrapperModal setShow={setDetailsModal}>
					<div className="rounded-xl overflow-hidden mt-5">
						<img
							src={expenseDetails?.image}
							alt={expenseDetails?.description}
						/>
					</div>
					<h3 className="font-semibold text-slate-700 text-xl flex items-center dark:text-slate-200 mt-3">
						&#8377;
						{expenseDetails?.amount}
					</h3>
					<p className="text-slate-600 dark:text-slate-300">
						{expenseDetails?.description}
					</p>
				</WrapperModal>
			</RenderIf>
		</div>
	)
}

export default EmployeeExpenses
