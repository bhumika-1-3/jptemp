import { useRoutes, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

// Layout
// import Auth from "../layouts/Auth"

// Views
// import Login from "../views/Auth/Login"
import DashboardLayout from "../layouts/DashboardLayout"
import Employee from "../views/Dashboard/Employee/Employee"
import EmployeeDashboard from "../views/Dashboard/Employee/EmployeeDashboard"

// Kanban board
// import Kanban from "../views/Dashboard/Kanban/Kanban"

const EmployeeRoutes = () => {
	const  isEmployee  = true;
	console.log("in emp routes =>>", isEmployee)
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
		// 		<Navigate to="/employee/dashboard/" />
		// 	),
		// },
		// {
		// 	path: "/auth",
		// 	element: <Auth />,
		// 	children: [{ path: "login", element: <Login /> }],
		// },
		{
			path: "/employee",
			element: isEmployee ? (
				<DashboardLayout />
			) : (
				// <Navigate to="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in" />
				<Navigate to="/auth/login" />
			),

			children: [
				{
					path: "dashboard",
					element: isEmployee ? (
						<EmployeeDashboard />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},

				// Kanban
				// {
				// 	path: "kanban",
				// 	element: isEmployee ? (
				// 		<Kanban />
				// 	) : (
				// 		<div className="text-4xl text-orange-600">Unauthorized...</div>
				// 	),
				// },

				{
					path: "",
					element: isEmployee ? (
						<Employee />
					) : (
						<div className="text-4xl text-orange-600">Unauthorized...</div>
					),
				},
			],
		},
	])
	return element
}

export default EmployeeRoutes
