import axios from "axios"
import TokenService from "./tokenService"

const apiUrl = "https://api.techwithtitan.com/api"

const instance = axios.create({
	baseURL: apiUrl,
	headers: {
		"Content-Type": "multipart/form-data",
		Authorization: `Bearer ${TokenService.getLocalAccessToken()}`,
	},
})

instance.interceptors.request.use(
	(res) => {
		return res
	},
	async (err) => {
		const originalConfig = err.config

		if (err.response) {
			// access token expired
			if (err.response.status === 403 && !originalConfig._retry) {
				// handle infinite loop
				originalConfig._retry = true

				// console.log("refresh", TokenService.getLocalRefreshToken());
				try {
					const rs = await instance.post("/refresh/", {
						refresh: TokenService.getLocalRefreshToken(),
					})

					console.log("response", rs)

					const { access } = rs.data

					console.log("updateNewAccessToken", access)
					TokenService.updateNewAccessToken(access)

					return instance(originalConfig)
				} catch (_error) {
					return Promise.reject(_error)
				}
			}

			// refresh token expired
		}

		return Promise.reject(err)
	}
)

export default instance
