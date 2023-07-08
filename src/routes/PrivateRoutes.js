import { Fragment } from "react"
// import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getAllowedRoutes } from "../utils/getAllowedRoutes"
import PrivateRoutesConfig from "../config/PrivateRoutesConfig"
import PublicRoutes from "../config/PublicRoutes"
import MapAllowedRoutes from "./MapAllowedRoutes"

const PrivateRoutes = () => {
	let allowedRoutes = []
	const { isAuthenticated, role } = useSelector((state) => state.auth)

	if (!isAuthenticated) {
		allowedRoutes = getAllowedRoutes(PrivateRoutesConfig, role)
		// console.log("allowed routes", allowedRoutes)
	} else {
		allowedRoutes = PublicRoutes
	}
	return (
		<Fragment>
			<MapAllowedRoutes routes={allowedRoutes} basePath="/" isAddNotFound />
		</Fragment>
	)
}

export default PrivateRoutes
