import { useRoutes, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

// Layout
import Auth from "../layouts/Auth"

// Views
import Login from "../views/Auth/Login"
import Finan2 from "../views/Dashboard/Finance/Finan2"
const AuthRoutes = () => {
	const { isAuthenticated } = useSelector((state) => state.auth)
	const element = useRoutes([
		{
			path: "/",
			element: <Navigate to="/auth/login" />,
		},
		{
			path: "/auth",
			element: <Navigate to="/auth/login" />,
		},
		{
			path: "/auth",
			element: <Auth />,
			children: [{ path: "login", element: <Login /> }],
		},

	])
	return element
}

export default AuthRoutes
