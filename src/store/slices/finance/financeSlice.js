import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
	// Allowances
	getAllAllowances,
	addNewAllowance,
	getAllowanceDetail,
	modifyAllowance,
	removeAllowance,
	// Deductions
	getAllDeductions,
	addNewDeductions,
	getDeductionDetail,
	modifyDeduction,
	removeDeduction,
	// Employee allowances
	addEmployeeAllowance,
	getEmployeeAllowance,
	getEmployeeAllowanceDetail,
	modifyEmployeeAllowance,
	removeEmployeeAllowance,
	// Employeee deduction
	addEmployeeDeduction,
	getEmployeeDeductions,
	getEmployeeDeductionDetail,
	modifyEmployeeDeduction,
	removeEmployeeDeduction,
	// Employee earnings
	getEmployeeEarnings,
	modifyEmployeeEarnings,
	// Employee payroll
	getEmployeePayroll,
	// Expenses
	getAllExpenses,
	getExpensesByEmployee,
	getExpensesDetails,
	modifyExpenses,
	// Employee expense
	getAllExpensesEmployee,
	addNewExpenseEmployee,
	modifyNewExpenseEmployee,
	getEmployeeExpenseDetails,
} from "../../../Services/financeService"

const initialState = {
	isLoading: false,
	allowances: [],
	allowanceDetails: {},
	deductions: [],
	deductionDetails: {},
	employeeAllowances: [],
	employeeAllowanceDetails: {},
	employeeDeductions: [],
	employeeDeductionDetails: {},
	employeeEarning: {},
	employeePayroll: null,
	// expenses
	allExpenses: null,
	individualEmployeeExpenses: null,
	expenseDetails: null,
	// employee side expenses
	allExpensesEmployee: null,
	employeeExpenseDetails: null,
	success: null,
	message: "",
	showToast: false,
}

const errorMessageHandler = (error) => {
	const message = error?.response?.data || error.message || error.toString()
	return message
}

// Expenses
export const fetchAllExpenses = createAsyncThunk(
	"finance/fetchAllExpenses",
	async (data, thunkAPI) => {
		try {
			const res = await getAllExpenses(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchExpensesByEmployee = createAsyncThunk(
	"finance/fetchExpensesByEmployee",
	async (data, thunkAPI) => {
		try {
			const res = await getExpensesByEmployee(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchExpensesDetails = createAsyncThunk(
	"finance/fetchExpensesDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getExpensesDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateExpenses = createAsyncThunk(
	"finance/updateExpenses",
	async (data, thunkAPI) => {
		try {
			const res = await modifyExpenses(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Expenses (employee)
export const fetchEmployeeExpenseDetails = createAsyncThunk(
	"finance/fetchEmployeeExpenseDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getEmployeeExpenseDetails(data)

			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchAllExpensesEmployee = createAsyncThunk(
	"finance/fetchAllExpensesEmployee",
	async (data, thunkAPI) => {
		try {
			const res = await getAllExpensesEmployee(data)

			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createExpenseEmployee = createAsyncThunk(
	"finance/createExpenseEmployee",
	async (data, thunkAPI) => {
		try {
			const res = await addNewExpenseEmployee(data)

			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateExpenseEmployee = createAsyncThunk(
	"finance/updateExpenseEmployee",
	async (data, thunkAPI) => {
		try {
			const res = await modifyNewExpenseEmployee(data)

			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Allowances ===>>
export const allAllowances = createAsyncThunk(
	"finance/allAllowances",
	async (_, thunkAPI) => {
		try {
			const res = await getAllAllowances()

			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createAllowance = createAsyncThunk(
	"finance/createAllowance",
	async (data, thunkAPI) => {
		try {
			const res = await addNewAllowance(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchAllowanceDetail = createAsyncThunk(
	"finance/allowanceDetail",
	async (data, thunkAPI) => {
		try {
			const res = await getAllowanceDetail(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateAllowance = createAsyncThunk(
	"finance/updateAllowance",
	async (data, thunkAPI) => {
		try {
			const res = await modifyAllowance(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteAllowance = createAsyncThunk(
	"finance/deleteAllowance",
	async (data, thunkAPI) => {
		try {
			const res = await removeAllowance(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Deductions ===>>
export const allDeductions = createAsyncThunk(
	"finance/allDeductions",
	async (_, thunkAPI) => {
		try {
			const res = await getAllDeductions()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createDeductions = createAsyncThunk(
	"finance/createDeduction",
	async (data, thunkAPI) => {
		try {
			const res = await addNewDeductions(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchDeductionDetail = createAsyncThunk(
	"finance/deductionDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getDeductionDetail(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateDeduction = createAsyncThunk(
	"finance/updateDeduction",
	async (data, thunkAPI) => {
		try {
			const res = await modifyDeduction(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteDeduction = createAsyncThunk(
	"finance/deleteDeduction",
	async (data, thunkAPI) => {
		try {
			const res = await removeDeduction(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
// Employee allowances ===>>
export const allAllowancesEmployee = createAsyncThunk(
	"finance/allAllowancesEmployee",
	async (data, thunkAPI) => {
		try {
			const res = await getEmployeeAllowance(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createEmployeeAllowance = createAsyncThunk(
	"finance/createEmployeeAllowance",
	async (data, thunkAPI) => {
		try {
			const res = await addEmployeeAllowance(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchEmployeeAllowanceDetail = createAsyncThunk(
	"finance/employeeAllowanceDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getEmployeeAllowanceDetail(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateEmployeeAllowance = createAsyncThunk(
	"finance/updateEmployeeAllowance",
	async (data, thunkAPI) => {
		try {
			const res = await modifyEmployeeAllowance(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteEmployeeAllowance = createAsyncThunk(
	"finance/deleteEmployeeAllowance",
	async (data, thunkAPI) => {
		try {
			const res = await removeEmployeeAllowance(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
// Employee deductions ===>>
export const allDeductionsEmployee = createAsyncThunk(
	"finance/allDeductionsEmployee",
	async (data, thunkAPI) => {
		try {
			const res = await getEmployeeDeductions(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const createEmployeeDeduction = createAsyncThunk(
	"finance/createEmployeeDeduction",
	async (data, thunkAPI) => {
		try {
			const res = await addEmployeeDeduction(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchEmployeeDeductionDetail = createAsyncThunk(
	"finance/employeeDeductionDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getEmployeeDeductionDetail(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateEmployeeDeduction = createAsyncThunk(
	"finance/updateEmployeeDeduction",
	async (data, thunkAPI) => {
		try {
			const res = await modifyEmployeeDeduction(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteEmployeeDeduction = createAsyncThunk(
	"finance/deleteEmployeeDeduction",
	async (data, thunkAPI) => {
		try {
			const res = await removeEmployeeDeduction(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Employee Earnings
export const fetchEmployeeEarning = createAsyncThunk(
	"finance/fetchEmployeeEarning",
	async (data, thunkAPI) => {
		try {
			const res = await getEmployeeEarnings(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateEmployeeEarning = createAsyncThunk(
	"finance/updateEmployeeEarning",
	async (data, thunkAPI) => {
		try {
			const res = await modifyEmployeeEarnings(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// Employee payroll
export const fetchEmployeePayroll = createAsyncThunk(
	"finance/fetchEmployeePayroll",
	async (data, thunkAPI) => {
		try {
			const res = await getEmployeePayroll(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// finance slice ===>>
const financeSlice = createSlice({
	name: "finance",
	initialState,
	reducers: {
		toastReset: (state) => {
			state.showToast = false
		},
	},
	extraReducers: {
		// All expenses
		[fetchAllExpenses.pending]: (state) => {
			state.isLoading = false
			state.showToast = false
		},
		[fetchAllExpenses.fulfilled]: (state, action) => {
			state.isLoading = false
			state.allExpenses = action.payload.data
		},
		[fetchAllExpenses.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Expenses by employee
		[fetchExpensesByEmployee.pending]: (state) => {
			state.isLoading = false
			state.showToast = false
		},
		[fetchExpensesByEmployee.fulfilled]: (state, action) => {
			state.isLoading = false
			state.individualEmployeeExpenses = action.payload.data
		},
		[fetchExpensesByEmployee.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Expenses details
		[fetchExpensesDetails.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchExpensesDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.expenseDetails = action.payload.data
		},
		[fetchExpensesDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Expenses update
		[updateExpenses.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateExpenses.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[updateExpenses.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update expenses employee
		[updateExpenseEmployee.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateExpenseEmployee.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeExpenseDetails = action.payload.data
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[updateExpenseEmployee.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		//  Expenses details employee
		[fetchEmployeeExpenseDetails.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchEmployeeExpenseDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeExpenseDetails = action.payload.data
		},
		[fetchEmployeeExpenseDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// All expenses employee
		[fetchAllExpensesEmployee.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchAllExpensesEmployee.fulfilled]: (state, action) => {
			state.isLoading = false
			state.allExpensesEmployee = action.payload.data
		},
		[fetchAllExpensesEmployee.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Add expenses employee
		[createExpenseEmployee.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createExpenseEmployee.fulfilled]: (state, action) => {
			state.isLoading = false
			state.allExpensesEmployee.push(action.payload.data)
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[createExpenseEmployee.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// All allowances
		[allAllowances.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allAllowances.fulfilled]: (state, action) => {
			state.isLoading = false
			state.allowances = action.payload.data
		},
		[allAllowances.rejected]: (state, action) => {
			state.isLoading = false
			state.allowances = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Add new allowance
		[createAllowance.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createAllowance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.allowances.push(action.payload.data)
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[createAllowance.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Allowance details
		[fetchAllowanceDetail.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchAllowanceDetail.fulfilled]: (state, action) => {
			state.isLoading = false
			state.allowanceDetails = action.payload.data
		},
		[fetchAllowanceDetail.rejected]: (state, action) => {
			state.isLoading = false
			state.allowanceDetails = {}
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update allowance
		[updateAllowance.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateAllowance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.allowanceDetails = action.payload.data
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateAllowance.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete allowance
		[deleteAllowance.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteAllowance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteAllowance.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// All deductiions
		[allDeductions.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allDeductions.fulfilled]: (state, action) => {
			state.isLoading = false
			state.deductions = action.payload.data
		},
		[allDeductions.rejected]: (state, action) => {
			state.isLoading = false
			state.deductions = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Add new deduction
		[createDeductions.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createDeductions.fulfilled]: (state, action) => {
			state.isLoading = false
			state.deductions.push(action.payload.data)
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[createDeductions.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Deduction details
		[fetchDeductionDetail.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchDeductionDetail.fulfilled]: (state, action) => {
			state.isLoading = false
			state.deductionDetails = action.payload.data
		},
		[fetchDeductionDetail.rejected]: (state, action) => {
			state.isLoading = false
			state.deductionDetails = {}
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update deduction
		[updateDeduction.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateDeduction.fulfilled]: (state, action) => {
			state.isLoading = false
			state.deductionDetails = action.payload.data
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateDeduction.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete deductions
		[deleteDeduction.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteDeduction.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteDeduction.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// All allowances of an employee
		[allAllowancesEmployee.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allAllowancesEmployee.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeAllowances = action.payload.data
		},
		[allAllowancesEmployee.rejected]: (state, action) => {
			state.isLoading = false
			state.employeeAllowances = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Add new allowances for an employee
		[createEmployeeAllowance.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createEmployeeAllowance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeAllowances.push(action.payload.data)
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[createEmployeeAllowance.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Employee allowance details
		[fetchEmployeeAllowanceDetail.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchEmployeeAllowanceDetail.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeAllowanceDetails = action.payload.data
		},
		[fetchEmployeeAllowanceDetail.rejected]: (state, action) => {
			state.isLoading = false
			state.employeeAllowanceDetails = {}
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update employee allowances
		[updateEmployeeAllowance.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateEmployeeAllowance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeAllowanceDetails = action.payload.data
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateEmployeeAllowance.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete employee allowances
		[deleteEmployeeAllowance.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteEmployeeAllowance.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteEmployeeAllowance.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// All Deductions of an employee
		[allDeductionsEmployee.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[allDeductionsEmployee.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeDeductions = action.payload.data
		},
		[allDeductionsEmployee.rejected]: (state, action) => {
			state.isLoading = false
			state.employeeDeductions = []
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Add new deduction for an employee
		[createEmployeeDeduction.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[createEmployeeDeduction.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeDeductions.push(action.payload.data)
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[createEmployeeDeduction.rejected]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		// Employee deduction details
		[fetchEmployeeDeductionDetail.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchEmployeeDeductionDetail.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeDeductionDetails = action.payload.data
		},
		[fetchEmployeeDeductionDetail.rejected]: (state, action) => {
			state.isLoading = false
			state.employeeDeductionDetails = {}
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update employee deduction
		[updateEmployeeDeduction.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateEmployeeDeduction.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeDeductionDetails = action.payload.data
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateEmployeeDeduction.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete employee deduction
		[deleteEmployeeDeduction.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteEmployeeDeduction.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteEmployeeDeduction.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get Employee earnings
		[fetchEmployeeEarning.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchEmployeeEarning.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeEarning = action.payload.data
		},
		[fetchEmployeeEarning.rejected]: (state, action) => {
			state.isLoading = false
			state.employeeEarning = {}
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update Employee Earning
		[updateEmployeeEarning.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateEmployeeEarning.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeeEarning = action.payload.data
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateEmployeeEarning.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get Employee Payroll
		[fetchEmployeePayroll.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[fetchEmployeePayroll.fulfilled]: (state, action) => {
			state.isLoading = false
			state.employeePayroll = action.payload.data
		},
		[fetchEmployeePayroll.rejected]: (state, action) => {
			state.isLoading = false
			state.employeePayroll = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
	},
})

export const { toastReset } = financeSlice.actions
export default financeSlice.reducer
