import axios from "../Services/axios"
import axios2 from "../Services/axiosMultiPartForm"

export const getAllDepartments = async () => {
	const res = await axios.get("/employee/departments/")
	return res.data
}
export const getAllDesignations = async () => {
	const res = await axios.get("/employee/designations/")
	return res.data
}
export const getEmployeeTypes = async () => {
	const res = await axios.get("/employee/types/")
	return res.data
}
export const getEmployeeProfile = async () => {
	const res = await axios.get("/employee/profile/")
	return res.data
}
export const getAllEmployeeDocuments = async () => {
	const res = await axios.get("/employee/documents/")
	return res.data
}
export const getAllEmployeeBanks = async () => {
	const res = await axios.get("/employee/banks/")
	return res.data
}
export const getAddressAll = async () => {
	const res = await axios.get("/employee/address/")
	return res.data
}
export const getAddressDetail = async (data) => {
	const res = await axios.get(`/employee/address/${data}`)
	return res.data
}
export const getAttendanceAll = async () => {
	const res = await axios.get("/employee/attendance/")
	return res.data
}
export const getAllBanks = async () => {
	const res = await axios.get("/banks/")
	return res.data
}

export const getAllDocumentTypes = async () => {
	const res = await axios.get("/documents/types/")
	return res.data
}
export const getEmployeeLeaves = async () => {
	const res = await axios.get("/employee/leaves/")
	return res.data
}
export const register = async (data) => {
	const res = await axios.post("/employee/register/", data)
	return res.data
}
export const addDepartment = async (data) => {
	const res = await axios.post("/employee/departments/", data)
	return res.data
}
export const addDesignation = async (data) => {
	const res = await axios.post("/employee/designations/", data)
	return res.data
}
export const addEmployeeType = async (data) => {
	const res = await axios.post("/employee/types/", data)
	return res.data
}
export const addBanks = async (data) => {
	const res = await axios.post("/banks/", data)
	return res.data
}
export const addAllDocumentTypes = async (data) => {
	const res = await axios.post("/documents/types/", data)
	return res.data
}
export const modifyEmployeeProfile = async (data) => {
	const res = await axios2.patch("/employee/profile/", data)
	return res.data
}
export const addDocs = async (data) => {
	const res = await axios2.post("/employee/documents/", data)
	return res.data
}
export const addAddress = async (data) => {
	const res = await axios.post("/employee/address/", data)
	return res.data
}
export const modifyAddress = async (data) => {
	const res = await axios.patch(`/employee/address/${data.id}/`, data.content)
	return res.data
}
export const deleteAddress = async (data) => {
	const res = await axios.delete(`/employee/address/${data}/`)
	return res.data
}
export const addAttendance = async (data) => {
	const res = await axios.post(`/employee/attendance/`, data)
	return res.data
}
export const addEmployeeLeaves = async (data) => {
	const res = await axios.post(`/employee/leaves/`, data)
	return res.data
}

// Work experiences
export const getAllWorkExperiences = async () => {
	const res = await axios.get("/employee/work-experiences/")
	return res.data
}
export const addWorkExperience = async (data) => {
	const res = await axios.post("/employee/work-experiences/", data)
	return res.data
}
export const modifyWorkExperience = async (data) => {
	const res = await axios.patch(
		`/employee/work-experiences/${data.id}/`,
		data.content
	)
	return res.data
}
export const deleteWorkExperience = async (data) => {
	const res = await axios.delete(`/employee/work-experiences/${data}/`)
	return res.data
}

// Education ====>>
export const getAllEducations = async () => {
	const res = await axios.get("/employee/educations/")
	return res.data
}
export const addNewEducation = async (data) => {
	const res = await axios.post("/employee/educations/", data)
	return res.data
}
export const modifyEducation = async (data) => {
	const res = await axios.patch(
		`/employee/educations/${data.id}/`,
		data.content
	)
	return res.data
}
export const deleteEducation = async (data) => {
	const res = await axios.delete(`/employee/educations/${data}/`)
	return res.data
}

// Dependents ====>>
export const getAllDependents = async () => {
	const res = await axios.get("/employee/dependents/")
	return res.data
}
export const addNewDependent = async (data) => {
	const res = await axios.post("/employee/dependents/", data)
	return res.data
}
export const modifyDependent = async (data) => {
	const res = await axios.patch(
		`/employee/dependents/${data.id}/`,
		data.content
	)
	return res.data
}
export const deleteDependent = async (data) => {
	const res = await axios.delete(`/employee/dependents/${data}/`)
	return res.data
}
