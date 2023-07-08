import { useReducer, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { HiPlus } from "react-icons/hi"
import {
	attendanceAll,
	getLeaves,
	addEmployeeAttendance,
	addLeaves,
	toastReset,
} from "../../../store/slices/employee/employeeSlice"
import {
	AttendanceTable,
	Button,
	SectionHeader,
	SubHeading,
	Modal,
	InputTag,
	SelectTag,
	LeaveTable,
	LoadingSpinner,
	TransitionBtoT,
} from "../../../components"

const initialState = {
	date: "",
	attendance_type: "",
	// time_in: "",
	// time_out: "",
	// remarks: "",
	latitude: "",
	longitude: "",
}

const attendanceReducer = (state, action) => {
	switch (action.type) {
		case "date":
			return { ...state, date: action.payload }
		case "attendance_type":
			return { ...state, attendance_type: action.payload }
		// case "time_in":
		// 	return { ...state, time_in: action.payload }
		// case "time_out":
		// 	return { ...state, time_out: action.payload }
		// case "remarks":
		// 	return { ...state, remarks: action.payload }
		case "latitude":
			return { ...state, latitude: action.payload }
		case "longitude":
			return { ...state, longitude: action.payload }
		default:
			return state
	}
}

const EmployeeDashboard = () => {
	const [leaveData, setLeaveData] = useState({
		start: "",
		end: "",
		leave_type: "",
	})
	const [state, attendanceDispatch] = useReducer(
		attendanceReducer,
		initialState
	)
	const {
		employeeAttendance,
		isLoading,
		employeeLeaves,
		showToast,
		message,
		success,
	} = useSelector((state) => state.employee)
	const dispatch = useDispatch()

	const submitAttendanceHandler = (e) => {
		e.preventDefault()
		dispatch(addEmployeeAttendance(state))
	}
	const submitLeaveHandler = (e) => {
		e.preventDefault()
		dispatch(addLeaves(leaveData))
	}
	useEffect(() => {
		dispatch(attendanceAll())
		dispatch(getLeaves())
		navigator.geolocation.getCurrentPosition(function (position) {
			let lat = position.coords.latitude
			let long = position.coords.longitude
			attendanceDispatch({ type: "latitude", payload: lat })
			attendanceDispatch({ type: "longitude", payload: long })
		})
	}, [dispatch, attendanceDispatch])

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
		<div className="w-full">
			{/* Header */}
			<SectionHeader text="Employee Dashboard">
				{/* Attendance modal */}
				<Modal
					title="Attendance"
					activator={({ setShow }) => (
						<Button Icon={HiPlus} onClick={() => setShow(true)}>
							Add attendance
						</Button>
					)}
				>
					<form onSubmit={submitAttendanceHandler}>
						<InputTag
							label="Date"
							type="date"
							value={state.date}
							onChange={(e) =>
								attendanceDispatch({ type: "date", payload: e.target.value })
							}
						/>
						<SelectTag
							label="Attendance type"
							value={state.attendance_type}
							onChange={(e) =>
								attendanceDispatch({
									type: "attendance_type",
									payload: e.target.value,
								})
							}
							content={[
								{ id: "P", name: "Present" },
								{ id: "A", name: "Absent" },
								{ id: null, name: "Unavailable" },
							]}
						/>
						{/* <InputTag
							label="Time in"
							type="time"
							value={state.time_in}
							onChange={(e) =>
								attendanceDispatch({ type: "time_in", payload: e.target.value })
							}
						/>
						<InputTag
							label="Time out"
							type="time"
							value={state.time_out}
							onChange={(e) =>
								attendanceDispatch({
									type: "time_out",
									payload: e.target.value,
								})
							}
						/>
						<InputTag
							label="Remarks"
							placeholder="Add some remarks"
							type="text"
							value={state.remarks}
							onChange={(e) =>
								attendanceDispatch({ type: "remarks", payload: e.target.value })
							}
						/> */}
						<div>
							<Button type="submit">Add</Button>
						</div>
					</form>
				</Modal>
				{/* Leave modal */}
				<Modal
					title="Leave"
					activator={({ setShow }) => (
						<Button Icon={HiPlus} onClick={() => setShow(true)}>
							Add leave
						</Button>
					)}
				>
					<form onSubmit={submitLeaveHandler}>
						<InputTag
							label="Start"
							type="date"
							value={leaveData.start}
							onChange={(e) =>
								setLeaveData((prev) => ({ ...prev, start: e.target.value }))
							}
						/>
						<InputTag
							label="End"
							type="date"
							value={leaveData.end}
							onChange={(e) =>
								setLeaveData((prev) => ({ ...prev, end: e.target.value }))
							}
						/>
						<SelectTag
							label="Leave type"
							value={leaveData.leave_type}
							onChange={(e) =>
								setLeaveData((prev) => ({
									...prev,
									leave_type: e.target.value,
								}))
							}
							content={[
								{ id: 1, name: "Sick" },
								{ id: 2, name: "Regular" },
							]}
						/>
						<div>
							<Button type="submit">Add</Button>
						</div>
					</form>
				</Modal>
			</SectionHeader>

			{/* Attendance */}
			<div className="">
				<SubHeading>Attendance</SubHeading>
				{/* <AttendanceTable /> */}
				{employeeAttendance.length > 0 && (
					<TransitionBtoT>
						<AttendanceTable content={employeeAttendance} rowsPerPage={5} />
					</TransitionBtoT>
				)}
				{employeeAttendance.length < 1 && (
					<h2 className="text-4xl text-slate-300 font-semibold">
						:( Sorry
						<br />
						There is nothing to show here <br />
					</h2>
				)}
			</div>
			{/* Leaves */}
			<div className="mt-7">
				<SubHeading>Leaves</SubHeading>
				{/* <Leaves table /> */}
				{employeeLeaves.length > 0 && (
					<TransitionBtoT>
						<LeaveTable content={employeeLeaves} rowsPerPage={5} />
					</TransitionBtoT>
				)}
				{employeeLeaves.length < 1 && (
					<h2 className="text-4xl text-slate-300 font-semibold">
						:( Sorry
						<br />
						There is nothing to show here <br />
					</h2>
				)}
			</div>
		</div>
	)
}

export default EmployeeDashboard
