import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
	getAllWorkExperiences,
	addWorkExperience,
	modifyWorkExperience,
	deleteWorkExperience,
	getAllEducations,
	addNewEducation,
	modifyEducation,
	deleteEducation,
	getAllDependents,
	addNewDependent,
	modifyDependent,
	deleteDependent,
} from "../../../Services/employeeService"

const initialState = {
	isLoading: false,
	workExperiences: [],
	educations: [],
	dependents: [],
	success: null,
	message: "",
	showToast: false,
}

const errorMessageHandler = (error) => {
	const message = error?.response?.data || error.message || error.toString()
	return message
}

// Work experiences ====>>
export const allWorkExperiences = createAsyncThunk(
	"employee/allWorkExperiences",
	async (_, thunkAPI) => {
		try {
			const res = await getAllWorkExperiences()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const newWorkExperience = createAsyncThunk(
	"employee/newWorkExperience",
	async (data, thunkAPI) => {
		try {
			const res = await addWorkExperience(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateWorkExperience = createAsyncThunk(
	"employee/updateWorkExperience",
	async (data, thunkAPI) => {
		try {
			const res = await modifyWorkExperience(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const removeWorkExperience = createAsyncThunk(
	"employee/removeWorkExperience",
	async (data, thunkAPI) => {
		try {
			const res = await deleteWorkExperience(data)
			console.log("delele res", res)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Education ====>>
export const allEducations = createAsyncThunk(
	"employee/allEducations",
	async (_, thunkAPI) => {
		try {
			const res = await getAllEducations()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const newEducation = createAsyncThunk(
	"employee/addNewEducation",
	async (data, thunkAPI) => {
		try {
			const res = await addNewEducation(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateEducation = createAsyncThunk(
	"employee/updateEducation",
	async (data, thunkAPI) => {
		try {
			const res = await modifyEducation(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const removeEducation = createAsyncThunk(
	"employee/removeEducation",
	async (data, thunkAPI) => {
		try {
			const res = await deleteEducation(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Dependents ====>>
export const allDependents = createAsyncThunk(
	"employee/allDependents",
	async (_, thunkAPI) => {
		try {
			const res = await getAllDependents()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const newDependent = createAsyncThunk(
	"employee/addNewDependent",
	async (data, thunkAPI) => {
		try {
			const res = await addNewDependent(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateDependent = createAsyncThunk(
	"employee/updateDependent",
	async (data, thunkAPI) => {
		try {
			const res = await modifyDependent(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const removeDependent = createAsyncThunk(
	"employee/removeDependent",
	async (data, thunkAPI) => {
		try {
			const res = await deleteDependent(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Slice ====>>
const workAndEducationSlice = createSlice({
	name: "workAndEdu",
	initialState,
	reducers: {
		toastReset: (state) => {
			state.showToast = false
		},
	},
	extraReducers: {
		// Work experiences
		[allWorkExperiences.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allWorkExperiences.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.workExperiences = action.payload.data
		},
		[allWorkExperiences.rejected]: (state, action) => {
			state.isLoading = false
			state.workExperiences = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},

		[newWorkExperience.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[newWorkExperience.fulfilled]: (state, action) => {
			state.isLoading = false
			state.workExperiences.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[newWorkExperience.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},

		[updateWorkExperience.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateWorkExperience.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateWorkExperience.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},

		[removeWorkExperience.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[removeWorkExperience.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[removeWorkExperience.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Education
		[allEducations.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allEducations.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.educations = action.payload.data
		},
		[allEducations.rejected]: (state, action) => {
			state.isLoading = false
			state.educations = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},

		[newEducation.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[newEducation.fulfilled]: (state, action) => {
			state.isLoading = false
			state.educations.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[newEducation.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},

		[updateEducation.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateEducation.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateEducation.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},

		[removeEducation.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[removeEducation.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[removeEducation.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},

		// Dependents
		[allDependents.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allDependents.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.dependents = action.payload.data
		},
		[allDependents.rejected]: (state, action) => {
			state.isLoading = false
			state.dependents = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},

		[newDependent.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[newDependent.fulfilled]: (state, action) => {
			state.isLoading = false
			state.dependents.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[newDependent.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},

		[updateDependent.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateDependent.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateDependent.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},

		[removeDependent.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[removeDependent.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[removeDependent.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
	},
})

export const { toastReset } = workAndEducationSlice.actions
export default workAndEducationSlice.reducer
