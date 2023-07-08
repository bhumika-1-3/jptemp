const getLocalRefreshToken = () => {
	const user = JSON.parse(localStorage.getItem("user"))
	return user?.refresh
}

const getLocalAccessToken = () => {
	const user = JSON.parse(localStorage.getItem("user"))
	return user?.access
}

const updateNewAccessToken = (token) => {
	let user = JSON.parse(localStorage.getItem("user"))
	const updateUser = { ...user, access: token }
	localStorage.setItem("user", JSON.stringify(updateUser))
	// window.location.reload()
}

const TokenService = {
	getLocalRefreshToken,
	getLocalAccessToken,
	updateNewAccessToken,
}

export default TokenService
