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
	fetchPlaces,
	addPlace,
	fetchPlaceDetails,
	updatePlace,
	deletePlace,
	toastReset,
} from "../../../../store/slices/inventory/inventorySlice"
import SmallTable from "./SmallTable"

const Places = () => {
	const [showModal, setShowModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [data, setData] = useState("")
	const [dataEdit, setDataEdit] = useState("")
	const { isLoading, showToast, message, places, placeDetails, success } =
		useSelector((state) => state.inventory)
	const dispatch = useDispatch()

	// Create unit
	const createHandler = (e) => {
		e.preventDefault()
		dispatch(addPlace({ name: data }))
		setShowModal(false)
	}

	const editModalHandler = (id) => {
		setShowEditModal(true)
		dispatch(fetchPlaceDetails(id))
	}

	const updateHandler = (e) => {
		e.preventDefault()
		dispatch(
			updatePlace({
				id: placeDetails?.id,
				content: { name: dataEdit },
			})
		)
		setShowEditModal(false)
		setTimeout(() => {
			dispatch(fetchPlaces())
		}, 500)
	}

	const deleteHandler = (id) => {
		dispatch(deletePlace(id))
		setTimeout(() => {
			dispatch(fetchPlaces())
		}, 500)
	}

	useEffect(() => {
		if (!places) {
			dispatch(fetchPlaces())
		}
		if (placeDetails) {
			setDataEdit(placeDetails?.name || "")
		}
	}, [dispatch, places, placeDetails])

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
				<WrapperModal title="Add new place" setShow={setShowModal}>
					<form onSubmit={createHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Places"
							type="text"
							placeholder="Enter place name"
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
				<WrapperModal title="Update place" setShow={setShowEditModal}>
					<form onSubmit={updateHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Place"
							type="text"
							placeholder="Updated place name"
							value={dataEdit}
							onChange={(e) => setDataEdit(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Update
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			<RenderIf isTrue={places && places?.length > 0}>
				<div className="max-w-md">
					<TransitionBtoT>
						<SmallTable
							content={places}
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

export default Places
