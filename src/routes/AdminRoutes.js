import { useRoutes, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

// Layout
// import Auth from "../layouts/Auth"

// Views
// import Login from "../views/Auth/Login"
import Finan2 from "../views/Dashboard/Finance/"
import DashboardLayout from "../layouts/DashboardLayout"
import Employee from "../views/Dashboard/Employee/Employee"
// import EmployeeDashboard from "../views/Dashboard/Employee/EmployeeDashboard"
import AdminDashboard from "../views/Dashboard/AdminDashboard/AdminDashboard"
// User section views
import Users from "../views/Dashboard/User/Users"
import RegisterEmployee from "../views/Dashboard/User/RegisterPage"
import EmployeeDetailsPage from "../views/Dashboard/User/EmployeeDetailsPage"
import BulkAttendance from "../views/Dashboard/User/BulkAttendance"
import AttendanceByDate from "../views/Dashboard/AdminDashboard/components/AttendanceByDate"

// Organization section view
import Organizations from "../views/Dashboard/Organization/Organizations"
import OrganizationDetails from "../views/Dashboard/Organization/OrganizationDetails"
import Groups from "../views/Dashboard/Organization/Groups"
import GroupDetailsPage from "../views/Dashboard/Organization/GroupDetailsPage"
import Finance from "../views/Dashboard/Finance/Finance"
import AllowanceDetails from "../views/Dashboard/Finance/AllowanceDetails"
import DeductionDetails from "../views/Dashboard/Finance/DeductionDetails"
import EmployeeAllowanceDetails from "../views/Dashboard/Finance/EmployeeAllowanceDetails"
import EmployeeDeductionDetails from "../views/Dashboard/Finance/EmployeeDeductionDetails"

// Kanban board
import Kanban from "../views/Dashboard/Kanban/Kanban"

const AdminRoutes = () => {
	// const { isAuthenticated, isAdmin, isEmployee } = useSelector(
	// 	(state) => state.auth
	// )

	const isAdmin = true;
	const isEmployee = true;
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
		// 		<Navigate to="/admin/dashboard/" />
		// 	),
		// },
		// {
		// 	path: "/auth",
		// 	element: <Auth />,
		// 	children: [{ path: "login", element: <Login /> }],
		// },
		{
			path: "/admin",
			element:
				<DashboardLayout />,

			children: [
				{
					path: "organizations",
					element: isAdmin ? (
						<Organizations />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "dashboard",
					element:
						<AdminDashboard />
				},
				{
					path: "dashboard/attendance-by-date/:date",
					element: isAdmin ? (
						<AttendanceByDate />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "users/attendance-by-date/:date",
					element: isAdmin ? (
						<AttendanceByDate />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "organizations/organization-details/:orgID",
					element: isAdmin ? (
						<OrganizationDetails />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "users/register-employee",
					element: isAdmin ? (
						<Finan2 />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "group",
					element: isAdmin ? (
						<Groups />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "group/group-details/:groupID",
					element: isAdmin ? (
						<GroupDetailsPage />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "finance",
					element: isAdmin ? (
						<Finance />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "finance/:id",
					element: isAdmin ? (
						<Finan2 />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "finance",
					element: <Outlet />,
					children: [
						{
							path: ":id",
							element: <Finan2 />,
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
				{
					path: "kanban",
					element: isAdmin ? (
						<Kanban />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},

				// User
				{
					path: "users",
					element: isAdmin ? (
						<Users />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
				{
					path: "users/bulk-attendance",
					element: <BulkAttendance />,
				},
				{
					path: "users/employee-details/:userID",
					element: isAdmin ? (
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
					element: isEmployee ? (
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

export default AdminRoutes
