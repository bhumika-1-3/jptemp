import axios from "../Services/axios"

export const getGenderData = async () => {
	const res = await axios.get("/charts/gender/")
	return res.data
}
export const getleavesData = async () => {
	const res = await axios.get("/charts/leaves/")
	return res.data
}
export const getBloodGroupData = async () => {
	const res = await axios.get("/charts/blood-group/")
	return res.data
}
// export const getGenderData = async () => {
// 	const res = await axios.get("/charts/departments/")
// 	return res.data
// }
