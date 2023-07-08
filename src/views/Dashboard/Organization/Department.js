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
	CardSmall,
	TransitionBtoT,
	RenderIf,
	LoadingSpinner,
} from "../../../components"
import {
	createDepartment,
	allDepartments,
	toastReset,
} from "../../../store/slices/employee/employeeSlice"

const Department = () => {
	const [showModal, setShowModal] = useState(false)
	const [department, setDepartment] = useState("")
	const { isLoading, showToast, message, departments, success } = useSelector(
		(state) => state.employee
	)
	const dispatch = useDispatch()

	// Create department function
	const createDepartmentHandler = (e) => {
		e.preventDefault()
		dispatch(createDepartment({ name: department }))
		setShowModal(false)
	}

	useEffect(() => {
		dispatch(allDepartments())
	}, [dispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	return (
		<div>
			<SectionHeader text="All the departments">
				<Button Icon={HiPlus} onClick={() => setShowModal(true)}>
					Add
				</Button>
			</SectionHeader>

			<RenderIf isTrue={showModal}>
				<WrapperModal title="Add new department" setShow={setShowModal}>
					<form onSubmit={createDepartmentHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Create Department"
							type="text"
							placeholder="Enter department name"
							value={department}
							onChange={(e) => setDepartment(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>
			<RenderIf isTrue={departments && departments?.length > 0}>
				<div className="grid md:grid-cols-4 gap-3">
					{departments?.map((item, idx) => (
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

export default Department
