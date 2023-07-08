import { useState, useEffect } from "react"
import { HiPlus, HiPencilAlt } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
// Toast <====
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// ===>
import {
	Button,
	Modal,
	SectionHeader,
	InputTag,
	LoadingSpinner,
	TransitionBtoT,
	RenderIf,
} from "../../../components"
import {
	createBankType,
	allBanks,
	toastReset,
} from "../../../store/slices/employee/employeeSlice"

const Bank = () => {
	const [bankName, setBankName] = useState("")
	const [multi,setmulti] = useState([])
	const { isLoading, showToast, message, banks, success } = useSelector(
		(state) => state.employee
	)
	const dispatch = useDispatch()

	// Create bank function
	const createBankHandler = (e) => {
		e.preventDefault()
		dispatch(createBankType({ name: bankName }))
	}


	var DOMAINCHOICES = [
		{ "value": "FD", "data": "Frontend Development" },
		{ "value": "BD", "data": "Backend Development" },
		{ "value": "DS", "data": "Data Science" },
		{ "value": "SD", "data": "Software Development" },
		{ "value": "ML", "data": "Machine Learning" },
	]
	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])

	if (isLoading) {
		return <LoadingSpinner />
	}
	return (
		<div>
			<ToastContainer />
			{/* <RenderIf isTrue={banks && banks?.length > 0}> */}
				<div className="grid md:grid-cols-4 gap-3">
					{DOMAINCHOICES.map((item, idx) => (
						<TransitionBtoT key={idx}>
							<CardSmall value={item.value} idx={idx + 1} name={item.data} />
						</TransitionBtoT>
					))}
				</div>
			{/* </RenderIf> */}
		</div>
	)
}
const CardSmall = ({ idx, name, children, value }) => {
	const { currentTheme, colors } = useSelector((state) => state.theme)
	return (
		<div style={{cursor:"pointer"}} className="shadow-sm border borderColor px-4 py-3 rounded-lg bg-[#f7f6f9] dark:bg-purple_5 relative">
			<h4
				className={`font-normal text-white text-sm px-2 rounded-lg mb-1.5  dark:bg-purple-800 inline-block ${currentTheme ? colors.bg[currentTheme].dark : "bg-purple-800"
					}`}
			>
				{idx}
			</h4>
			{name && (
				<p className="font-normal dark:text-slate-300 text-slate-700">{name}</p>
			)}
			{children}
		</div>
	)
}

export default Bank
