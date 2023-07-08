import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { allowanceType, allowanceSchedule } from "../../../data/data"
import {
	allAllowances,
	createEmployeeAllowance,
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
import AllAllowanceListTable from "./components/AllAllowanceListTable"

const EmployeeAddAllowancePage = () => {
	const [allowanceData, setAllowanceData] = useState({
		allowance: "",
		amount: 0,
		percentage: 0,
		allowance_type: "0",
		effective_date: "",
		schedule: "",
	})
	const [addEmployeeAllowanceModal, setAddEmployeeAllowanceModal] =
		useState(false)
	const { isLoading, allowances, success, message, showToast } = useSelector(
		(state) => state.finance
	)
	const { employeeProfile } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const { userID } = useParams()

	const addEmployeeAllowanceHandler = (e) => {
		e.preventDefault()
		dispatch(createEmployeeAllowance({ id: userID, content: allowanceData }))
		setAddEmployeeAllowanceModal(false)
		setAllowanceData({
			allowance: "",
			amount: 0,
			percentage: 0,
			allowance_type: "0",
			effective_date: "",
			schedule: "",
		})
	}
	const setAllowanceId = (id) => {
		setAddEmployeeAllowanceModal(true)
		setAllowanceData((prev) => ({ ...prev, allowance: id }))
	}
	useEffect(() => {
		dispatch(allAllowances())
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
			<SubHeading>Allowances</SubHeading>
			<AllAllowanceListTable
				content={allowances}
				rowsPerPage={5}
				onClick={setAllowanceId}
			/>

			{/* Modal to adding allowance for an employee */}
			<RenderIf isTrue={addEmployeeAllowanceModal}>
				<WrapperModal
					title="Add employee allowance"
					setShow={setAddEmployeeAllowanceModal}
				>
					<form onSubmit={addEmployeeAllowanceHandler}>
						<SelectTag
							value={allowanceData.allowance_type}
							onChange={(e) =>
								setAllowanceData((prev) => ({
									...prev,
									allowance_type: e.target.value,
								}))
							}
							label="Allowance type"
							content={allowanceType}
						/>
						{allowanceData.allowance_type === "1" && (
							<InputTag
								value={allowanceData.amount}
								onChange={(e) =>
									setAllowanceData((prev) => ({
										...prev,
										amount: e.target.value,
									}))
								}
								label="Amount"
								placeholder="Enter allowance amount"
								type="number"
							/>
						)}
						{allowanceData.allowance_type === "0" && (
							<InputTag
								value={allowanceData.percentage}
								onChange={(e) =>
									setAllowanceData((prev) => ({
										...prev,
										percentage: e.target.value,
									}))
								}
								label="Percentage"
								placeholder="Enter allowance percentage"
								type="number"
							/>
						)}

						<SelectTag
							value={allowanceData.schedule}
							onChange={(e) =>
								setAllowanceData((prev) => ({
									...prev,
									schedule: e.target.value,
								}))
							}
							label="Allowance schedule"
							content={allowanceSchedule}
						/>
						<InputTag
							value={allowanceData.effective_date}
							onChange={(e) =>
								setAllowanceData((prev) => ({
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

export default EmployeeAddAllowancePage
