import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
	getAllOrganization,
	addNewOrganization,
	getOrganizationDetails,
	modifyOrganization,
	getOrganizationLocations,
	addNewOrganizationLocation,
	modifyOrganizationLocation,
} from "../../../Services/orgnaizationService"

const initialState = {
	isLoading: false,
	organizations: [],
	orgDetails: {},
	orgLocations: [],
	success: null,
	message: "",
	showToast: false,
}

const errorMessageHandler = (error) => {
	const message = error?.response?.data || error.message || error.toString()
	return message
}

export const allOrganization = createAsyncThunk(
	"organization/all",
	async (_, thunkAPI) => {
		try {
			const res = await getAllOrganization()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createOrganization = createAsyncThunk(
	"organization/addNew",
	async (data, thunkAPI) => {
		try {
			const res = await addNewOrganization(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const organizationDetails = createAsyncThunk(
	"organization/details",
	async (data, thunkAPI) => {
		try {
			const res = await getOrganizationDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateOrganization = createAsyncThunk(
	"organization/update",
	async (data, thunkAPI) => {
		try {
			const res = await modifyOrganization(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const organizationLocations = createAsyncThunk(
	"organization/locations",
	async (data, thunkAPI) => {
		try {
			const res = await getOrganizationLocations(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createOrganizationLocation = createAsyncThunk(
	"organization/addNewlocation",
	async (data, thunkAPI) => {
		try {
			const res = await addNewOrganizationLocation(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateOrganizationLocation = createAsyncThunk(
	"organization/updatelocation",
	async (data, thunkAPI) => {
		try {
			const res = await modifyOrganizationLocation(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const organizationSlice = createSlice({
	name: "organization",
	initialState,
	reducers: {
		toastReset: (state) => {
			state.showToast = false
		},
	},
	extraReducers: {
		// All organizations
		[allOrganization.pending]: (state) => {
			state.isLoading = false
			state.showToast = false
		},
		[allOrganization.fulfilled]: (state, action) => {
			state.isLoading = false
			state.organizations = action.payload.data
		},
		[allOrganization.rejected]: (state, action) => {
			state.isLoading = false
			state.organizations = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Add new organiztion
		[createOrganization.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createOrganization.fulfilled]: (state, action) => {
			state.isLoading = false
			state.organizations.push(action.payload.data)
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[createOrganization.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Organization details
		[organizationDetails.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[organizationDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.orgDetails = action.payload.data
		},
		[organizationDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.orgDetails = {}
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update Organization
		[updateOrganization.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateOrganization.fulfilled]: (state, action) => {
			state.isLoading = false
			state.orgDetails = action.payload.data
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateOrganization.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// All organizations locations
		[organizationLocations.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[organizationLocations.fulfilled]: (state, action) => {
			state.isLoading = false
			state.orgLocations = action.payload.data
		},
		[organizationLocations.rejected]: (state, action) => {
			state.isLoading = false
			state.orgLocations = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Add new organiztion location
		[createOrganizationLocation.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createOrganizationLocation.fulfilled]: (state, action) => {
			state.isLoading = false
			state.orgLocations.push(action.payload.data)
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[createOrganizationLocation.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Update Organization location
		[updateOrganizationLocation.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateOrganizationLocation.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateOrganizationLocation.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
	},
})

export const { toastReset } = organizationSlice.actions
export default organizationSlice.reducer
