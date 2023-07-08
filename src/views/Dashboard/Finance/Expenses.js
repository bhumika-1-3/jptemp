import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { toast } from "react-toastify"
import { HiCurrencyRupee } from "react-icons/hi"
import {
	fetchAllExpenses,
	// toastReset,
	fetchExpensesDetails,
	updateExpenses,
} from "../../../store/slices/finance/financeSlice"

import {
	WrapperModal,
	RenderIf,
	LoadingSpinner,
	NoteText,
	SubHeading,
} from "../../../components"

import ExpensesTable from "./components/ExpensesTable"

const Expenses = () => {
	const [detailsModal, setDetailsModal] = useState(false)
	const [filter, setFilter] = useState(null)
	const { allExpenses, expenseDetails, isLoading } = useSelector(
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
			dispatch(fetchAllExpenses())
		}, 500)
	}

	useEffect(() => {
		dispatch(fetchAllExpenses(filter))
	}, [dispatch, filter])

	// useEffect(() => {
	// 	if (showToast) {
	// 		toast[success ? "success" : "error"](message)
	// 	}
	// 	return () => dispatch(toastReset())
	// }, [showToast, message, dispatch, success])
	return (
		<div>
			<SubHeading>All the expenses</SubHeading>
			{/* Filters */}
			<div className="mb-5">
				<NoteText>Filters</NoteText>
				<select
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="py-1 rounded-2xl border borderColor block dark:bg-purple_5 shadow-sm dark:shadow-lg"
				>
					<option value="">Select</option>
					<option value={1}>Filter all cleared expenses</option>
					<option value={0}>Filter all not cleared expenses</option>
				</select>
			</div>
			<RenderIf isTrue={allExpenses && allExpenses?.length > 0}>
				<NoteText>Click on image to see details</NoteText>
				<div className="max-w-4xl">
					<ExpensesTable
						content={allExpenses}
						rowsPerPage={10}
						onClick={expenseDetailsHandler}
						update={expenseUpdateHanlder}
					/>
				</div>
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
						<HiCurrencyRupee className="mr-1" />
						{expenseDetails?.amount}
					</h3>
					<p className="text-slate-600 dark:text-slate-300">
						{expenseDetails?.description}
					</p>
				</WrapperModal>
			</RenderIf>

			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</div>
	)
}

export default Expenses
