import axios from "../Services/axios"

// Attendance
export const getAllAttendance = async (pageNo) => {
	const res = await axios.get(`/attendance/?page=${pageNo || 1}`)
	console.log("full attendance res", res)
	return res.data
}
export const getEmployeeAttendance = async (data) => {
	const res = await axios.get(`/attendance/${data}/`)
	return res.data
}
export const getEmployeeAttendanceDetail = async (data) => {
	const res = await axios.get(`/attendance/${data.id}/${data.attendanceId}/`)
	return res.data
}
export const modifyEmployeeAttendance = async (data) => {
	const res = await axios.patch(
		`/attendance/${data.id}/${data.attendanceId}/`,
		data.data
	)
	return res.data
}
export const addEmployeeAttendanceAdmin = async (data) => {
	const res = await axios.post(`/attendance/${data.id}/`, data.content)
	return res.data
}
export const getAllAttendanceDateFilter = async (data) => {
	const res = await axios.get(`/attendance/?from=${data.from}&to=${data.to}`)
	return res.data
}
export const getAllAttendanceByDate = async (data) => {
	const res = await axios.get(
		`/attendance/${data.date}/?type=${data.attendanceType || ""}`
	)
	return res.data
}

// Leaves
export const getAllLeaves = async (data) => {
	const res = await axios.get(`/attendance/leaves/?filter=${data}`)
	return res.data
}
export const getLeaveDetail = async (data) => {
	const res = await axios.get(`/attendance/leaves/${data}/`)
	return res.data
}
export const modifyLeaveDetail = async (data) => {
	const res = await axios.patch(`/attendance/leaves/${data.id}/`, data.data)
	return res.data
}
export const getLeaveByEmployee = async (data) => {
	const res = await axios.get(
		`/attendance/leaves/${data.userId}/?filter=${data.filterId}`
	)
	return res.data
}
export const getHolidays = async () => {
	const res = await axios.get(`/attendance/holidays/`)
	return res.data
}
export const addHolidays = async (data) => {
	const res = await axios.post(`/attendance/holidays/`, data)
	return res.data
}

// Employee bulk attendance
export const addEmployeeBulkAttendance = async (data) => {
	const res = await axios.post(`/attendance/employees/`, data)
	return res.data
}
