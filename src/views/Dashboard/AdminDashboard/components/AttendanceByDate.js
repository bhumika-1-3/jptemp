import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { HiCalendar } from "react-icons/hi"
import {
	attendanceDetail,
	fetchAllAttendanceByDate,
	toastReset,
	updateEmployeeAttendance,
} from "../../../../store/slices/Attendance/attendanceSlice"
import {
	BigText,
	Button,
	ChipsV2,
	FadedText,
	LoadingSpinner,
	RenderIf,
	SelectTag,
	SubHeading,
	TransitionBtoT,
	WrapperModal,
} from "../../../../components"
import AttendanceTable from "./AttendanceTable"

const AttendanceByDate = () => {
	const [attendanceType, setAttendanceType] = useState("")
	const [showModal, setShowModal] = useState(false)
	const [attendanceEdit, setAttendenceEdit] = useState({
		latitude: "",
		longitude: "",
		attendance_type: "",
	})
	const [userId, setUserId] = useState("")
	const {
		isLoading,
		showToast,
		message,
		success,
		allAttendanceWithFilters,
		employeeAttendanceDetail,
	} = useSelector((state) => state.attendance)
	const dispatch = useDispatch()
	const { date } = useParams()

	const getEmployeeAttendanceDetail = (data) => {
		dispatch(
			attendanceDetail({ id: data?.employee?.id, attendanceId: data?.id })
		)

		setUserId(data?.employee?.id)
		setShowModal(true)
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
	}

	useEffect(() => {
		dispatch(
			fetchAllAttendanceByDate({ date: date, attendanceType: attendanceType })
		)
	}, [dispatch, date, attendanceType])

	useEffect(() => {
		setAttendenceEdit((prev) => ({
			...prev,
			latitude: employeeAttendanceDetail?.latitude || "",
			longitude: employeeAttendanceDetail?.longitude || "",
			attendance_type:
				employeeAttendanceDetail.attendance_type === "Absent"
					? "A"
					: employeeAttendanceDetail.attendance_type === "Present"
					? "P"
					: employeeAttendanceDetail.attendance_type === "Scored"
					? null
					: "",
		}))
	}, [employeeAttendanceDetail])

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			let lat = position.coords.latitude
			let long = position.coords.longitude
			setAttendenceEdit((prev) => ({ ...prev, latitude: lat, longitude: long }))
		})
	}, [dispatch, employeeAttendanceDetail?.id])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])

	// if (isLoading) {
	// 	return <LoadingSpinner />
	// }
	return (
		<div>
			<BigText>Attendance By Date</BigText>
			<ChipsV2 Icon={HiCalendar}>{date}</ChipsV2>
			<div className="mt-4">
				<SubHeading>Filters</SubHeading>
				<select
					value={attendanceType}
					onChange={(e) => setAttendanceType(e.target.value)}
					className="py-1 rounded-2xl border borderColor block dark:bg-purple_5 shadow-sm dark:shadow-lg"
				>
					<option value="">Select</option>
					<option value="P">Present</option>
					<option value="A">Absent</option>
				</select>
			</div>

			<RenderIf isTrue={isLoading}>
				<LoadingSpinner />
			</RenderIf>
			<RenderIf
				isTrue={allAttendanceWithFilters && allAttendanceWithFilters.length > 0}
			>
				<div className="mt-4">
					<TransitionBtoT>
						<AttendanceTable
							content={allAttendanceWithFilters}
							rowsPerPage={5}
							employeeSelect={getEmployeeAttendanceDetail}
						/>
					</TransitionBtoT>
				</div>
			</RenderIf>
			<RenderIf
				isTrue={
					!allAttendanceWithFilters || allAttendanceWithFilters?.length < 1
				}
			>
				<div className="mt-4">
					<TransitionBtoT>
						<FadedText>Found nothing</FadedText>
					</TransitionBtoT>
				</div>
			</RenderIf>

			{/* Update employee attendance */}
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
								{ id: null, name: "Scored" },
							]}
						/>
						<div>
							<Button type="submit">Update</Button>
						</div>
					</form>
				</WrapperModal>
			</RenderIf>
		</div>
	)
}

export default AttendanceByDate
