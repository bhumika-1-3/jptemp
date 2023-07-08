import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import { allowanceType, allowanceSchedule } from "../../../data/data"
// Finance slice
import {
	fetchAllowanceDetail,
	updateAllowance,
	createEmployeeAllowance,
	toastReset,
} from "../../../store/slices/finance/financeSlice"

// all users slice
import { allUsers } from "../../../store/slices/User/userSlice"

// Components
import {
	LoadingSpinner,
	SectionHeader,
	Button,
	SubHeading,
	InputTag,
	SelectTag,
	RenderIf,
	BigText,
	TextareaTag,
	AllUsersTableSmall,
	NoteText,
	WrapperModal,
	ChipsV2,
} from "../../../components"
import {
	HiPlusCircle,
	HiQuestionMarkCircle,
	HiUserCircle,
} from "react-icons/hi"
import { FiType } from "react-icons/fi"

const AllowanceDetails = () => {
	const [newAllowance, setNewAllowance] = useState({
		name: "",
		description: "",
	})
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
	const [empInfo, setEmpInfo] = useState({
		id: "",
		name: "",
	})
	const { isLoading, success, message, showToast, allowanceDetails } =
		useSelector((state) => state.finance)
	const { isLoading: usersLoading, users } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const { allowanceId } = useParams()

	const updateAllowanceHandler = (e) => {
		e.preventDefault()
		dispatch(updateAllowance({ id: allowanceId, content: newAllowance }))
	}

	const showAddEmployeeAllowanceModal = (item) => {
		setEmpInfo({
			id: item.id,
			name: `${item.first_name || ""} ${item.middle_name || ""} ${
				item.last_name || ""
			}`,
		})
		setAddEmployeeAllowanceModal(true)
	}

	const addEmployeeAllowanceHandler = (e) => {
		e.preventDefault()
		dispatch(
			createEmployeeAllowance({ id: empInfo.id, content: allowanceData })
		)
		setAddEmployeeAllowanceModal(false)
		setAllowanceData({
			allowance: allowanceDetails.id,
			amount: 0,
			percentage: 0,
			allowance_type: "0",
			effective_date: "",
			schedule: "",
		})
		setEmpInfo({
			id: "",
			name: "",
		})
	}
	useEffect(() => {
		dispatch(fetchAllowanceDetail(allowanceId))
		dispatch(allUsers())
	}, [dispatch, allowanceId])

	useEffect(() => {
		if (allowanceDetails) {
			setNewAllowance({
				name: allowanceDetails.name,
				description: allowanceDetails.description,
			})
			setAllowanceData((prev) => ({ ...prev, allowance: allowanceDetails.id }))
		}
	}, [allowanceDetails])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])

	if (isLoading || usersLoading) {
		return <LoadingSpinner />
	}
	return (
		<div>
			<SectionHeader text="Allowance details and add employees to allowances" />
			<BigText>Allowance details</BigText>
			<div className="mb-4">
				<h3 className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
					Name:{" "}
					<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
						{allowanceDetails?.name}
					</span>
				</h3>
				<p className="text-slate-500 dark:text-slate-400 font-bold">
					Description:{" "}
					<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
						{allowanceDetails?.description}
					</span>
				</p>
			</div>

			<SubHeading>Update allowance info</SubHeading>
			<form onSubmit={updateAllowanceHandler}>
				<InputTag
					Icon={FiType}
					label="Name"
					placeholder="Enter allowance name"
					value={newAllowance.name || ""}
					onChange={(e) =>
						setNewAllowance((prev) => ({ ...prev, name: e.target.value }))
					}
				/>
				<TextareaTag
					Icon={HiQuestionMarkCircle}
					label="Description"
					placeholder="Enter allowance description"
					value={newAllowance.description || ""}
					onChange={(e) =>
						setNewAllowance((prev) => ({
							...prev,
							description: e.target.value,
						}))
					}
				/>
				<Button Icon={HiPlusCircle} type="submit">
					Update
				</Button>
			</form>

			<div className="my-6 ">
				<SubHeading>Give employees allowances</SubHeading>
				<NoteText>Click on employee name to select</NoteText>
				<AllUsersTableSmall
					content={users}
					rowsPerPage={5}
					onClick={showAddEmployeeAllowanceModal}
				/>
			</div>

			{/* Add employee allowance modal */}
			<RenderIf isTrue={addEmployeeAllowanceModal}>
				<WrapperModal
					title="Add employee allowance"
					setShow={setAddEmployeeAllowanceModal}
				>
					<ChipsV2
						classes="mb-3   border border-transparent dark:border-slate-50/[0.06]"
						Icon={HiUserCircle}
					>
						{empInfo?.name}
					</ChipsV2>

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

export default AllowanceDetails
