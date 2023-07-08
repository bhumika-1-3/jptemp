import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { HiPhotograph, HiCurrencyRupee, HiPlusCircle } from "react-icons/hi"
import { FiType } from "react-icons/fi"

import {
	fetchAllExpensesEmployee,
	toastReset,
	createExpenseEmployee,
	fetchEmployeeExpenseDetails,
	updateExpenseEmployee,
} from "../../../store/slices/finance/financeSlice"

import {
	SectionHeader,
	Button,
	WrapperModal,
	RenderIf,
	TextareaTag,
	LoadingSpinner,
	InputTag,
	NoteText,
	FadedText,
} from "../../../components"
import AllExpensesTable from "./components/AllExpensesTable"

const Expenses = () => {
	const [createModal, setCreateModal] = useState(false)
	const [detailsModal, setDetailsModal] = useState(false)
	const [updateModal, setUpdateModal] = useState(false)
	const [filter, setFilter] = useState(null)
	const [expenseInfo, setExpenseInfo] = useState({
		image: "",
		amount: "",
		description: "",
	})
	const [expenseUpdate, setExpenseUpdate] = useState({
		amount: "",
		description: "",
	})
	const [updateImage, setUpdateImage] = useState(null)
	const {
		showToast,
		success,
		message,
		isLoading,
		allExpensesEmployee,
		employeeExpenseDetails,
	} = useSelector((state) => state.finance)
	const dispatch = useDispatch()

	const createNewExpenseHandler = (e) => {
		e.preventDefault()
		dispatch(createExpenseEmployee(expenseInfo))
		setCreateModal(false)
	}

	const expenseDetailsHandler = (item) => {
		dispatch(fetchEmployeeExpenseDetails(item?.id))
		setDetailsModal(true)
	}

	const showEditModalHandler = (item) => {
		dispatch(fetchEmployeeExpenseDetails(item?.id))
		setUpdateModal(true)
	}
	console.log("image", expenseInfo)

	const updateExpenseHandler = (e) => {
		e.preventDefault()
		if (updateImage === null) {
			dispatch(
				updateExpenseEmployee({
					id: employeeExpenseDetails?.id,
					content: { ...expenseUpdate },
				})
			)
			setUpdateModal(false)
		} else {
			dispatch(
				updateExpenseEmployee({
					id: employeeExpenseDetails?.id,
					content: { ...expenseUpdate, image: updateImage },
				})
			)
			setUpdateModal(false)
			setUpdateImage(null)
		}
	}

	useEffect(() => {
		if (employeeExpenseDetails) {
			setExpenseUpdate({
				amount: employeeExpenseDetails?.amount || "",
				description: employeeExpenseDetails?.description || "",
			})
		}
	}, [employeeExpenseDetails])

	useEffect(() => {
		dispatch(fetchAllExpensesEmployee(filter))
	}, [dispatch, filter])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	return (
		<>
			<SectionHeader>
				<Button onClick={() => setCreateModal(true)}>Add Expense</Button>
			</SectionHeader>
			<RenderIf isTrue={createModal}>
				<WrapperModal title="Add new expense" setShow={setCreateModal}>
					<form onSubmit={createNewExpenseHandler}>
						<InputTag
							// value={expenseInfo.image}
							onChange={(e) =>
								setExpenseInfo((prev) => ({
									...prev,
									image: e.target.files[0],
								}))
							}
							label="Image"
							Icon={HiPhotograph}
							type="file"
						/>
						<InputTag
							value={expenseInfo.amount}
							onChange={(e) =>
								setExpenseInfo((prev) => ({ ...prev, amount: e.target.value }))
							}
							label="Amount"
							placeholder="Enter amount..."
							Icon={HiCurrencyRupee}
							type="number"
						/>
						<TextareaTag
							value={expenseInfo.description}
							onChange={(e) =>
								setExpenseInfo((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
							label="Description"
							placeholder="Enter expense description"
							Icon={FiType}
						/>
						<Button type="submit" Icon={HiPlusCircle}>
							Create
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			{/* Modal for updating expenses */}
			<RenderIf isTrue={updateModal}>
				<WrapperModal title="Update expense" setShow={setUpdateModal}>
					<form onSubmit={updateExpenseHandler}>
						<InputTag
							// value={expenseInfo.image}
							onChange={(e) => setUpdateImage(e.target.files[0])}
							label="Image"
							Icon={HiPhotograph}
							type="file"
							notRequired
						/>
						<InputTag
							value={expenseUpdate.amount}
							onChange={(e) =>
								setExpenseUpdate((prev) => ({
									...prev,
									amount: e.target.value,
								}))
							}
							label="Amount"
							placeholder="Enter amount..."
							Icon={HiCurrencyRupee}
							type="number"
						/>
						<TextareaTag
							value={expenseUpdate.description}
							onChange={(e) =>
								setExpenseUpdate((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
							label="Description"
							placeholder="Enter expense description"
							Icon={FiType}
						/>
						<Button type="submit" Icon={HiPlusCircle}>
							Update
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			{/* Expense details modal */}
			<RenderIf isTrue={detailsModal}>
				<WrapperModal setShow={setDetailsModal}>
					<div className="rounded-xl overflow-hidden mt-5">
						<img
							src={employeeExpenseDetails?.image}
							alt={employeeExpenseDetails?.description}
						/>
					</div>
					<h3 className="font-semibold text-slate-700 text-xl flex items-center dark:text-slate-200 mt-3">
						<HiCurrencyRupee className="mr-1" />
						{employeeExpenseDetails?.amount}
					</h3>
					<p className="text-slate-600 dark:text-slate-300">
						{employeeExpenseDetails?.description}
					</p>
				</WrapperModal>
			</RenderIf>

			{/* Filters */}
			<div className="mt-4 mb-5">
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

			{/* All expenses table */}
			<RenderIf isTrue={allExpensesEmployee && allExpensesEmployee?.length > 0}>
				<NoteText>Click on image to see details</NoteText>
				<div className="max-w-4xl">
					<AllExpensesTable
						content={allExpensesEmployee}
						rowsPerPage={10}
						onClick={expenseDetailsHandler}
						update={showEditModalHandler}
					/>
				</div>
			</RenderIf>

			<RenderIf
				isTrue={allExpensesEmployee?.length < 1 || !allExpensesEmployee}
			>
				<FadedText>Found Nothing!</FadedText>
			</RenderIf>

			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</>
	)
}

export default Expenses
