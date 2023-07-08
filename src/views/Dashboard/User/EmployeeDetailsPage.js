import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
	HiLockOpen,
	HiPlus,
	HiUserGroup,
	HiPlusSm,
	HiPlusCircle,
} from "react-icons/hi"
import { toast } from "react-toastify"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "../../../assets/styles/react-tabs.css"
import {
	Button,
	SectionHeader,
	BigText,
	NoteText,
	LoadingSpinner,
	SubHeading,
	CardSmall,
	RenderIf,
	FadedText,
	WrapperModal,
	SelectTag,
	EmployeeAllowanceTable,
	TransitionBtoT,
} from "../../../components"
import EmployeeEarning from "./EmployeeEarning"
import EmployeePayroll from "./EmployeePayroll"
import EmployeeProfileAdmin from "./EmployeeProfileAdmin"
import EmployeeAttendanceAdmin from "./EmployeeAttendanceAdmin"
import EmployeeExpenses from "./EmployeeExpenses"
import {
	individualUserPermissions,
	updateIndividualUserPermissions,
	allPermissions,
	toastReset,
	addToGroup,
	allGroups,
	fetchEmployeerProfile,
} from "../../../store/slices/User/userSlice"
import {
	allAllowancesEmployee,
	toastReset as financeToastReset,
	allDeductionsEmployee,
	deleteEmployeeAllowance,
	deleteEmployeeDeduction,
} from "../../../store/slices/finance/financeSlice"

const EmployeeDetailsPage = () => {
	const [showUserPermission, setShowUserPermission] = useState(false)
	const [selectedPermissions, setSelectedPermissions] = useState([])
	const [selectedGroup, setSelectedGroup] = useState("")
	const {
		isLoading,
		userPermissions,
		permissions,
		success,
		message,
		showToast,
		groups,
	} = useSelector((state) => state.user)
	const {
		isLoading: financeLoading,
		employeeDeductions,
		employeeAllowances,
		success: financeSuccess,
		message: financeMessage,
		showToast: financeShowToast,
	} = useSelector((state) => state.finance)
	const dispatch = useDispatch()
	const { userID } = useParams()
	const navigate = useNavigate()

	const permissionsHandler = (id, e) => {
		if (!selectedPermissions.includes(id)) {
			setSelectedPermissions((prev) => [...prev, id])
			return
		}
		if (selectedPermissions.includes(id) && !e.target.checked) {
			const newArr = selectedPermissions.filter((item) => item !== id)
			setSelectedPermissions(newArr)
		}
	}

	let checkedHandler = (id) => {
		const res = userPermissions?.permissions?.find((item) => item.id === id)
		if (res) {
			return true
		}
		return false
	}

	const updateUserPermissions = (e) => {
		e.preventDefault()
		dispatch(
			updateIndividualUserPermissions({
				id: userPermissions.id,
				data: {
					permissions: selectedPermissions,
				},
			})
		)
		setSelectedPermissions([])
		setShowUserPermission(false)
	}

	// Add  user to a group handler
	const groupUserAdd = (e) => {
		e.preventDefault()
		dispatch(addToGroup({ groupId: selectedGroup, userId: userID }))
	}

	// Remove employee allowance handler
	const removeEmployeeAllowanceHandler = (data) => {
		dispatch(deleteEmployeeAllowance({ employeeId: userID, allowanceId: data }))
		dispatch(allAllowancesEmployee(userID))
	}
	// Remove employee deduction handler
	const removeEmployeeDeductionHandler = (data) => {
		dispatch(deleteEmployeeDeduction({ employeeId: userID, deductionId: data }))
		dispatch(allDeductionsEmployee(userID))
	}
	// Navigate to employee allowance detail page on click
	const navigateToEmployeeAllowanceDetails = (data) => {
		// navigate(`/admin/finance/employee-allowance-details/${userID}/${data}`)
		navigate(`employee-allowance-details/${data}`)
	}
	// Navigate to employee allowance detail page on click
	const navigateToEmployeeDeductionDetails = (data) => {
		// navigate(`/dashboard/finance/employee-deduction-details/${userID}/${data}`)
		navigate(`employee-deduction-details/${data}`)
	}
	const navigateToAddAllowanceToEmployee = () => {
		navigate(`add-allowance`)
	}
	const navigateToAddDeductionToEmployee = () => {
		navigate(`add-deduction`)
	}
	useEffect(() => {
		dispatch(individualUserPermissions(userID))
		dispatch(allPermissions())
		dispatch(allGroups())
		dispatch(allAllowancesEmployee(userID))
		dispatch(allDeductionsEmployee(userID))
		dispatch(fetchEmployeerProfile(userID))
	}, [dispatch, userID])

	useEffect(() => {
		if (userPermissions?.permissions)
			setSelectedPermissions(userPermissions.permissions.map((item) => item.id))
	}, [userPermissions])

	useEffect(() => {
		if (showToast || financeShowToast) {
			toast[success || financeSuccess ? "success" : "error"](
				message || financeMessage
			)
		}
		return () => {
			dispatch(toastReset())
			dispatch(financeToastReset())
		}
	}, [
		showToast,
		message,
		dispatch,
		success,
		financeShowToast,
		financeMessage,
		financeSuccess,
	])

	if (isLoading) {
		return <LoadingSpinner />
	}

	return (
		<div className="-mt-4">
			<BigText>Employee details</BigText>

			{/* <ChipsV2 Icon={HiUserCircle} classes="mb-4 -mt-1">
				{userPermissions?.email}
			</ChipsV2> */}
			<RenderIf isTrue={financeLoading}>
				<LoadingSpinner />
			</RenderIf>
			<Tabs selectedTabClassName="tabs-styles">
				<TabList className="tab_list-styles ">
					<Tab className="tab-styles">Profile</Tab>
					<Tab className="tab-styles">Permissions</Tab>
					<Tab className="tab-styles">Group</Tab>
					<Tab className="tab-styles">Attendance</Tab>
					<Tab className="tab-styles">Allowances</Tab>
					<Tab className="tab-styles">Deductions</Tab>
					<Tab className="tab-styles">Earnings</Tab>
					<Tab className="tab-styles">Payroll</Tab>
					<Tab className="tab-styles">Expenses</Tab>
				</TabList>
				<TabPanel>
					<EmployeeProfileAdmin userId={userID} />
				</TabPanel>
				<TabPanel>
					<SectionHeader text="View/modify employee permission and groups">
						<Button Icon={HiPlus} onClick={() => setShowUserPermission(true)}>
							Update user permissions
						</Button>
					</SectionHeader>
					<SubHeading>His/her permissions</SubHeading>
					<div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
						{userPermissions?.permissions?.map((item, idx) => (
							<TransitionBtoT key={item?.id}>
								<CardSmall idx={idx + 1} name={item.name} />
							</TransitionBtoT>
						))}
					</div>
					<RenderIf
						isTrue={userPermissions && userPermissions?.permissions?.length < 1}
					>
						<FadedText>No permission found</FadedText>
					</RenderIf>
				</TabPanel>
				<TabPanel>
					{/* Employee in group */}
					<div className="my-6 max-w-210-px">
						<SubHeading>Add/Remove from group</SubHeading>
						<NoteText>Add to a group</NoteText>
						<form onSubmit={groupUserAdd}>
							<SelectTag
								value={selectedGroup}
								onChange={(e) => setSelectedGroup(e.target.value)}
								label="Select a group"
								Icon={HiUserGroup}
								content={groups}
							/>
							<div className="mt-5">
								<Button type="submit" Icon={HiPlusSm}>
									Add
								</Button>
							</div>
						</form>
					</div>
				</TabPanel>
				<TabPanel>
					<EmployeeAttendanceAdmin userId={userID} />
				</TabPanel>
				<TabPanel>
					<SectionHeader>
						<Button
							onClick={navigateToAddAllowanceToEmployee}
							Icon={HiPlusCircle}
						>
							Add Allowance
						</Button>
					</SectionHeader>
					{/* Allowances */}
					<div className="mb-6 max-w-screen-lg">
						<SubHeading>Allowances</SubHeading>
						<RenderIf
							isTrue={!employeeAllowances || employeeAllowances.length < 1}
						>
							<FadedText>No allowance found</FadedText>
						</RenderIf>
						<RenderIf
							isTrue={employeeAllowances && employeeAllowances.length > 0}
						>
							<EmployeeAllowanceTable
								content={employeeAllowances}
								rowsPerPage={5}
								_delete={removeEmployeeAllowanceHandler}
								onClick={navigateToEmployeeAllowanceDetails}
							/>
						</RenderIf>
					</div>
				</TabPanel>
				<TabPanel>
					<SectionHeader>
						<Button
							onClick={navigateToAddDeductionToEmployee}
							Icon={HiPlusCircle}
						>
							Add Deduction
						</Button>
					</SectionHeader>
					{/* Deductions */}
					<div className="mb-6 max-w-screen-lg">
						<SubHeading>Deductions</SubHeading>
						<RenderIf
							isTrue={!employeeDeductions || employeeDeductions.length < 1}
						>
							<FadedText>No deduction found</FadedText>
						</RenderIf>
						<RenderIf
							isTrue={employeeDeductions && employeeDeductions.length > 0}
						>
							<EmployeeAllowanceTable
								content={employeeDeductions}
								rowsPerPage={5}
								isDeduction
								_delete={removeEmployeeDeductionHandler}
								onClick={navigateToEmployeeDeductionDetails}
							/>
						</RenderIf>
					</div>
				</TabPanel>
				<TabPanel>
					<EmployeeEarning userId={userID} />
				</TabPanel>
				<TabPanel>
					<EmployeePayroll userId={userID} />
				</TabPanel>
				<TabPanel>
					<EmployeeExpenses userId={userID} />
				</TabPanel>
			</Tabs>

			{/* User permission modal */}
			<RenderIf isTrue={showUserPermission}>
				<WrapperModal
					title="Update user permissions"
					setShow={setShowUserPermission}
				>
					<form onSubmit={updateUserPermissions}>
						<h4 className=" text-blueGray-600 dark:text-slate-400 text-sm font-normal mb-2 mt-6 flex items-center">
							<HiLockOpen className="mr-2" />
							Permissions
						</h4>
						<div className="grid grid-cols-3 gap-4">
							{permissions?.map((item) => (
								<div key={item.id}>
									<label className="flex items-center text-slate-600 dark:text-slate-300 text-md px-2 py-1 rounded-md shadow-cardShadow dark:bg-purple-900/20 cursor-pointer">
										<input
											defaultChecked={checkedHandler(item.id)}
											type="checkbox"
											onChange={(e) => permissionsHandler(item.id, e)}
											className="mr-2"
										/>
										{item.name}
									</label>
								</div>
							))}
						</div>
						<div className="mt-6">
							<Button type="submit">Update</Button>
						</div>
					</form>
				</WrapperModal>
			</RenderIf>
		</div>
	)
}

export default EmployeeDetailsPage
