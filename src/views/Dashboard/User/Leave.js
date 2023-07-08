import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { HiOutlineSearch, HiUserCircle } from "react-icons/hi"
import {
	SubHeading,
	WrapperModal,
	RenderIf,
	Button,
	SectionHeader,
	SelectTag,
	LeaveTableAdmin,
	InputTag,
	LoadingSpinner,
	ChipsV2,
} from "../../../components"
import {
	allLeaves,
	fetchLeavesByEmployee,
	fetchLeaveDetails,
	updateDetail,
	toastReset,
} from "../../../store/slices/Attendance/attendanceSlice"
import { allUsers } from "../../../store/slices/User/userSlice"

const Leave = () => {
	const [leaveFilter, setLeaveFilters] = useState(1)
	const [userLeaveFilter, setUserLeaveFilters] = useState(1)
	const [userId, setUserId] = useState("")
	const [leaveModal, setLeaveModal] = useState(false)
	const [leaveDetailData, setLeaveDetailData] = useState({
		review_reason: "",
		review_status: "",
	})
	const {
		isLoading,
		showToast,
		leaves,
		leaveDetails,
		leavesByEmployee,
		message,
		success,
	} = useSelector((state) => state.attendance)
	const { isLoading: userIsLoading, users } = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const getLeaveDetails = (id) => {
		dispatch(fetchLeaveDetails(id))
		setLeaveModal(true)
	}

	const updateLeaveDetails = (e) => {
		e.preventDefault()
		dispatch(updateDetail({ id: leaveDetails.id, data: leaveDetailData }))
		dispatch(allLeaves(leaveFilter))
		setLeaveModal(false)
	}

	const getLeavesByEmployee = (e) => {
		e.preventDefault()
		dispatch(
			fetchLeavesByEmployee({ userId: userId, filterId: userLeaveFilter })
		)
		setUserId("")
	}

	useEffect(() => {
		setLeaveDetailData({
			review_reason: leaveDetails?.review_reason || "",
			review_status:
				leaveDetails.review_status === "Pending"
					? 1
					: leaveDetails.review_status === "Approved"
					? 2
					: leaveDetails.review_status === "Rejected"
					? 3
					: "",
		})
	}, [leaveDetails])

	useEffect(() => {
		dispatch(allLeaves(leaveFilter))
	}, [dispatch, leaveFilter])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	useEffect(() => {
		dispatch(allUsers())
	}, [dispatch])

	if (isLoading || userIsLoading) {
		return <LoadingSpinner />
	}
	return (
		<div>
			<SectionHeader text="Views and modify the leaves of employees" />
			<SubHeading>Filters</SubHeading>
			<div className="max-w-md">
				<SelectTag
					value={leaveFilter}
					onChange={(e) => setLeaveFilters(e.target.value)}
					label="Filter leaves"
					content={[
						{ id: 1, name: "Pending" },
						{ id: 2, name: "Approved" },
						{ id: 3, name: "Rejected" },
					]}
				/>
			</div>
			{/* All leaves */}
			<RenderIf isTrue={leaves && leaves?.length > 0}>
				<LeaveTableAdmin
					content={leaves}
					selectLeave={getLeaveDetails}
					rowsPerPage={5}
				/>
			</RenderIf>
			<RenderIf isTrue={!leaves || leaves?.length < 1}>
				<h2 className="text-4xl text-slate-300 font-semibold dark:text-slate-600">
					Found nothing
				</h2>
			</RenderIf>

			{/* Leaves by employees */}
			<div className="mt-8">
				<SubHeading>Search specific employee leaves</SubHeading>
				<form onSubmit={getLeavesByEmployee} className="max-w-md mb-5">
					<SelectTag
						value={userLeaveFilter}
						onChange={(e) => setUserLeaveFilters(e.target.value)}
						label="Filter leaves"
						content={[
							{ id: 1, name: "Pending" },
							{ id: 2, name: "Approved" },
							{ id: 3, name: "Rejected" },
						]}
					/>
					<RenderIf isTrue={users && users?.length > 0}>
						<SelectTag
							label="Select an employee"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							content={users}
						/>
					</RenderIf>

					<Button type="submit" Icon={HiOutlineSearch}>
						Get leaves
					</Button>
				</form>
				<RenderIf isTrue={leavesByEmployee && leavesByEmployee?.length > 0}>
					<LeaveTableAdmin
						content={leavesByEmployee}
						selectLeave={getLeaveDetails}
						rowsPerPage={5}
						forSpecificEmployee
					/>
				</RenderIf>
				<RenderIf isTrue={!leavesByEmployee || leavesByEmployee?.length < 1}>
					<h2 className="text-4xl text-slate-300 font-semibold dark:text-slate-600">
						Nothing found
					</h2>
				</RenderIf>
			</div>

			<RenderIf isTrue={leaveModal}>
				<WrapperModal title="Modify leave" setShow={setLeaveModal}>
					<ChipsV2 classes="mb-3" Icon={HiUserCircle}>
						{leaveDetails?.employee?.email}
					</ChipsV2>
					<form onSubmit={updateLeaveDetails}>
						<InputTag
							value={leaveDetailData.review_reason}
							onChange={(e) =>
								setLeaveDetailData((prev) => ({
									...prev,
									review_reason: e.target.value,
								}))
							}
							label="Review reason"
							placeholder="Enter review reason"
						/>
						<SelectTag
							value={leaveDetailData.review_status}
							onChange={(e) =>
								setLeaveDetailData((prev) => ({
									...prev,
									review_status: e.target.value,
								}))
							}
							label="Review status"
							content={[
								{ id: 1, name: "Pending" },
								{ id: 2, name: "Approved" },
								{ id: 3, name: "Rejected" },
							]}
						/>
						<Button>Update</Button>
					</form>
				</WrapperModal>
			</RenderIf>
		</div>
	)
}

export default Leave
