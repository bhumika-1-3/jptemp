import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const userJSON = localStorage.getItem("user")
let user

try {
	user = JSON.parse(userJSON)
} catch (error) {
	user = false
}

// base url
const baseUrl = "https://api.techwithtitan.com/api/"

const checkIfAuth = () => {
	if (user?.access) {
		return true
	} else {
		localStorage.removeItem("user")
		return false
	}
}

const initialState = {
	user: user ? user : null,
	isUser: user ? true : false,
	message: "",
	isAuthenticated: checkIfAuth(),
	success: "",
	error: {},
	showToast: false,
	isAdmin: user ? user.is_admin : null,
	isEmployee: user ? user.is_employee : null,
	isHr: user ? user?.employee_type?.name === "HR" : false,
	isStaff: user ? user.is_staff : null,
	isActive: user ? user.is_active : null,
	isLoading: false,
	// role: null,
	role: localStorage.getItem("role") || null,
}

export const login = createAsyncThunk(
	"auth/login",
	async (userData, thunkAPI) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					//"Access-Control-Allow-Origin": "*",
				},
				//withCredentials: true,
			}
			const response = await axios.post(baseUrl + "login/", userData, config)
			const res = response.data
			localStorage.setItem("user", JSON.stringify(res.data))
			return res
		} catch (error) {
			const message =
				(error.data && error.data.data && error.data.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const forgotPassword = createAsyncThunk(
	"auth/forgotPassword",
	async (data, thunkAPI) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					//"Access-Control-Allow-Origin": "*",
				},
				//withCredentials: true,
			}
			const response = await axios.post(
				baseUrl + "forgot-password/",
				data,
				config
			)
			const res = response.data
			return res
		} catch (error) {
			const message =
				(error.data && error.data.data && error.data.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const register = createAsyncThunk(
	"auth/register",
	async (userData, thunkAPI) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					//"Access-Control-Allow-Origin": "*",
				},
				//withCredentials: true,
			}
			const response = await axios.post(
				baseUrl + "user/register/",
				userData,
				config
			)
			const { data } = response.data
			localStorage.setItem("user", JSON.stringify(data))
			return data
		} catch (error) {
			const message =
				(error.data && error.data.data && error.data.data.message) ||
				error.message ||
				error.toString()
			console.log(message)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		localStorage.removeItem("user")
		localStorage.removeItem("role")
		return
	} catch (error) {
		const message =
			(error.data && error.data.data && error.data.data.message) ||
			error.message ||
			error.toString()
		console.log(message)
		return thunkAPI.rejectWithValue(message)
	}
})

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		statusReset: (state) => {
			state.success = ""
		},
		toastReset: (state) => {
			state.showToast = false
		},
		setRole: (state) => {
			if (state.isAdmin) {
				state.role = "SUPER_ADMIN"
				localStorage.setItem("role", "SUPER_ADMIN")
				return
			}
			if (state.user?.department?.name === "HR") {
				state.role = "HR"
				localStorage.setItem("role", "HR")
				return
			}
			if (state.user?.department?.name === "Inventory") {
				state.role = "INVENTORY"
				localStorage.setItem("role", "INVENTORY")
				return
			}
			if (state.user?.department?.name === "Finance") {
				state.role = "FINANCE"
				localStorage.setItem("role", "FINANCE")
				return
			}
			if (state.user?.is_employee) {
				state.role = "EMPLOYEE"
				localStorage.setItem("role", "EMPLOYEE")
				return
			}
		},
	},
	extraReducers: {
		// login
		[login.pending]: (state) => {
			state.isAuthenticated = false
			state.isLoading = true
			state.showToast = false
		},
		[login.fulfilled]: (state, action) => {
			state.user = action.payload.data
			state.isUser = true
			state.message = action.payload.detail
			state.isAuthenticated = true
			state.success = action.payload.success
			state.error = {}
			state.showToast = false
			state.isActive = action.payload.data.is_active
			state.isAdmin = action.payload.data.is_admin
			state.isEmployee = action.payload.is_employee
			state.isStaff = action.payload.is_staff
			state.isLoading = false
		},
		[login.rejected]: (state, action) => {
			state.user = null
			state.isUser = false
			state.message = "Unauthorized"
			state.isAuthenticated = false
			state.success = false
			state.error = action.payload
			state.showToast = true
			state.isLoading = false
		},
		[forgotPassword.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
			state.isAuthenticated = false
		},
		[forgotPassword.fulfilled]: (state, action) => {
			state.message = action.payload.detail
			state.success = action.payload.success
			state.error = {}
			state.showToast = true
			state.isLoading = false
			state.isAuthenticated = false
		},
		[forgotPassword.rejected]: (state, action) => {
			state.message = action.payload.success
			state.success = false
			state.error = action.payload
			state.showToast = true
			state.isLoading = false
			state.isAuthenticated = false
		},
		[logout.pending]: (state) => {
			state.isAuthenticated = false
		},
		[logout.fulfilled]: (state, action) => {
			state.user = null
			state.isUser = false
			state.isAuthenticated = false
		},
		[logout.rejected]: (state, action) => {
			state.user = null
			state.isUser = false
			state.isAuthenticated = false
			localStorage.removeItem("user")
		},
	},
})

export const { statusReset, toastReset, setRole } = authSlice.actions

export default authSlice.reducer
