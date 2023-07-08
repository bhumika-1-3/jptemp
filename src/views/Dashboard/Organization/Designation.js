import { useState, useEffect } from "react"
import { HiPlus, HiPencilAlt } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
// Toast <====
import { toast } from "react-toastify"
// ===>
import {
	Button,
	WrapperModal,
	SectionHeader,
	InputTag,
	RenderIf,
	CardSmall,
	TransitionBtoT,
	LoadingSpinner,
} from "../../../components"
import {
	createDesignation,
	allDesignations,
	toastReset,
} from "../../../store/slices/employee/employeeSlice"

const Designation = () => {
	const [showModal, setShowModal] = useState(false)
	const [designation, setDesignation] = useState("")
	const { isLoading, showToast, message, designations, success } = useSelector(
		(state) => state.employee
	)
	const dispatch = useDispatch()

	// Create department function
	const createDesignationHandler = (e) => {
		e.preventDefault()
		dispatch(createDesignation({ name: designation }))
		setShowModal(false)
	}

	useEffect(() => {
		dispatch(allDesignations())
	}, [dispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])

	return (
		<div>
			<SectionHeader text="All the designations">
				<Button Icon={HiPlus} onClick={() => setShowModal(true)}>
					Add
				</Button>
			</SectionHeader>

			<RenderIf isTrue={showModal}>
				<WrapperModal title="Add new designation" setShow={setShowModal}>
					<form onSubmit={createDesignationHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Create Designation"
							type="text"
							placeholder="Enter designation name"
							value={designation}
							onChange={(e) => setDesignation(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>
			<RenderIf isTrue={designations && designations?.length > 0}>
				<div className="grid md:grid-cols-4 gap-3">
					{designations?.map((item, idx) => (
						<TransitionBtoT key={item.id}>
							<CardSmall idx={idx + 1} name={item.name} />
						</TransitionBtoT>
					))}
				</div>
			</RenderIf>

			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</div>
	)
}

export default Designation
