import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
	getAllAttendance,
	getEmployeeAttendance,
	getEmployeeAttendanceDetail,
	modifyEmployeeAttendance,
	getAllLeaves,
	getLeaveByEmployee,
	getLeaveDetail,
	modifyLeaveDetail,
	getHolidays,
	addHolidays,
	addEmployeeBulkAttendance,
	addEmployeeAttendanceAdmin,
	getAllAttendanceDateFilter,
	getAllAttendanceByDate,
} from "../../../Services/attendanceService"

const initialState = {
	isLoading: false,
	allAttendance: null,
	allAttendanceWithFilters: [],
	singleEmployeeAttendance: [],
	employeeAttendanceDetail: {},
	leaves: [],
	leaveDetails: {},
	leavesByEmployee: [],
	holidays: [],
	success: "",
	message: "",
	showToast: false,
}

const errorMessageHandler = (error) => {
	const message = error?.response?.data || error.message || error.toString()
	return message
}

export const allHolidays = createAsyncThunk(
	"holidays/all",
	async (_, thunkAPI) => {
		try {
			const res = await getHolidays()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createHolidays = createAsyncThunk(
	"holidays/create",
	async (data, thunkAPI) => {
		try {
			const res = await addHolidays(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const allEmployeeAttendance = createAsyncThunk(
	"attendence/allAttendance",
	async (data, thunkAPI) => {
		try {
			const res = await getAllAttendance(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const employeeAttendance = createAsyncThunk(
	"attendence/employeeAttendance",
	async (data, thunkAPI) => {
		try {
			const res = await getEmployeeAttendance(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const attendanceDetail = createAsyncThunk(
	"attendence/attendanceDetail",
	async (data, thunkAPI) => {
		try {
			const res = await getEmployeeAttendanceDetail(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateEmployeeAttendance = createAsyncThunk(
	"attendence/updateEmployeeAttendance",
	async (data, thunkAPI) => {
		try {
			const res = await modifyEmployeeAttendance(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createEmployeeAttendance = createAsyncThunk(
	"attendence/createEmployeeAttendance",
	async (data, thunkAPI) => {
		try {
			const res = await addEmployeeAttendanceAdmin(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const allLeaves = createAsyncThunk(
	"leaves/all",
	async (data, thunkAPI) => {
		try {
			const res = await getAllLeaves(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchLeaveDetails = createAsyncThunk(
	"leaves/details",
	async (data, thunkAPI) => {
		try {
			const res = await getLeaveDetail(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateDetail = createAsyncThunk(
	"leaves/update",
	async (data, thunkAPI) => {
		try {
			const res = await modifyLeaveDetail(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchLeavesByEmployee = createAsyncThunk(
	"leaves/leaveByEmployee",
	async (data, thunkAPI) => {
		try {
			const res = await getLeaveByEmployee(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createBulkEmployeeAttendance = createAsyncThunk(
	"attendance/createBulkAttendance",
	async (data, thunkAPI) => {
		try {
			const res = await addEmployeeBulkAttendance(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchAllAttendanceDateFilter = createAsyncThunk(
	"attendance/fetchAllAttendanceDateFilter",
	async (data, thunkAPI) => {
		try {
			const res = await getAllAttendanceDateFilter(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchAllAttendanceByDate = createAsyncThunk(
	"attendance/fetchAllAttendanceByDate",
	async (data, thunkAPI) => {
		try {
			const res = await getAllAttendanceByDate(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const attendanceSlice = createSlice({
	name: "attendance",
	initialState,
	reducers: {
		toastReset: (state) => {
			state.showToast = false
		},
	},
	extraReducers: {
		// All holidays
		[allHolidays.pending]: (state) => {
			state.isLoading = false
			state.showToast = false
		},
		[allHolidays.fulfilled]: (state, action) => {
			state.isLoading = false
			state.holidays = action.payload.data
			state.success = action.payload.success
			state.message = action.payload.detail
			state.showToast = false
		},
		[allHolidays.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
			state.holidays = []
		},
		// Create holidays
		[createHolidays.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createHolidays.fulfilled]: (state, action) => {
			state.isLoading = false
			state.holidays.push(action.payload.data)
			state.success = action.payload.success
			state.message = action.payload.detail
			state.showToast = true
		},
		[createHolidays.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// All leaves
		[allLeaves.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allLeaves.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.leaves = action.payload.data
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[allLeaves.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
			state.leaves = []
		},
		// Leave details
		[fetchLeaveDetails.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchLeaveDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.leaveDetails = action.payload.data
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[fetchLeaveDetails.rejected]: (state, action) => {
			state.leaveDetails = {}
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Update leave details
		[updateDetail.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateDetail.fulfilled]: (state, action) => {
			state.isLoading = false
			state.leaveDetails = action.payload.data
			state.success = action.payload.success
			state.message = action.payload.detail
			state.showToast = true
		},
		[updateDetail.rejected]: (state, action) => {
			state.leaveDetails = {}
			state.isLoading = false
			state.success = action.payload.success
			state.message = action.payload.detail
			state.showToast = true
		},
		// Get detials by employee
		[fetchLeavesByEmployee.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchLeavesByEmployee.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.leavesByEmployee = action.payload.data
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[fetchLeavesByEmployee.rejected]: (state, action) => {
			state.leavesByEmployee = []
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Get all the employees attendance
		[allEmployeeAttendance.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
			state.allAttendance = null
		},

		[allEmployeeAttendance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.allAttendance = {
				data: action.payload.data,
				count: action.payload.count,
			}
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[allEmployeeAttendance.rejected]: (state, action) => {
			state.isLoading = false
			state.allAttendance = null
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Get single employee attendance
		[employeeAttendance.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},

		[employeeAttendance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.singleEmployeeAttendance = action.payload.data
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[employeeAttendance.rejected]: (state, action) => {
			state.isLoading = false
			state.singleEmployeeAttendance = []
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Get single employee attendance detail
		[attendanceDetail.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},

		[attendanceDetail.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.employeeAttendanceDetail = action.payload.data
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[attendanceDetail.rejected]: (state, action) => {
			state.isLoading = false
			state.employeeAttendanceDetail = {}
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Update single employee attendance detail
		[updateEmployeeAttendance.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},

		[updateEmployeeAttendance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeAttendanceDetail = action.payload.data
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[updateEmployeeAttendance.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.employeeAttendanceDetail = {}
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// Create bulk attendance
		[createBulkEmployeeAttendance.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},

		[createBulkEmployeeAttendance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.allAttendance.push(action.payload.data)
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[createBulkEmployeeAttendance.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// Create employee attendance admin
		[createEmployeeAttendance.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},

		[createEmployeeAttendance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.singleEmployeeAttendance.push(action.payload.data)
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[createEmployeeAttendance.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		// Get all the employees attendance with from and to dates
		[fetchAllAttendanceDateFilter.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},

		[fetchAllAttendanceDateFilter.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.allAttendance = action.payload.data
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[fetchAllAttendanceDateFilter.rejected]: (state, action) => {
			state.isLoading = false
			state.allAttendance = []
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Get all employee attendance by date
		[fetchAllAttendanceByDate.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},

		[fetchAllAttendanceByDate.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = false
			state.allAttendanceWithFilters = action.payload.data
			state.success = action.payload.success
			state.message = action.payload.detail
		},
		[fetchAllAttendanceByDate.rejected]: (state, action) => {
			state.isLoading = false
			state.allAttendanceWithFilters = []
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
	},
})

export const { toastReset } = attendanceSlice.actions
export default attendanceSlice.reducer
