import { Navigate } from "react-router-dom"

import Auth from "../layouts/Auth"
import Login from "../views/Auth/Login"
import ForgotPassword from "../views/Auth/ForgotPassword"
import Signup from "../views/Auth/Signup"
const NavigateTo = () => {
	return <Navigate to="/auth/login" />
}




const routes = [
	// auth
	{
		path: "/",
		component: NavigateTo,
	},
	{
		path: "/auth",
		component: NavigateTo,
	},
	{
		component: Auth,
		path: "/auth",
		children: [
			{
				component: Login,
				path: "login",
			},
			{
				component: Signup,
				path: "signup",
			},
			{
				component: ForgotPassword,
				path: "forgot-password",
			},
		],
	},
]

export default routes
