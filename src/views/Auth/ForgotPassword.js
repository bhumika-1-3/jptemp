import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toastReset, forgotPassword } from "../../store/slices/auth/authSlice"

const ForgotPassword = () => {
	const [email, setEmail] = useState("")
	const { success, showToast, message } = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	// Forgot password handler
	const forgotPasswordHandler = (e) => {
		e.preventDefault()
		dispatch(forgotPassword({ email: email }))
	}

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	return (
		<>
			<ToastContainer />
			<div className="container mx-auto px-4 h-full font-lato">
				<div className="flex content-center items-center justify-center h-full">
					<div className="w-full lg:w-4/12 px-4">
						<div className="relative flex flex-col min-w-0 break-words w-full mb-6 bg-purple_5 shadow-lg rounded-lg border border-slate-50/[0.06]">
							<div className="rounded-t mb-0 px-6 py-6">
								<div className="text-center">
									<h6 className="text-slate-200 text-lg font-light">
										Forgot you password ?
									</h6>
								</div>
							</div>
							<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
								<form>
									<div className="relative w-full mb-3">
										<label
											className="block uppercase text-slate-400 text-xs font-bold mb-2"
											htmlFor="grid-password"
										>
											Email
										</label>
										<input
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											name="email"
											type="email"
											className="px-3 py-3 placeholder-blueGray-300 text-slate-400 bg-transparent rounded text-sm border border-slate-50/[0.06] shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
											placeholder="Enter your email address..."
											required
										/>
									</div>

									<div className="text-center mt-6">
										<button
											className="bg-purple-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
											type="button"
											onClick={forgotPasswordHandler}
										>
											Verify
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ForgotPassword
