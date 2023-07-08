import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import { HiCurrencyRupee, HiCalendar, HiPlusCircle } from "react-icons/hi"
import { FiPercent } from "react-icons/fi"
import {
	fetchEmployeeAllowanceDetail,
	updateEmployeeAllowance,
	toastReset,
} from "../../../store/slices/finance/financeSlice"
import {
	SubHeading,
	Button,
	InputTag,
	SelectTag,
	RenderIf,
	BigText,
	SectionHeader,
	LoadingSpinner,
} from "../../../components"
import { allowanceType, allowanceSchedule } from "../../../data/data"

const EmployeeAllowanceDetails = () => {
	const [updateAllowanceInfo, setUpdateAllowanceInfo] = useState({
		amount: "",
		percentage: "",
		allowance_type: "",
		effective_date: new Date(),
		schedule: "",
	})
	const { isLoading, success, message, showToast, employeeAllowanceDetails } =
		useSelector((state) => state.finance)
	const dispatch = useDispatch()
	const { userID, allowanceId } = useParams()
	// console.log("userid", userID)
	// console.log("allowance id", allowanceId)
	const updateEmployeeAllowanceHandler = () => {
		dispatch(
			updateEmployeeAllowance({
				employeeId: userID,
				allowanceId: allowanceId,
				content: updateAllowanceInfo,
			})
		)
	}

	useEffect(() => {
		dispatch(
			fetchEmployeeAllowanceDetail({
				employeeId: userID,
				allowanceId: allowanceId,
			})
		)
	}, [dispatch, allowanceId, userID])

	useEffect(() => {
		if (employeeAllowanceDetails) {
			const allowanceTypeId = allowanceType.find(
				(item) => item.name === employeeAllowanceDetails.allowance_type
			)
			const allowanceScheduleId = allowanceSchedule.find(
				(item) => item.name === employeeAllowanceDetails.schedule
			)
			console.log("allowa--", allowanceTypeId)
			setUpdateAllowanceInfo({
				amount: employeeAllowanceDetails.amount,
				percentage: employeeAllowanceDetails.percentage,
				allowance_type: allowanceTypeId?.id,
				effective_date: employeeAllowanceDetails.effective_date,
				schedule: allowanceScheduleId?.id,
			})
		}
	}, [employeeAllowanceDetails])

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
			<SectionHeader text="View/Remove details of employee allowance" />
			<BigText>Employee allowance details</BigText>
			<RenderIf isTrue={employeeAllowanceDetails}>
				<div className="mb-4">
					<h3 className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Name:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeAllowanceDetails?.allowance?.name}
						</span>
					</h3>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Description:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeAllowanceDetails?.allowance?.description}
						</span>
					</p>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Amount:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeAllowanceDetails?.amount}
						</span>
					</p>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Percentage:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeAllowanceDetails?.percentage}%
						</span>
					</p>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Allowance type:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeAllowanceDetails?.allowance_type}
						</span>
					</p>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Allowance schedule:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeAllowanceDetails?.schedule}
						</span>
					</p>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Effective date:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeAllowanceDetails?.effective_date}
						</span>
					</p>
				</div>
			</RenderIf>

			{/* Update employee allowance */}
			<SubHeading>Update</SubHeading>
			<form className="max-w-md" onSubmit={updateEmployeeAllowanceHandler}>
				<InputTag
					value={updateAllowanceInfo.amount || ""}
					onChange={(e) =>
						setUpdateAllowanceInfo((prev) => ({
							...prev,
							amount: e.target.value,
						}))
					}
					label="Amount"
					placeholder="Enter allowance amount"
					type="text"
					Icon={HiCurrencyRupee}
				/>
				<InputTag
					value={updateAllowanceInfo.percentage || 0}
					onChange={(e) =>
						setUpdateAllowanceInfo((prev) => ({
							...prev,
							percentage: e.target.value,
						}))
					}
					label="Percentage"
					placeholder="Enter percentage"
					type="number"
					Icon={FiPercent}
				/>
				<SelectTag
					label="Allowance Type"
					value={updateAllowanceInfo.allowance_type || 0}
					onChange={(e) =>
						setUpdateAllowanceInfo((prev) => ({
							...prev,
							allowance_type: e.target.value,
						}))
					}
					content={allowanceType}
					Icon={HiCurrencyRupee}
				/>
				<SelectTag
					label="Allowance schedule"
					value={updateAllowanceInfo.schedule || ""}
					onChange={(e) =>
						setUpdateAllowanceInfo((prev) => ({
							...prev,
							schedule: e.target.value,
						}))
					}
					content={allowanceSchedule}
					Icon={HiCurrencyRupee}
				/>
				<InputTag
					value={updateAllowanceInfo.effective_date || ""}
					onChange={(e) =>
						setUpdateAllowanceInfo((prev) => ({
							...prev,
							effective_date: e.target.value,
						}))
					}
					label="Effective Date"
					placeholder="Enter effective date of allowance"
					type="date"
					Icon={HiCalendar}
				/>
				<Button type="submit" Icon={HiPlusCircle}>
					Update
				</Button>
			</form>
		</div>
	)
}

export default EmployeeAllowanceDetails
