import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { deductionType, deductionSchedule } from "../../../data/data"
import {
	allDeductions,
	createEmployeeDeduction,
	toastReset,
} from "../../../store/slices/finance/financeSlice"
import {
	LoadingSpinner,
	SubHeading,
	ChipsV2,
	RenderIf,
	WrapperModal,
	SelectTag,
	InputTag,
	Button,
} from "../../../components"
import AllDeductionListTable from "./components/AllDeductionListTable"

const EmployeeAddDeductionPage = () => {
	const [deductionData, setDeductionData] = useState({
		deduction: "",
		amount: 0,
		percentage: 0,
		deduction_type: "0",
		effective_date: "",
		schedule: "",
	})
	const [addEmployeeDeductionModal, setAddEmployeeDeductionModal] =
		useState(false)
	const { isLoading, deductions, success, message, showToast } = useSelector(
		(state) => state.finance
	)
	const { employeeProfile } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const { userID } = useParams()

	const addEmployeeDeductionHandler = (e) => {
		e.preventDefault()
		dispatch(createEmployeeDeduction({ id: userID, content: deductionData }))
		setAddEmployeeDeductionModal(false)
		setDeductionData({
			deduction: "",
			amount: 0,
			percentage: 0,
			deduction_type: "0",
			effective_date: "",
			schedule: "",
		})
	}
	const setDeductioneId = (id) => {
		setAddEmployeeDeductionModal(true)
		setDeductionData((prev) => ({ ...prev, deduction: id }))
	}
	useEffect(() => {
		dispatch(allDeductions())
	}, [dispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])

	if (isLoading) {
		return <LoadingSpinner />
	}
	return (
		<div>
			<RenderIf isTrue={employeeProfile}>
				<ChipsV2 classes="my-4">{employeeProfile?.email}</ChipsV2>
			</RenderIf>
			<SubHeading>Deductions</SubHeading>
			<AllDeductionListTable
				content={deductions}
				rowsPerPage={5}
				onClick={setDeductioneId}
			/>

			{/* Modal to adding allowance for an employee */}
			<RenderIf isTrue={addEmployeeDeductionModal}>
				<WrapperModal
					title="Add employee deduction"
					setShow={setAddEmployeeDeductionModal}
				>
					<form onSubmit={addEmployeeDeductionHandler}>
						<SelectTag
							value={deductionData.deduction_type}
							onChange={(e) =>
								setDeductionData((prev) => ({
									...prev,
									deduction_type: e.target.value,
								}))
							}
							label="Deduction type"
							content={deductionType}
						/>
						{deductionData.deduction_type === "1" && (
							<InputTag
								value={deductionData.amount}
								onChange={(e) =>
									setDeductionData((prev) => ({
										...prev,
										amount: e.target.value,
									}))
								}
								label="Amount"
								placeholder="Enter deduction amount"
								type="number"
							/>
						)}
						{deductionData.deduction_type === "0" && (
							<InputTag
								value={deductionData.percentage}
								onChange={(e) =>
									setDeductionData((prev) => ({
										...prev,
										percentage: e.target.value,
									}))
								}
								label="Percentage"
								placeholder="Enter deduction percentage"
								type="number"
							/>
						)}

						<SelectTag
							value={deductionData.schedule}
							onChange={(e) =>
								setDeductionData((prev) => ({
									...prev,
									schedule: e.target.value,
								}))
							}
							label="Deduction schedule"
							content={deductionSchedule}
						/>
						<InputTag
							value={deductionData.effective_date}
							onChange={(e) =>
								setDeductionData((prev) => ({
									...prev,
									effective_date: e.target.value,
								}))
							}
							label="Effective date"
							placeholder="Enter effective date"
							type="date"
						/>
						<Button type="Submit">Submit</Button>
					</form>
				</WrapperModal>
			</RenderIf>
		</div>
	)
}

export default EmployeeAddDeductionPage
