import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth/authSlice"
import employeeReducer from "./slices/employee/employeeSlice"
import userReducer from "./slices/User/userSlice"
import locationReducer from "./slices/location/locationSlice"
import attendanceReducer from "./slices/Attendance/attendanceSlice"
import themeReducer from "./slices/theme/themeSlice"
import workAndEducationReducer from "./slices/employee/workAndEducationSlice"
import organizationReducer from "./slices/organization/organizationSlice"
import financeReducer from "./slices/finance/financeSlice"
import chartsReducer from "./slices/charts/chartsSlice"
import inventoryReducer from "./slices/inventory/inventorySlice"
import inventory2Reducer from "./slices/inventory/inventory2Slice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		employee: employeeReducer,
		user: userReducer,
		location: locationReducer,
		attendance: attendanceReducer,
		theme: themeReducer,
		workAndEdu: workAndEducationReducer,
		organization: organizationReducer,
		finance: financeReducer,
		charts: chartsReducer,
		inventory: inventoryReducer,
		inventory2: inventory2Reducer,
	},
	// For turning off redux tools in production
	devTools: false,
})
