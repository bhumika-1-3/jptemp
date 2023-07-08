import axios from "../Services/axios"

export const getAllOrganization = async () => {
	const res = await axios.get("/organizations/")
	return res.data
}
export const addNewOrganization = async (data) => {
	const res = await axios.post("/organizations/", data)
	return res.data
}
export const getOrganizationDetails = async (data) => {
	const res = await axios.get(`/organizations/${data}/`)
	return res.data
}
export const modifyOrganization = async (data) => {
	const res = await axios.patch(`/organizations/${data.id}/`, data.content)
	return res.data
}
export const getOrganizationLocations = async (data) => {
	const res = await axios.get(`/organizations/${data}/locations/`)
	return res.data
}
export const addNewOrganizationLocation = async (data) => {
	const res = await axios.post(
		`/organizations/${data.orgID}/locations/`,
		data.content
	)
	return res.data
}
export const modifyOrganizationLocation = async (data) => {
	const res = await axios.patch(
		`/organizations/${data.orgID}/locations/${data.locationID}/`,
		data.content
	)
	return res.data
}
