import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { allUsers } from "../../../store/slices/User/userSlice"
import {
	createBulkEmployeeAttendance,
	toastReset,
} from "../../../store/slices/Attendance/attendanceSlice"

// Components
import {
	LoadingSpinner,
	SectionHeader,
	Button,
	BulkAttendanceTable,
	RenderIf,
	TransitionBtoT,
	BigText,
	SubHeading,
} from "../../../components"
import { HiPlusCircle } from "react-icons/hi"

const BulkAttendance = () => {
	const [attendances, setAttendances] = useState([])
	const { isLoading: userIsLoading, users } = useSelector((state) => state.user)
	const { isLoading, success, message, showToast } = useSelector(
		(state) => state.attendance
	)
	const dispatch = useDispatch()

	const commonDateHandler = (e) => {
		if (attendances && attendances?.length > 0) {
			const newAttendance = attendances.map((item) => {
				return { ...item, date: e.target.value }
			})
			setAttendances(newAttendance)
		} else {
			toast.warning("Pease select all first!")
		}
	}

	const selectAllHandler = (e) => {
		if (e.target.checked) {
			const year = new Date().getFullYear()
			const month = new Date().getMonth() + 1
			const day = new Date().getDate()
			const allSelectedAttendances = users.map((item) => ({
				checked: e.target.checked,
				employee_id: item.id,
				attendance_type: "P",
				date: `${year}-${month.toString().length < 2 ? "0" + month : month}-${
					day.toString().length < 2 ? "0" + day : day
				}`,
			}))
			setAttendances(allSelectedAttendances)
		} else {
			setAttendances([])
		}
	}

	const attendanceCheckbox = (e, id) => {
		if (e.target.checked) {
			const findIfExist = attendances.find((item) => item.employee_id === id)
			if (!findIfExist) {
				const year = new Date().getFullYear()
				const month = new Date().getMonth() + 1
				const day = new Date().getDate()
				setAttendances((prev) => [
					...prev,
					{
						checked: e.target.checked,
						employee_id: id,
						attendance_type: "P",
						date: `${year}-${
							month.toString().length < 2 ? "0" + month : month
						}-${day.toString().length < 2 ? "0" + day : day}`,
					},
				])
			}
		} else {
			const findIfExist = attendances.find((item) => item.employee_id === id)

			if (findIfExist) {
				const newAttendance = attendances.filter(
					(item) => item.employee_id !== id
				)

				setAttendances(newAttendance)
			}
		}
	}
	const attendanceSelect = (e, id) => {
		const findIfExit = attendances.find((item) => item.employee_id === id)
		if (findIfExit) {
			const newAttendance = attendances.map((item) => {
				if (item.employee_id === id) {
					return { ...item, attendance_type: e.target.value }
				}
				return item
			})
			setAttendances(newAttendance)
		}
	}
	const attendanceDateSelect = (e, id) => {
		const findIfExit = attendances.find((item) => item.employee_id === id)
		if (findIfExit) {
			const newAttendance = attendances.map((item) => {
				if (item.employee_id === id) {
					return { ...item, date: e.target.value }
				}
				return item
			})
			setAttendances(newAttendance)
		}
	}

	const bulkAttendanceCreateHandler = (e) => {
		if (attendances.length > 0) {
			dispatch(createBulkEmployeeAttendance(attendances))
			setAttendances([])
		} else {
			alert("Please add some employees!")
		}
	}

	useEffect(() => {
		dispatch(allUsers())
	}, [dispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])

	if (userIsLoading || isLoading) {
		return <LoadingSpinner />
	}
	return (
		<div>
			<SectionHeader text="Add multiple attendance at once">
				{attendances.length > 0 && (
					<Button onClick={bulkAttendanceCreateHandler} Icon={HiPlusCircle}>
						Submit
					</Button>
				)}
			</SectionHeader>

			<BigText>Add multiple attendances</BigText>
			<SubHeading>Common date :</SubHeading>
			<input
				// value={handleAttendanceDate(item)}
				className="py-1 sm:inline-block block sm:mb-0 sm:ml-5 mb-3 rounded-2xl border borderColor dark:bg-purple_5 shadow-sm dark:shadow-lg"
				onChange={commonDateHandler}
				type="date"
				// max={new Date()}
			/>
			<RenderIf isTrue={users && users?.length > 0}>
				<div className="max-w-3xl">
					<TransitionBtoT>
						<BulkAttendanceTable
							employeeSelect={attendanceCheckbox}
							attendanceSelect={attendanceSelect}
							attendanceDateSelect={attendanceDateSelect}
							content={users}
							rowsPerPage={10}
							attendances={attendances}
							selectAll={selectAllHandler}
						/>
					</TransitionBtoT>
				</div>
			</RenderIf>
		</div>
	)
}

export default BulkAttendance
