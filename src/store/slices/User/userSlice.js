import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
	register,
	getAllPermissions,
	createGroup,
	getAllGroups,
	getGroupDetails,
	getAllUsers,
	addUserToGroup,
	removeUserFromGroup,
	modifyGroup,
	getIndividualUserPermissions,
	modifyIndividualUserPermissions,
	getGroupUsers,
	getUserBySearch,
	getEmployeeProfile,
	modifyEmployeeProfile,
	modifyPassword,
} from "../../../Services/userService"

const initialState = {
	success: "",
	message: "",
	permissions: [],
	groups: [],
	groupDetail: [],
	users: [],
	groupUsersList: null,
	userPermissions: {},
	employeeSearchResult: null,
	employeeProfile: null,
	isLoading: false,
	showToast: false,
}

const errorMessageHandler = (error) => {
	const message = error?.response?.data || error.message || error.toString()
	return message
}

export const registerUser = createAsyncThunk(
	"user/register",
	async (data, thunkAPI) => {
		try {
			const res = await register(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const changePassword = createAsyncThunk(
	"user/changePassword",
	async (data, thunkAPI) => {
		try {
			const res = await modifyPassword(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const fetchEmployeerProfile = createAsyncThunk(
	"user/fetchEmployeerProfile",
	async (data, thunkAPI) => {
		try {
			const res = await getEmployeeProfile(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateEmployeerProfileAdmin = createAsyncThunk(
	"user/updateEmployeerProfileAdmin",
	async (data, thunkAPI) => {
		try {
			const res = await modifyEmployeeProfile(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const allPermissions = createAsyncThunk(
	"user/allPermissions",
	async (_, thunkAPI) => {
		try {
			const res = await getAllPermissions()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const groupCreate = createAsyncThunk(
	"user/groupCreate",
	async (data, thunkAPI) => {
		try {
			const res = await createGroup(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const allGroups = createAsyncThunk(
	"user/allGroups",
	async (_, thunkAPI) => {
		try {
			const res = await getAllGroups()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const groupDetails = createAsyncThunk(
	"user/groupDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getGroupDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const allUsers = createAsyncThunk("user/all", async (_, thunkAPI) => {
	try {
		const res = await getAllUsers()
		return res
	} catch (error) {
		const message = errorMessageHandler(error)
		return thunkAPI.rejectWithValue(message)
	}
})
export const addToGroup = createAsyncThunk(
	"user/addToGroup",
	async (data, thunkAPI) => {
		try {
			const res = await addUserToGroup(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const removeFromGroup = createAsyncThunk(
	"user/removeFromGroup",
	async (data, thunkAPI) => {
		try {
			const res = await removeUserFromGroup(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateGroup = createAsyncThunk(
	"user/updateGroup",
	async (data, thunkAPI) => {
		try {
			const res = await modifyGroup(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const individualUserPermissions = createAsyncThunk(
	"user/getIndvidualUserPermissions",
	async (data, thunkAPI) => {
		try {
			const res = await getIndividualUserPermissions(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateIndividualUserPermissions = createAsyncThunk(
	"user/updateIndividualUserPermissions",
	async (data, thunkAPI) => {
		try {
			const res = await modifyIndividualUserPermissions(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const groupUsers = createAsyncThunk(
	"user/groupUsers",
	async (data, thunkAPI) => {
		try {
			const res = await getGroupUsers(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const searchEmployee = createAsyncThunk(
	"user/search",
	async (data, thunkAPI) => {
		try {
			const res = await getUserBySearch(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		toastReset: (state) => {
			state.showToast = false
		},
	},
	extraReducers: {
		[registerUser.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[registerUser.fulfilled]: (state, action) => {
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
			state.isLoading = false
		},
		[registerUser.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[changePassword.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[changePassword.fulfilled]: (state, action) => {
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
			state.isLoading = false
		},
		[changePassword.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[fetchEmployeerProfile.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[fetchEmployeerProfile.fulfilled]: (state, action) => {
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = false
			state.isLoading = false
			state.employeeProfile = action.payload.data
		},
		[fetchEmployeerProfile.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateEmployeerProfileAdmin.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[updateEmployeerProfileAdmin.fulfilled]: (state, action) => {
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
			state.isLoading = false
			state.employeeProfile = action.payload.data
		},
		[updateEmployeerProfileAdmin.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[allPermissions.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[allPermissions.fulfilled]: (state, action) => {
			// state.success = action.payload.success
			// state.message = action.payload.detail
			state.permissions = action.payload.data
			state.isLoading = false
			state.showToast = false
		},
		[allPermissions.rejected]: (state, action) => {
			state.permissions = []
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[groupCreate.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[groupCreate.fulfilled]: (state, action) => {
			state.success = action.payload.success
			state.message = action.payload.detail
			state.showToast = true
			state.isLoading = false
			state.groups.push(action.payload.data)
		},
		[groupCreate.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[allGroups.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
		},
		[allGroups.fulfilled]: (state, action) => {
			// state.success = action.payload.success
			// state.message = action.payload.detail
			state.isLoading = false
			state.groups = action.payload.data
		},
		[allGroups.rejected]: (state, action) => {
			state.groups = []
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[groupDetails.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
		},
		[groupDetails.fulfilled]: (state, action) => {
			state.success = action.payload.success
			state.message = action.payload.detail
			state.isLoading = false
			state.groupDetail = action.payload.data
		},
		[groupDetails.rejected]: (state, action) => {
			state.groupDetail = []
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[allUsers.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[allUsers.fulfilled]: (state, action) => {
			state.success = action.payload.success
			state.message = action.payload.detail
			state.isLoading = false
			state.users = action.payload.data
			state.showToast = false
		},
		[allUsers.rejected]: (state, action) => {
			state.users = []
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[addToGroup.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[addToGroup.fulfilled]: (state, action) => {
			state.success = action.payload.success
			state.message = action.payload.detail
			state.isLoading = false
			state.showToast = true
		},
		[addToGroup.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[removeFromGroup.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[removeFromGroup.fulfilled]: (state, action) => {
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
			state.isLoading = false
		},
		[removeFromGroup.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateGroup.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[updateGroup.fulfilled]: (state, action) => {
			state.success = action.payload.success
			state.message = action.payload.detail
			state.isLoading = false
			state.groupDetail = action.payload.data
			state.showToast = true
		},
		[updateGroup.rejected]: (state, action) => {
			state.groupDetail = []
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[individualUserPermissions.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[individualUserPermissions.fulfilled]: (state, action) => {
			state.isLoading = false
			state.userPermissions = action.payload.data
			state.showToast = false
		},
		[individualUserPermissions.rejected]: (state, action) => {
			state.userPermissions = []
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateIndividualUserPermissions.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[updateIndividualUserPermissions.fulfilled]: (state, action) => {
			state.success = action.payload.success
			state.message = action.payload.detail
			state.isLoading = false
			state.userPermissions = action.payload.data
			state.showToast = true
		},
		[updateIndividualUserPermissions.rejected]: (state, action) => {
			state.userPermissions = []
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[groupUsers.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
			state.showToast = false
		},
		[groupUsers.fulfilled]: (state, action) => {
			state.success = action.payload.success
			state.message = action.payload.detail
			state.isLoading = false
			state.groupUsersList = action.payload.data
			state.showToast = false
		},
		[groupUsers.rejected]: (state, action) => {
			state.groupUsersList = []
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Search employee
		[searchEmployee.pending]: (state) => {
			state.success = ""
			state.message = ""
			state.isLoading = true
		},
		[searchEmployee.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeSearchResult = action.payload.data
		},
		[searchEmployee.rejected]: (state, action) => {
			state.employeeSearchResult = null
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
	},
})

export const { toastReset } = userSlice.actions
export default userSlice.reducer
