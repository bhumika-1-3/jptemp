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
	fetchManufacturers,
	addManufacturer,
	fetchManufacturerDetails,
	updateManufacturer,
	deleteManufacturer,
	toastReset,
} from "../../../../store/slices/inventory/inventorySlice"
import SmallTable from "./SmallTable"

const Manufacturers = () => {
	const [showModal, setShowModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [data, setData] = useState("")
	const [dataEdit, setDataEdit] = useState("")
	const {
		isLoading,
		showToast,
		message,
		manufacturers,
		manufacturerDetails,
		success,
	} = useSelector((state) => state.inventory)
	const dispatch = useDispatch()

	// Create unit
	const createHandler = (e) => {
		e.preventDefault()
		dispatch(addManufacturer({ name: data }))
		setShowModal(false)
	}

	const editModalHandler = (id) => {
		setShowEditModal(true)
		dispatch(fetchManufacturerDetails(id))
	}

	const updateHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateManufacturer({
				id: manufacturerDetails?.id,
				content: { name: dataEdit },
			})
		)
		setShowEditModal(false)
		setTimeout(() => {
			dispatch(fetchManufacturers())
		}, 500)
	}

	const deleteHandler = (id) => {
		dispatch(deleteManufacturer(id))
		setTimeout(() => {
			dispatch(fetchManufacturers())
		}, 500)
	}

	useEffect(() => {
		if (!manufacturers) {
			dispatch(fetchManufacturers())
		}
		if (manufacturerDetails) {
			setDataEdit(manufacturerDetails?.name || "")
		}
	}, [dispatch, manufacturers, manufacturerDetails])

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
				<WrapperModal title="Add new manufacturer" setShow={setShowModal}>
					<form onSubmit={createHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Manufacturer"
							type="text"
							placeholder="Enter manufacturer name"
							value={data}
							onChange={(e) => setData(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			{/* Edit category modal */}
			<RenderIf isTrue={showEditModal}>
				<WrapperModal title="Update manufacturer" setShow={setShowEditModal}>
					<form onSubmit={updateHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Manufacturer"
							type="text"
							placeholder="Updated manufacturer name"
							value={dataEdit}
							onChange={(e) => setDataEdit(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Update
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			<RenderIf isTrue={manufacturers && manufacturers?.length > 0}>
				<div className="max-w-md">
					<TransitionBtoT>
						<SmallTable
							content={manufacturers}
							rowsPerPage={10}
							edit={editModalHandler}
							remove={deleteHandler}
						/>
					</TransitionBtoT>
				</div>
			</RenderIf>

			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</div>
	)
}

export default Manufacturers
