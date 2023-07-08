import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import { HiCurrencyRupee, HiCalendar, HiPlusCircle } from "react-icons/hi"
import { FiPercent } from "react-icons/fi"
import {
	fetchEmployeeDeductionDetail,
	updateEmployeeDeduction,
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
import { deductionSchedule, deductionType } from "../../../data/data"

const EmployeeDeductionDetails = () => {
	const [updateDeductionInfo, setUpdateDeductionInfo] = useState({
		amount: "",
		percentage: "",
		deduction_type: "",
		effective_date: new Date(),
		schedule: "",
	})
	const { isLoading, success, message, showToast, employeeDeductionDetails } =
		useSelector((state) => state.finance)
	const dispatch = useDispatch()
	const { userID, deductionId } = useParams()

	const updateEmployeeDeductionHandler = () => {
		dispatch(
			updateEmployeeDeduction({
				employeeId: userID,
				deductionId: deductionId,
				content: updateDeductionInfo,
			})
		)
	}

	useEffect(() => {
		dispatch(
			fetchEmployeeDeductionDetail({
				employeeId: userID,
				deductionId: deductionId,
			})
		)
	}, [dispatch, deductionId, userID])

	useEffect(() => {
		if (employeeDeductionDetails) {
			const deductionTypeId = deductionType.find(
				(item) => item.name === employeeDeductionDetails.deduction_type
			)
			const deductionScheduleId = deductionSchedule.find(
				(item) => item.name === employeeDeductionDetails.schedule
			)
			setUpdateDeductionInfo({
				amount: employeeDeductionDetails.amount,
				percentage: employeeDeductionDetails.percentage,
				deduction_type: deductionTypeId?.id,
				effective_date: employeeDeductionDetails.effective_date,
				schedule: deductionScheduleId?.id,
			})
		}
	}, [employeeDeductionDetails])

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
			<BigText>Employee deduction details</BigText>
			<RenderIf isTrue={employeeDeductionDetails}>
				<div className="mb-4">
					<h3 className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Name:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeDeductionDetails?.deduction?.name}
						</span>
					</h3>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Description:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeDeductionDetails?.deduction?.description}
						</span>
					</p>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Amount:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeDeductionDetails?.amount}
						</span>
					</p>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Percentage:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeDeductionDetails?.percentage}%
						</span>
					</p>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Deduction type:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeDeductionDetails?.deduction_type}
						</span>
					</p>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Deduction schedule:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeDeductionDetails?.schedule}
						</span>
					</p>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Effective date:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeDeductionDetails?.effective_date}
						</span>
					</p>
				</div>
			</RenderIf>

			{/* Update employee allowance */}
			<SubHeading>Update</SubHeading>
			<form className="max-w-md" onSubmit={updateEmployeeDeductionHandler}>
				<InputTag
					value={updateDeductionInfo.amount || ""}
					onChange={(e) =>
						setUpdateDeductionInfo((prev) => ({
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
					value={updateDeductionInfo.percentage || ""}
					onChange={(e) =>
						setUpdateDeductionInfo((prev) => ({
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
					label="Deduction Type"
					value={updateDeductionInfo.deduction_type || 0}
					onChange={(e) =>
						setUpdateDeductionInfo((prev) => ({
							...prev,
							deduction_type: e.target.value,
						}))
					}
					content={deductionType}
					Icon={HiCurrencyRupee}
				/>
				<SelectTag
					label="Deduction schedule"
					value={updateDeductionInfo.schedule || 0}
					onChange={(e) =>
						setUpdateDeductionInfo((prev) => ({
							...prev,
							schedule: e.target.value,
						}))
					}
					content={deductionSchedule}
					Icon={HiCurrencyRupee}
				/>
				<InputTag
					value={updateDeductionInfo.effective_date || ""}
					onChange={(e) =>
						setUpdateDeductionInfo((prev) => ({
							...prev,
							effective_date: e.target.value,
						}))
					}
					label="Effective Date"
					placeholder="Enter effective date of deduction"
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

export default EmployeeDeductionDetails
