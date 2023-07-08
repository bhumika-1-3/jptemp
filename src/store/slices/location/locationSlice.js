import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
	getAllCountries,
	getAllStates,
	getAllCities,
	addNewCountry,
	addNewState,
	addNewCity,
} from "../../../Services/locationService"

const initialState = {
	isLoading: false,
	countries: [],
	states: [],
	cities: [],
	success: null,
	message: "",
	showToast: false,
}

const errorMessageHandler = (error) => {
	// const message =
	// 	(error.data && error.data.data && error.data.data.message) ||
	// 	error.message ||
	// 	error.toString()
	// console.log(message)
	// return message
	const message = error?.response?.data || error.message || error.toString()
	return message
}

export const allCountries = createAsyncThunk(
	"location/allCountries",
	async (_, thunkAPI) => {
		try {
			const res = await getAllCountries()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addCountry = createAsyncThunk(
	"location/addCountry",
	async (data, thunkAPI) => {
		try {
			const res = await addNewCountry(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const allStates = createAsyncThunk(
	"location/allStates",
	async (_, thunkAPI) => {
		try {
			const res = await getAllStates()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addState = createAsyncThunk(
	"location/addState",
	async (data, thunkAPI) => {
		try {
			const res = await addNewState(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const allCities = createAsyncThunk(
	"location/allCities",
	async (_, thunkAPI) => {
		try {
			const res = await getAllCities()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addCity = createAsyncThunk(
	"location/addCity",
	async (data, thunkAPI) => {
		try {
			const res = await addNewCity(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const locationSlice = createSlice({
	name: "location",
	initialState,
	reducers: {
		toastReset: (state) => {
			state.showToast = false
		},
	},
	extraReducers: {
		// All countries
		[allCountries.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allCountries.fulfilled]: (state, action) => {
			state.isLoading = false
			state.countries = action.payload.data
		},
		[allCountries.rejected]: (state, action) => {
			state.isLoading = false
			state.countries = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Add new country
		[addCountry.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addCountry.fulfilled]: (state, action) => {
			state.isLoading = false
			state.countries.push(action.payload.data)
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addCountry.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// All states
		[allStates.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allStates.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.states = action.payload.data
		},
		[allStates.rejected]: (state, action) => {
			state.isLoading = false
			state.states = []
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Add new state
		[addState.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addState.fulfilled]: (state, action) => {
			state.isLoading = false
			state.states.push(action.payload.data)
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addState.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// All cities
		[allCities.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allCities.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.cities = action.payload.data
		},
		[allCities.rejected]: (state, action) => {
			state.isLoading = false
			state.cities = []
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Add new city
		[addCity.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addCity.fulfilled]: (state, action) => {
			state.isLoading = false
			state.cities.push(action.payload.data)
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addCity.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
	},
})

export const { toastReset } = locationSlice.actions
export default locationSlice.reducer
