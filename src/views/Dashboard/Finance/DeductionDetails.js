import React from "react"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import {
	fetchDeductionDetail,
	updateDeduction,
	createEmployeeDeduction,
	toastReset,
} from "../../../store/slices/finance/financeSlice"
// All users slice
import { allUsers } from "../../../store/slices/User/userSlice"
// data
import { deductionType, deductionSchedule } from "../../../data/data"
// Components
import {
	LoadingSpinner,
	SectionHeader,
	Button,
	SubHeading,
	InputTag,
	BigText,
	TextareaTag,
	NoteText,
	AllUsersTableSmall,
	RenderIf,
	WrapperModal,
	SelectTag,
	ChipsV2,
} from "../../../components"
import {
	HiPlusCircle,
	HiQuestionMarkCircle,
	HiUserCircle,
} from "react-icons/hi"
import { FiType } from "react-icons/fi"

const DeductionDetails = () => {
	const [newDeduction, setNewDeduction] = useState({
		name: "",
		description: "",
	})
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
	const [empInfo, setEmpInfo] = useState({
		id: "",
		name: "",
	})
	const { isLoading, success, message, showToast, deductionDetails } =
		useSelector((state) => state.finance)
	const { isLoading: usersLoading, users } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const { deductionId } = useParams()

	const updateDeductionHandler = (e) => {
		e.preventDefault()
		dispatch(updateDeduction({ id: deductionId, content: newDeduction }))
	}

	const showAddEmployeeDeductionModal = (item) => {
		setEmpInfo({
			id: item.id,
			name: `${item.first_name || ""} ${item.middle_name || ""} ${
				item.last_name || ""
			}`,
		})
		setAddEmployeeDeductionModal(true)
	}

	const addEmployeeDeductionHandler = (e) => {
		e.preventDefault()
		dispatch(
			createEmployeeDeduction({ id: empInfo.id, content: deductionData })
		)
		setAddEmployeeDeductionModal(false)
		setDeductionData({
			deduction: deductionDetails.id,
			amount: 0,
			percentage: 0,
			deduction_type: "0",
			effective_date: "",
			schedule: "",
		})
		setEmpInfo({
			id: "",
			name: "",
		})
	}

	useEffect(() => {
		dispatch(fetchDeductionDetail(deductionId))
		dispatch(allUsers())
	}, [dispatch, deductionId])

	useEffect(() => {
		if (deductionDetails) {
			setNewDeduction({
				name: deductionDetails.name,
				description: deductionDetails.description,
			})
			setDeductionData((prev) => ({ ...prev, deduction: deductionDetails.id }))
		}
	}, [deductionDetails])

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
			<BigText>Deduction details</BigText>
			<div className="mb-4">
				<h3 className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
					Name:{" "}
					<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
						{deductionDetails?.name}
					</span>
				</h3>
				<p className="text-slate-500 dark:text-slate-400 font-bold">
					Description:{" "}
					<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
						{deductionDetails?.description}
					</span>
				</p>
			</div>

			<SubHeading>Update deduction info</SubHeading>
			<form onSubmit={updateDeductionHandler}>
				<InputTag
					Icon={FiType}
					label="Name"
					placeholder="Enter deduction name"
					value={newDeduction.name}
					onChange={(e) =>
						setNewDeduction((prev) => ({ ...prev, name: e.target.value }))
					}
				/>
				<TextareaTag
					Icon={HiQuestionMarkCircle}
					label="Description"
					placeholder="Enter deduction description"
					value={newDeduction.description}
					onChange={(e) =>
						setNewDeduction((prev) => ({
							...prev,
							description: e.target.value,
						}))
					}
				/>
				<Button Icon={HiPlusCircle} type="submit">
					Update
				</Button>
			</form>

			<div className="my-6">
				<SubHeading>Give employees deduction</SubHeading>
				<NoteText>Click on employee name to select</NoteText>
				<AllUsersTableSmall
					content={users}
					rowsPerPage={5}
					onClick={showAddEmployeeDeductionModal}
				/>
			</div>

			{/* Add employee deduction modal */}
			<RenderIf isTrue={addEmployeeDeductionModal}>
				<WrapperModal
					title="Add employee allowance"
					setShow={setAddEmployeeDeductionModal}
				>
					<ChipsV2
						classes="mb-3  border border-transparent dark:border-slate-50/[0.06]"
						Icon={HiUserCircle}
					>
						{empInfo?.name}
					</ChipsV2>

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
								placeholder="Enter Deduction amount"
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

export default DeductionDetails
