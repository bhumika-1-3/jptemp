import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { HiPlusCircle, HiCurrencyRupee, HiCalendar } from "react-icons/hi"
import { FiPercent } from "react-icons/fi"
import {
	SectionHeader,
	Button,
	SubHeading,
	InputTag,
	SelectTag,
	FadedText,
	RenderIf,
	LoadingSpinner,
} from "../../../components"
import {
	fetchEmployeeEarning,
	updateEmployeeEarning,
} from "../../../store/slices/finance/financeSlice"
import { salarySchedule, salaryType } from "../../../data/data"

const EmployeeEarning = ({ userId }) => {
	const [earningInfo, setEarningInfo] = useState({
		amount: "",
		basic_earning_percentage: "",
		earning_type: "",
		schedule: "",
	})
	const { isLoading, employeeEarning } = useSelector((state) => state.finance)
	const dispatch = useDispatch()

	const updateEmployeeEarningHandler = (e) => {
		e.preventDefault()
		dispatch(updateEmployeeEarning({ userId: userId, content: earningInfo }))
	}

	useEffect(() => {
		dispatch(fetchEmployeeEarning(userId))
	}, [dispatch, userId])

	useEffect(() => {
		const salaryTypeId = salaryType.find(
			(item) => item.id === employeeEarning.earning_type
		)
		const salaryScheduleId = salarySchedule.find(
			(item) => item.name === employeeEarning.schedule
		)
		console.log("ear--", salaryTypeId)
		setEarningInfo({
			amount: employeeEarning.amount || 0,
			basic_earning_percentage: employeeEarning.basic_earning_percentage || 0,
			earning_type: salaryTypeId?.id || "0",
			schedule: salaryScheduleId?.id || 0,
		})
	}, [employeeEarning])

	if (isLoading) {
		return <LoadingSpinner />
	}
	return (
		<div>
			<SectionHeader text="View/modify employee's earning" />
			<SubHeading>Earnings</SubHeading>
			<RenderIf isTrue={employeeEarning}>
				<div className="mb-4">
					<h3 className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Amount:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeEarning?.amount}
						</span>
					</h3>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Basic earning percentage:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeEarning?.basic_earning_percentage}
						</span>
					</p>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Earning type:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeEarning?.earning_type}
						</span>
					</p>
					<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
						Schedule:{" "}
						<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
							{employeeEarning?.schedule}
						</span>
					</p>
				</div>
			</RenderIf>
			<RenderIf isTrue={!employeeEarning}>
				<FadedText>No earnings found</FadedText>
			</RenderIf>

			<SubHeading>Update</SubHeading>
			<form onSubmit={updateEmployeeEarningHandler} className="max-w-md">
				<SelectTag
					Icon={HiCalendar}
					label="Salary Type"
					value={earningInfo.earning_type}
					onChange={(e) =>
						setEarningInfo((prev) => ({
							...prev,
							earning_type: e.target.value,
						}))
					}
					content={salaryType}
				/>

				<InputTag
					Icon={HiCurrencyRupee}
					label="Amount"
					placeholder="Enter employee earning amount"
					type="text"
					value={earningInfo.amount}
					onChange={(e) =>
						setEarningInfo((prev) => ({ ...prev, amount: e.target.value }))
					}
				/>

				<InputTag
					Icon={FiPercent}
					label="Basic earning percentage"
					placeholder="Enter employee basic earning percentage"
					type="number"
					value={earningInfo.basic_earning_percentage}
					onChange={(e) =>
						setEarningInfo((prev) => ({
							...prev,
							basic_earning_percentage: e.target.value,
						}))
					}
				/>

				<SelectTag
					Icon={HiCalendar}
					label="Salary schedule"
					value={earningInfo.schedule}
					onChange={(e) =>
						setEarningInfo((prev) => ({
							...prev,
							schedule: e.target.value,
						}))
					}
					content={salarySchedule}
				/>
				<Button type="submit" Icon={HiPlusCircle}>
					Update
				</Button>
			</form>
		</div>
	)
}

export default EmployeeEarning
