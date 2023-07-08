import { useState, useEffect } from "react"
import { HiPlusCircle } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import {
	SectionHeader,
	Button,
	SubHeading,
	RenderIf,
	AttendanceTable,
	WrapperModal,
	InputTag,
	SelectTag,
	LoadingSpinner,
	Modal,
} from "../../../components"
import {
	createEmployeeAttendance,
	employeeAttendance,
	attendanceDetail,
	updateEmployeeAttendance,
	toastReset,
} from "../../../store/slices/Attendance/attendanceSlice"

const EmployeeAttendanceAdmin = ({ userId }) => {
	const [newAttendance, setNewAttendance] = useState({
		// remarks: "",
		attendance_type: "",
		date: "",
	})
	const [showModal, setShowModal] = useState(false)
	const [coordinates, setCoordinates] = useState({
		lat: null,
		long: null,
	})

	const [attendanceEdit, setAttendenceEdit] = useState({
		// time_in: "",
		// time_out: "",
		// remarks: "",
		latitude: "",
		longitude: "",
		attendance_type: "",
	})
	const {
		isLoading,
		showToast,
		singleEmployeeAttendance,
		message,
		employeeAttendanceDetail,
		success,
	} = useSelector((state) => state.attendance)
	const dispatch = useDispatch()

	const getEmployeeAttendanceDetail = (id) => {
		dispatch(attendanceDetail({ id: userId, attendanceId: id }))
		setShowModal(true)
	}

	const addNewAttendanceHandler = (e) => {
		e.preventDefault()
		dispatch(createEmployeeAttendance({ id: userId, content: newAttendance }))
	}

	const updateAttendance = (e) => {
		e.preventDefault()
		dispatch(
			updateEmployeeAttendance({
				id: userId,
				attendanceId: employeeAttendanceDetail?.id,
				data: attendanceEdit,
			})
		)
		setShowModal(false)
		dispatch(employeeAttendance(userId))
	}

	useEffect(() => {
		dispatch(employeeAttendance(userId))

		navigator.geolocation.getCurrentPosition(function (position) {
			let lat = position.coords.latitude
			let long = position.coords.longitude
			setAttendenceEdit((prev) => ({ ...prev, latitude: lat, longitude: long }))
			setCoordinates({
				lat: lat,
				long: long,
			})
		})
	}, [dispatch, userId])

	useEffect(() => {
		setAttendenceEdit((prev) => ({
			...prev,
			// time_in: employeeAttendanceDetail?.time_in || "",
			// time_out: employeeAttendanceDetail?.time_out || "",
			// remarks: employeeAttendanceDetail?.remarks || "",
			latitude: employeeAttendanceDetail?.latitude || coordinates.lat || "",
			longitude: employeeAttendanceDetail?.longitude || coordinates.long || "",
			attendance_type:
				employeeAttendanceDetail.attendance_type === "Absent"
					? "A"
					: employeeAttendanceDetail.attendance_type === "Present"
					? "P"
					: employeeAttendanceDetail.attendance_type === "Unavailable"
					? null
					: "",
		}))
	}, [employeeAttendanceDetail, coordinates.lat, coordinates.long])

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
			<SectionHeader text="View/create employee attendance">
				<Modal
					title="Create employee attendance"
					activator={({ setShow }) => (
						<Button Icon={HiPlusCircle} onClick={() => setShow(true)}>
							Create
						</Button>
					)}
				>
					<form onSubmit={addNewAttendanceHandler}>
						<SelectTag
							value={newAttendance.attendance_type}
							onChange={(e) =>
								setNewAttendance((prev) => ({
									...prev,
									attendance_type: e.target.value,
								}))
							}
							label="Attendance Type"
							content={[
								{ id: "P", name: "Present" },
								{ id: "A", name: "Absent" },
								{ id: null, name: "Unavailable" },
							]}
						/>
						<InputTag
							onChange={(e) =>
								setNewAttendance((prev) => ({ ...prev, date: e.target.value }))
							}
							value={newAttendance.date}
							type="date"
							label="Date"
							placeholder="Enter attendance date"
						/>
						{/* <InputTag
							onChange={(e) =>
								setNewAttendance((prev) => ({
									...prev,
									remarks: e.target.value,
								}))
							}
							value={newAttendance.remarks}
							type="text"
							label="Remarks"
							placeholder="Enter attendance remarks"
						/> */}
						<Button type="submit" Icon={HiPlusCircle}>
							Create
						</Button>
					</form>
				</Modal>
			</SectionHeader>
			<SubHeading>All attendance</SubHeading>
			<RenderIf
				isTrue={singleEmployeeAttendance && singleEmployeeAttendance.length > 0}
			>
				<AttendanceTable
					content={singleEmployeeAttendance}
					attendanceSelect={getEmployeeAttendanceDetail}
					rowsPerPage={5}
				/>
			</RenderIf>
			<RenderIf
				isTrue={
					!singleEmployeeAttendance || singleEmployeeAttendance.length < 1
				}
			>
				<h2 className="text-4xl text-slate-300 font-semibold dark:text-slate-600">
					No attendance found!
				</h2>
			</RenderIf>

			{/* Modal to update details */}
			<RenderIf isTrue={showModal}>
				<WrapperModal title="Update employee attendence" setShow={setShowModal}>
					<form onSubmit={updateAttendance}>
						<SelectTag
							label="Attendance type"
							value={attendanceEdit.attendance_type}
							onChange={(e) =>
								setAttendenceEdit((prev) => ({
									...prev,
									attendance_type: e.target.value,
								}))
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
							value={attendanceEdit.time_in}
							onChange={(e) =>
								setAttendenceEdit((prev) => ({
									...prev,
									time_in: e.target.value,
								}))
							}
						/>
						<InputTag
							label="Time out"
							type="time"
							value={attendanceEdit.time_out}
							onChange={(e) =>
								setAttendenceEdit((prev) => ({
									...prev,
									time_out: e.target.value,
								}))
							}
						/>
						<InputTag
							label="Remarks"
							placeholder="Add some remarks"
							type="text"
							value={attendanceEdit.remarks}
							onChange={(e) =>
								setAttendenceEdit((prev) => ({
									...prev,
									remarks: e.target.value,
								}))
							}
						/> */}
						<div>
							<Button type="submit">Update</Button>
						</div>
					</form>
				</WrapperModal>
			</RenderIf>
		</div>
	)
}

export default EmployeeAttendanceAdmin
