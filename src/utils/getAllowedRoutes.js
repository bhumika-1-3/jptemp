import { intersection } from "lodash"

export function isArrayWithLength(arr) {
	return Array.isArray(arr) && arr.length
}

export function getAllowedRoutes(routes, role) {
	// const roles = JSON.parse(localStorage.getItem("roles"))
	return routes;
}
