import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
	getGenderData,
	getleavesData,
	getBloodGroupData,
} from "../../../Services/chartsService"

const initialState = {
	isLoading: false,
	strong: [],
	mocks: [],
	progress: [],
	success: null,
	message: "",
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

export const fetchGenderData = createAsyncThunk(
	"charts/fetchGenderData",
	async (_, thunkAPI) => {
		try {
			const res = await getGenderData()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchLeavesData = createAsyncThunk(
	"charts/fetchLeavesData",
	async (_, thunkAPI) => {
		try {
			const res = await getleavesData()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchBloodGroupData = createAsyncThunk(
	"charts/fetchBloodGroupData",
	async (_, thunkAPI) => {
		try {
			const res = await getBloodGroupData()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const chartsSlice = createSlice({
	name: "charts",
	initialState,
	reducers: {
		toastReset: (state) => {
			state.showToast = false
		},
	},
	extraReducers: {
		// Genders charts data
		[fetchGenderData.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchGenderData.fulfilled]: (state, action) => {
			state.isLoading = false
			state.genderData = action.payload.data
		},
		[fetchGenderData.rejected]: (state, action) => {
			state.isLoading = false
			state.genderData = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Leaves charts data
		[fetchLeavesData.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchLeavesData.fulfilled]: (state, action) => {
			state.isLoading = false
			state.leavesData = action.payload.data
		},
		[fetchLeavesData.rejected]: (state, action) => {
			state.isLoading = false
			state.leavesData = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Blood-group charts data
		[fetchBloodGroupData.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchBloodGroupData.fulfilled]: (state, action) => {
			state.isLoading = false
			state.bloodGroupData = action.payload.data
		},
		[fetchBloodGroupData.rejected]: (state, action) => {
			state.isLoading = false
			state.bloodGroupData = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
	},
})

export const { toastReset } = chartsSlice.actions
export default chartsSlice.reducer
