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
	fetchLocations,
	addLocation,
	fetchLocationDetails,
	updateLocation,
	deleteLocation,
	toastReset,
} from "../../../../store/slices/inventory/inventorySlice"
import SmallTable from "./SmallTable"

const Locations = () => {
	const [showModal, setShowModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [data, setData] = useState("")
	const [dataEdit, setDataEdit] = useState("")
	const { isLoading, showToast, message, locations, locationDetails, success } =
		useSelector((state) => state.inventory)
	const dispatch = useDispatch()

	// Create unit
	const createHandler = (e) => {
		e.preventDefault()
		dispatch(addLocation({ name: data }))
		setShowModal(false)
	}

	const editModalHandler = (id) => {
		setShowEditModal(true)
		dispatch(fetchLocationDetails(id))
	}

	const updateHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateLocation({
				id: locationDetails?.id,
				content: { name: dataEdit },
			})
		)
		setShowEditModal(false)
		setTimeout(() => {
			dispatch(fetchLocations())
		}, 500)
	}

	const deleteHandler = (id) => {
		dispatch(deleteLocation(id))
		setTimeout(() => {
			dispatch(fetchLocations())
		}, 500)
	}

	useEffect(() => {
		if (!locations) {
			dispatch(fetchLocations())
		}
		if (locationDetails) {
			setDataEdit(locationDetails?.name || "")
		}
	}, [dispatch, locations, locationDetails])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	return (
		<div>
			<SectionHeader text="All locations">
				<Button Icon={HiPlus} onClick={() => setShowModal(true)}>
					Add
				</Button>
			</SectionHeader>

			<RenderIf isTrue={showModal}>
				<WrapperModal title="Add new location" setShow={setShowModal}>
					<form onSubmit={createHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Location"
							type="text"
							placeholder="Enter location name"
							value={data}
							onChange={(e) => setData(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			{/* Edit modal */}
			<RenderIf isTrue={showEditModal}>
				<WrapperModal title="Update place" setShow={setShowEditModal}>
					<form onSubmit={updateHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Location"
							type="text"
							placeholder="Updated location name"
							value={dataEdit}
							onChange={(e) => setDataEdit(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Update
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			<RenderIf isTrue={locations && locations?.length > 0}>
				<div className="max-w-md">
					<TransitionBtoT>
						<SmallTable
							content={locations}
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

export default Locations
