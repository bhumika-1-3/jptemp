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
	TransitionBtoT,
	RenderIf,
	LoadingSpinner,
} from "../../../../components"
import {
	fetchUnits,
	addUnit,
	fetchUnitDetails,
	updateUnit,
	deleteUnit,
	toastReset,
} from "../../../../store/slices/inventory/inventorySlice"
import SmallTable from "./SmallTable"

const Unit = () => {
	const [showModal, setShowModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [unit, setUnit] = useState("")
	const [unitEdit, setUnitEdit] = useState("")
	const { isLoading, showToast, message, units, unitDetails, success } =
		useSelector((state) => state.inventory)
	const dispatch = useDispatch()

	// Create unit
	const createUnitHandler = (e) => {
		e.preventDefault()
		dispatch(addUnit({ name: unit }))
		setShowModal(false)
	}

	const editModalHandler = (id) => {
		setShowEditModal(true)
		dispatch(fetchUnitDetails(id))
	}

	const updateUnitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateUnit({
				id: unitDetails?.id,
				content: { name: unitEdit },
			})
		)
		setShowEditModal(false)
		setTimeout(() => {
			dispatch(fetchUnits())
		}, 500)
	}

	const deleteUnitHandler = (id) => {
		dispatch(deleteUnit(id))
		setTimeout(() => {
			dispatch(fetchUnits())
		}, 500)
	}

	useEffect(() => {
		if (!units) {
			dispatch(fetchUnits())
		}
		if (unitDetails) {
			setUnitEdit(unitDetails?.name || "")
		}
	}, [dispatch, units, unitDetails])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	return (
		<div>
			<SectionHeader text="All units">
				<Button Icon={HiPlus} onClick={() => setShowModal(true)}>
					Add
				</Button>
			</SectionHeader>

			<RenderIf isTrue={showModal}>
				<WrapperModal title="Add new unit" setShow={setShowModal}>
					<form onSubmit={createUnitHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Unit"
							type="text"
							placeholder="Enter unit name"
							value={unit}
							onChange={(e) => setUnit(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			{/* Edit category modal */}
			<RenderIf isTrue={showEditModal}>
				<WrapperModal title="Update unit" setShow={setShowEditModal}>
					<form onSubmit={updateUnitHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Unit"
							type="text"
							placeholder="Updated unit name"
							value={unitEdit}
							onChange={(e) => setUnitEdit(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Update
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			<RenderIf isTrue={units && units?.length > 0}>
				<div className="max-w-md">
					<TransitionBtoT>
						<SmallTable
							content={units}
							rowsPerPage={10}
							edit={editModalHandler}
							remove={deleteUnitHandler}
						/>
					</TransitionBtoT>
				</div>
			</RenderIf>

			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</div>
	)
}

export default Unit
