import axios from "../Services/axios"

export const getAllCountries = async () => {
	const res = await axios.get("/location/countries/")
	return res.data
}
export const addNewCountry = async (data) => {
	const res = await axios.post("/location/countries/", data)
	return res.data
}
export const getAllStates = async () => {
	const res = await axios.get("/location/states/")
	return res.data
}
export const addNewState = async (data) => {
	const res = await axios.post("/location/states/", data)
	return res.data
}
export const getAllCities = async () => {
	const res = await axios.get("/location/cities/")
	return res.data
}
export const addNewCity = async (data) => {
	const res = await axios.post("/location/cities/", data)
	return res.data
}
