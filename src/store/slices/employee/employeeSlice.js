import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
	getAllDepartments,
	getAllDesignations,
	getEmployeeProfile,
	getAllEmployeeDocuments,
	// getAllEmployeeBanks,
	getEmployeeTypes,
	register,
	addDepartment,
	addDesignation,
	addEmployeeType,
	addAllDocumentTypes,
	addBanks,
	getAllBanks,
	getAllDocumentTypes,
	modifyEmployeeProfile,
	addDocs,
	getAddressAll,
	getAttendanceAll,
	getAddressDetail,
	getEmployeeLeaves,
	addAddress,
	modifyAddress,
	deleteAddress,
	addAttendance,
	addEmployeeLeaves,
} from "../../../Services/employeeService"

const initialState = {
	isLoading: false,
	departments: [],
	designations: [],
	employeeTypes: [],
	documentTypes: [],
	employeeDocs: [],
	employeeAddresses: [],
	employeeAddressDetail: {},
	employeeAttendance: [],
	employeeLeaves: [],
	banks: [],
	profile: null,
	success: "",
	message: "",
	showToast: false,
}

const errorMessageHandler = (error) => {
	const message = error?.response?.data || error.message || error.toString()
	return message
	// const message =
	// 	(error.data && error.data.data && error.data.data.message) ||
	// 	error.message ||
	// 	error.toString()
	// console.log(message)
}

export const allDepartments = createAsyncThunk(
	"employee/allDepartments",
	async (_, thunkAPI) => {
		try {
			const data = await getAllDepartments()
			return data
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const allDesignations = createAsyncThunk(
	"employee/allDesignations",
	async (_, thunkAPI) => {
		try {
			const data = await getAllDesignations()
			return data
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const allEmployeeTypes = createAsyncThunk(
	"employee/allEmployeeTypes",
	async (_, thunkAPI) => {
		try {
			const data = await getEmployeeTypes()
			return data
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const registerEmployee = createAsyncThunk(
	"employee/register",
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
export const createDepartment = createAsyncThunk(
	"employee/createDepartment",
	async (data, thunkAPI) => {
		try {
			const res = await addDepartment(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createDesignation = createAsyncThunk(
	"employee/createDesignation",
	async (data, thunkAPI) => {
		try {
			const res = await addDesignation(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createEmployeeType = createAsyncThunk(
	"employee/createEmployeeType",
	async (data, thunkAPI) => {
		try {
			const res = await addEmployeeType(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const allDocumentTypes = createAsyncThunk(
	"documents/allTypes",
	async (_, thunkAPI) => {
		try {
			const data = await getAllDocumentTypes()
			return data
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const allBanks = createAsyncThunk(
	"banks/getAll",
	async (_, thunkAPI) => {
		try {
			const data = await getAllBanks()
			return data
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createDocumentTypes = createAsyncThunk(
	"documents/createTypes",
	async (data, thunkAPI) => {
		try {
			const res = await addAllDocumentTypes(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createBankType = createAsyncThunk(
	"banks/createNew",
	async (data, thunkAPI) => {
		try {
			const res = await addBanks(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const employeeProfile = createAsyncThunk(
	"employee/getProfile",
	async (_, thunkAPI) => {
		try {
			const data = await getEmployeeProfile()
			return data
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateEmployeeProfile = createAsyncThunk(
	"employee/updateProfile",
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
export const allEmployeeDocuments = createAsyncThunk(
	"employee/allEmployeeDocuments",
	async (_, thunkAPI) => {
		try {
			const data = await getAllEmployeeDocuments()
			return data
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addDocuments = createAsyncThunk(
	"employee/addDocuments",
	async (data, thunkAPI) => {
		try {
			const res = await addDocs(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addressAll = createAsyncThunk(
	"employee/allAddress",
	async (_, thunkAPI) => {
		try {
			const res = await getAddressAll()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addressDetail = createAsyncThunk(
	"employee/addressDetail",
	async (data, thunkAPI) => {
		try {
			const res = await getAddressDetail(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const attendanceAll = createAsyncThunk(
	"employee/allAttendance",
	async (_, thunkAPI) => {
		try {
			const res = await getAttendanceAll()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const getLeaves = createAsyncThunk(
	"employee/getLeaves",
	async (_, thunkAPI) => {
		try {
			const res = await getEmployeeLeaves()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addNewAddress = createAsyncThunk(
	"employee/addAddress",
	async (data, thunkAPI) => {
		try {
			const res = await addAddress(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateAddress = createAsyncThunk(
	"employee/updateAddress",
	async (data, thunkAPI) => {
		try {
			const res = await modifyAddress(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const removeAddress = createAsyncThunk(
	"employee/removeAddress",
	async (data, thunkAPI) => {
		try {
			const res = await deleteAddress(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addEmployeeAttendance = createAsyncThunk(
	"employee/addAttendance",
	async (data, thunkAPI) => {
		try {
			const res = await addAttendance(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addLeaves = createAsyncThunk(
	"employee/addLeaves",
	async (data, thunkAPI) => {
		try {
			const res = await addEmployeeLeaves(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
// export const allBankEmployee = createAsyncThunk(
// 	"employee/allBankEmployee",
// 	async (_, thunkAPI) => {
// 		try {
// 			const data = getAllEmployeeBanks()
// 			return data
// 		} catch (error) {
// 			const message = errorMessageHandler(error)
// 			return thunkAPI.rejectWithValue(message)
// 		}
// 	}
// )

const employeeSlice = createSlice({
	name: "employee",
	initialState,
	reducers: {
		toastReset: (state) => {
			state.showToast = false
		},
		successReset: (state) => {
			state.success = ""
		},
	},
	extraReducers: {
		// Register Employee
		[registerEmployee.pending]: (state) => {
			state.isLoading = true
			state.success = ""
			state.message = ""
			state.showToast = false
		},
		[registerEmployee.fulfilled]: (state, action) => {
			state.isLoading = false
			state.success = action.payload.success
			state.message = action.payload.detail
			state.showToast = true
		},
		[registerEmployee.rejected]: (state, action) => {
			state.isLoading = false
			state.success = action.payload.success
			state.message = action.payload.detail
			state.showToast = true
		},
		// All Departments
		[allDepartments.pending]: (state) => {
			state.isLoading = false
			state.showToast = false
		},
		[allDepartments.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.departments = action.payload.data
		},
		[allDepartments.rejected]: (state, action) => {
			state.departments = []
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// All Designations
		[allDesignations.pending]: (state) => {
			state.isLoading = false
			state.showToast = false
		},
		[allDesignations.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.designations = action.payload.data
		},
		[allDesignations.rejected]: (state, action) => {
			state.designations = []
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// All Designations
		[allEmployeeTypes.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allEmployeeTypes.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.employeeTypes = action.payload.data
		},
		[allEmployeeTypes.rejected]: (state, action) => {
			state.employeeTypes = []
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// Create Department
		[createDepartment.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createDepartment.fulfilled]: (state, action) => {
			state.isLoading = false
			state.departments.push(action.payload.data)
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[createDepartment.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// Create Designation
		[createDesignation.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createDesignation.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.designations.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[createDesignation.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// Create employee type
		[createEmployeeType.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createEmployeeType.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.employeeTypes.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[createEmployeeType.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[allDocumentTypes.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allDocumentTypes.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.documentTypes = action.payload.data
		},
		[allDocumentTypes.rejected]: (state, action) => {
			state.documentTypes = []
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[allBanks.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allBanks.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.banks = action.payload.data
		},
		[allBanks.rejected]: (state, action) => {
			state.banks = []
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[createDocumentTypes.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createDocumentTypes.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.documentTypes.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[createDocumentTypes.rejected]: (state, action) => {
			state.documentTypes = []
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[createBankType.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createBankType.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.banks.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[createBankType.rejected]: (state, action) => {
			state.banks = []
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[employeeProfile.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[employeeProfile.fulfilled]: (state, action) => {
			state.profile = action.payload.data
			state.isLoading = false
			state.showToast = false
		},
		[employeeProfile.rejected]: (state, action) => {
			state.isLoading = false
			state.profile = null
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[updateEmployeeProfile.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateEmployeeProfile.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.profile = action.payload.data
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[updateEmployeeProfile.rejected]: (state, action) => {
			state.profile = null
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[allEmployeeDocuments.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allEmployeeDocuments.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.employeeDocs = action.payload.data
		},
		[allEmployeeDocuments.rejected]: (state, action) => {
			state.isLoading = false
			state.employeeDocs = []
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[addDocuments.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addDocuments.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.employeeDocs.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addDocuments.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[addressAll.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addressAll.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.employeeAddresses = action.payload.data
		},
		[addressAll.rejected]: (state, action) => {
			state.isLoading = false
			state.employeeAddresses = []
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[addressDetail.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addressDetail.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.employeeAddressDetail = action.payload.data
		},
		[addressDetail.rejected]: (state, action) => {
			state.isLoading = false
			state.employeeAddressDetail = []
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[attendanceAll.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[attendanceAll.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeAttendance = action.payload.data
			state.showToast = false
		},
		[attendanceAll.rejected]: (state, action) => {
			state.isLoading = false
			state.employeeAttendance = []
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[getLeaves.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[getLeaves.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeLeaves = action.payload.data
			state.showToast = false
		},
		[getLeaves.rejected]: (state, action) => {
			state.isLoading = false
			state.employeeLeaves = []
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// add new address
		[addNewAddress.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addNewAddress.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.employeeAddresses.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addNewAddress.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// Update employee address
		[updateAddress.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateAddress.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[updateAddress.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// Delete employee address
		[removeAddress.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[removeAddress.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[removeAddress.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// Add employee attendance
		[addEmployeeAttendance.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addEmployeeAttendance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.employeeAttendance.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addEmployeeAttendance.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// Add employee leaves
		[addLeaves.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addLeaves.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.employeeLeaves.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addLeaves.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
	},
})

export const { toastReset, successReset } = employeeSlice.actions
export default employeeSlice.reducer
