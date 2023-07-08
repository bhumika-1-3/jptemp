import { useEffect, useState, useCallback } from "react"
import { HiCalendar, HiPlusCircle, HiSearchCircle } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import {
	SectionHeader,
	Button,
	AttendanceTableAdmin,
	// SubHeading,
	RenderIf,
	// AttendanceTable,
	// WrapperModal,
	// InputTag,
	// SelectTag,
	LoadingSpinner,
	NoteText,
	InputTag,
} from "../../../components"
import {
	allEmployeeAttendance,
	// employeeAttendance,
	// attendanceDetail,
	// updateEmployeeAttendance,
	fetchAllAttendanceDateFilter,
	toastReset,
} from "../../../store/slices/Attendance/attendanceSlice"

const Attendance = () => {
	const [currentPage, setCurrentPage] = useState(0)
	const [dateFilter, setDateFilter] = useState({
		from: "",
		to: "",
	})
	// const [showModal, setShowModal] = useState(false)
	// const [coordinates, setCoordinates] = useState({
	// 	lat: null,
	// 	long: null,
	// })
	// const [attendanceEdit, setAttendenceEdit] = useState({
	// 	userId: "",
	// 	time_in: "",
	// 	time_out: "",
	// 	remarks: "",
	// 	latitude: "",
	// 	longitude: "",
	// 	attendance_type: "",
	// })
	const {
		isLoading,
		showToast,
		allAttendance,
		// singleEmployeeAttendance,
		message,
		// employeeAttendanceDetail,
		success,
	} = useSelector((state) => state.attendance)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const navigateTo = (date) => navigate(`attendance-by-date/${date}`)

	const attendanceWithDateFiltersHandlers = (e) => {
		e.preventDefault()
		dispatch(fetchAllAttendanceDateFilter(dateFilter))
	}

	// const getEmployeeAttendance = (id) => {
	// 	dispatch(employeeAttendance(id))
	// 	setAttendenceEdit((prev) => ({ ...prev, userId: id }))
	// }
	// const getEmployeeAttendanceDetail = (id) => {
	// 	dispatch(attendanceDetail({ id: attendanceEdit.userId, attendanceId: id }))
	// 	setShowModal(true)
	// }

	// const updateAttendance = (e) => {
	// 	e.preventDefault()
	// 	dispatch(
	// 		updateEmployeeAttendance({
	// 			id: attendanceEdit.userId,
	// 			attendanceId: employeeAttendanceDetail?.id,
	// 			data: attendanceEdit,
	// 		})
	// 	)
	// 	setShowModal(false)
	// 	dispatch(allEmployeeAttendance())
	// 	if (attendanceEdit?.userId) {
	// 		dispatch(employeeAttendance(attendanceEdit?.userId))
	// 	}
	// }

	useEffect(() => {
		dispatch(allEmployeeAttendance())

		// navigator.geolocation.getCurrentPosition(function (position) {
		// 	let lat = position.coords.latitude
		// 	let long = position.coords.longitude
		// 	setAttendenceEdit((prev) => ({ ...prev, latitude: lat }))
		// 	setAttendenceEdit((prev) => ({ ...prev, longitude: long }))
		// 	setCoordinates({
		// 		lat: lat,
		// 		long: long,
		// 	})
		// })
	}, [dispatch])

	// useEffect(() => {
	// 	setAttendenceEdit((prev) => ({
	// 		...prev,
	// 		time_in: employeeAttendanceDetail?.time_in || "",
	// 		time_out: employeeAttendanceDetail?.time_out || "",
	// 		remarks: employeeAttendanceDetail?.remarks || "",
	// 		latitude: employeeAttendanceDetail?.latitude || coordinates.lat || "",
	// 		longitude: employeeAttendanceDetail?.longitude || coordinates.long || "",
	// 		attendance_type:
	// 			employeeAttendanceDetail.attendance_type === "Absent"
	// 				? "A"
	// 				: employeeAttendanceDetail.attendance_type === "Present"
	// 				? "P"
	// 				: employeeAttendanceDetail.attendance_type === "Unavailable"
	// 				? null
	// 				: "",
	// 	}))
	// }, [employeeAttendanceDetail, coordinates.lat, coordinates.long])

	const handlePageClick = useCallback(
		(e) => {
			if (e) {
				dispatch(allEmployeeAttendance(e.selected + 1))
				setCurrentPage(e.selected)
			}
		},
		[dispatch]
	)

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
			
			<NoteText>Filters</NoteText>
			<form
				onSubmit={attendanceWithDateFiltersHandlers}
				className="sm:grid sm:grid-cols-3 sm:gap-2 sm:max-w-md items-center sm:items-end mb-2"
			>
				<InputTag
					Icon={HiCalendar}
					value={dateFilter.from}
					onChange={(e) =>
						setDateFilter((prev) => ({ ...prev, from: e.target.value }))
					}
					label="From"
					type="date"
					placeholder="Select start date"
				/>
				<InputTag
					Icon={HiCalendar}
					value={dateFilter.to}
					onChange={(e) =>
						setDateFilter((prev) => ({ ...prev, to: e.target.value }))
					}
					label="To"
					type="date"
					placeholder="Select end date"
				/>
				<div className="sm:mb-1 sm:ml-3">
					<Button type="submit" Icon={HiSearchCircle}>
						Search
					</Button>
				</div>
			</form>
			<RenderIf isTrue={allAttendance && allAttendance?.data?.length > 0}>
				<div className="max-w-xl">
					<AttendanceTableAdmin
						content={allAttendance?.data}
						onClick={navigateTo}
						rowsPerPage={10}
						pageCount={allAttendance?.count}
						handlePageClick={handlePageClick}
						currentPage={currentPage}
					/>
				</div>
			</RenderIf>

			{/* Selected employee's all attendance */}
			{/* <div className="mt-6">
				<SubHeading>Selected employee</SubHeading>
				<RenderIf
					isTrue={
						singleEmployeeAttendance && singleEmployeeAttendance.length > 0
					}
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
						Select an employee to show their details
					</h2>
				</RenderIf>
			</div> */}

			{/* Modal to update details */}
			{/* <RenderIf isTrue={showModal}>
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
						<InputTag
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
						/>
						<div>
							<Button type="submit">Update</Button>
						</div>
					</form>
				</WrapperModal>
			</RenderIf> */}
		</div>
	)
}

export default Attendance
