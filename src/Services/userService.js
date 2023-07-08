import axios from "../Services/axios"
import axios2 from "../Services/axiosMultiPartForm"

export const register = async (data) => {
	const res = await axios.post("/user/register/", data)
	return res.data
}
export const getAllGroups = async () => {
	const res = await axios.get("/user/groups/")
	return res.data
}
export const createGroup = async (data) => {
	const res = await axios.post("/user/groups/", data)
	return res.data
}
export const getGroupDetails = async (data) => {
	const res = await axios.get(`/user/groups/${data}/`)
	return res.data
}
export const getAllPermissions = async () => {
	const res = await axios.get("/user/permissions/")
	return res.data
}
export const getAllUsers = async () => {
	const res = await axios.get("/user/")
	return res.data
}
export const addUserToGroup = async (data) => {
	const res = await axios.post(`user/groups/${data.groupId}/users/add/`, {
		user: data.userId,
	})
	return res.data
}
export const removeUserFromGroup = async (data) => {
	const res = await axios.post(`user/groups/${data.groupId}/users/remove/`, {
		user: data.userId,
	})
	return res.data
}
export const modifyGroup = async (data) => {
	const res = await axios.patch(`/user/groups/${data.id}/`, data.data)
	return res.data
}

export const getIndividualUserPermissions = async (data) => {
	const res = await axios.get(`/user/user-permissions/${data}/`)
	return res.data
}
export const modifyIndividualUserPermissions = async (data) => {
	const res = await axios.patch(`/user/user-permissions/${data.id}/`, data.data)
	return res.data
}
export const getGroupUsers = async (data) => {
	const res = await axios.get(`/user/groups/${data}/users/`, data.data)
	return res.data
}

// Search employee
export const getUserBySearch = async (data) => {
	const res = await axios.get(`/search/employees/?query=${data}`)
	return res.data
}
// Fetch employee profile
export const getEmployeeProfile = async (data) => {
	const res = await axios.get(`employee/${data}/`)
	return res.data
}

// update employee profile
export const modifyEmployeeProfile = async (data) => {
	const res = await axios2.patch(`employee/${data.id}/`, data.content)
	return res.data
}

// Change employee password

export const modifyPassword = async (data) => {
	const res = await axios.post(`employee/${data.id}/password/`, data.content)
	return res.data
}
