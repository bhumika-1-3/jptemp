import { useRoutes, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

// Layout
// import Auth from "../layouts/Auth"

// Views
// import Login from "../views/Auth/Login"
import DashboardLayout from "../layouts/DashboardLayout"
import Employee from "../views/Dashboard/Employee/Employee"
import AdminDashboard from "../views/Dashboard/AdminDashboard/AdminDashboard"
// User section views
import Users from "../views/Dashboard/User/Users"
import RegisterEmployee from "../views/Dashboard/User/RegisterPage"
import EmployeeDetailsPage from "../views/Dashboard/User/EmployeeDetailsPage"
import BulkAttendance from "../views/Dashboard/User/BulkAttendance"
import AttendanceByDate from "../views/Dashboard/AdminDashboard/components/AttendanceByDate"

// Organization section view
import Finance from "../views/Dashboard/Finance/Finance"
import AllowanceDetails from "../views/Dashboard/Finance/AllowanceDetails"
import DeductionDetails from "../views/Dashboard/Finance/DeductionDetails"
import EmployeeAllowanceDetails from "../views/Dashboard/Finance/EmployeeAllowanceDetails"
import EmployeeDeductionDetails from "../views/Dashboard/Finance/EmployeeDeductionDetails"
import Finan2 from "../views/Dashboard/Finance/Finan2"

// Kanban board
// import Kanban from "../views/Dashboard/Kanban/Kanban"

const HrRoutes = () => {
	const { isAuthenticated, isHr } = useSelector((state) => state.auth)
	const element = useRoutes([
		// {
		// 	path: "/",
		// 	element: <Navigate to="/auth/login" />,
		// },
		// {
		// 	path: "/auth",
		// 	element: !isAuthenticated ? (
		// 		<Navigate to="/auth/login" />
		// 	) : (
		// 		<Navigate to="/hr/dashboard/" />
		// 	),
		// },
		// {
		// 	path: "/auth",
		// 	element: <Auth />,
		// 	children: [{ path: "login", element: <Login /> }],
		// },
		{
			path: "/hr",
			element:
				isAuthenticated && isHr ? (
					<DashboardLayout />
				) : (
					<Navigate to="/auth/login" />
				),

			children: [
				{
					path: "dashboard",
					element: isHr ? (
						<AdminDashboard />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "attendance-by-date/:date",
					element: isHr ? (
						<AttendanceByDate />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "users/attendance-by-date/:date",
					element: isHr ? (
						<AttendanceByDate />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "users/register-employee",
					element: isHr ? (
						<Finan2 />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "finance",
					element: isHr ? (
						<Finance />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "finance",
					element: isHr && <Outlet />,
					children: [
						{
							path: "allowance-details/:allowanceId",
							element: <AllowanceDetails />,
						},
						{
							path: "deduction-details/:deductionId",
							element: <DeductionDetails />,
						},
						{
							path: "employee-allowance-details/:userId/:allowanceId",
							element: <EmployeeAllowanceDetails />,
						},
						{
							path: "employee-deduction-details/:userId/:deductionId",
							element: <EmployeeDeductionDetails />,
						},
					],
				},

				// Kanban
				// {
				// 	path: "kanban",
				// 	element: isAdmin ? (
				// 		<Kanban />
				// 	) : (
				// 		<div className="text-4xl text-orange-600">Unauthorized...</div>
				// 	),
				// },

				// User
				{
					path: "users",
					element: isHr ? (
						<Users />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},

				{
					path: "dashboard/users/bulk-attendance",
					element: <BulkAttendance />,
				},
				{
					path: "users/bulk-attendance",
					element: <BulkAttendance />,
				},
				{
					path: "users/employee-details/:userID",
					element: isHr ? (
						<EmployeeDetailsPage />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},

				// Logged in Employee Routes
				// {
				// 	path: "",
				// 	element: isEmployee ? (
				// <EmployeeDashboard />
				// 	) : (
				// 		<div className="text-4xl text-orange-600">Unauthorized...</div>
				// 	),
				// },
				{
					path: "employee",
					element: isHr ? (
						<Employee />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
					// children: [
					// 	{ path: "documents", element: <Documents /> },
					// 	{ path: "address", element: <EmployeeAddress /> },
					// 	{ path: "profile", element: <EmployeeProfile /> },
					// 	{ path: "work-experiences", element: <WorkExperiences /> },
					// 	{ path: "education", element: <Education /> },
					// 	{ path: "dependents", element: <Dependent /> },
					// ],
				},
			],
		},
	])
	return element
}

export default HrRoutes
