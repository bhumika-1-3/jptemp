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
import SmallTable from "./SmallTable"
import {
	fetchAttributes,
	addAttribute,
	fetchAttributeDetails,
	updateAttribute,
	deleteAttribute,
	toastReset,
} from "../../../../store/slices/inventory/inventorySlice"

const Attributes = () => {
	const [showModal, setShowModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [data, setData] = useState("")
	const [dataEdit, setDataEdit] = useState("")
	const {
		isLoading,
		showToast,
		message,
		attributes,
		attributeDetails,
		success,
	} = useSelector((state) => state.inventory)
	const dispatch = useDispatch()

	// Create unit
	const createHandler = (e) => {
		e.preventDefault()
		dispatch(addAttribute({ name: data }))
		setShowModal(false)
	}

	const editModalHandler = (id) => {
		setShowEditModal(true)
		dispatch(fetchAttributeDetails(id))
	}

	const updateHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateAttribute({
				id: attributeDetails?.id,
				content: { name: dataEdit },
			})
		)
		setShowEditModal(false)
		setTimeout(() => {
			dispatch(fetchAttributes())
		}, 500)
	}

	const deleteHandler = (id) => {
		dispatch(deleteAttribute(id))
		setTimeout(() => {
			dispatch(fetchAttributes())
		}, 500)
	}

	useEffect(() => {
		if (!attributes) {
			dispatch(fetchAttributes())
		}
		if (attributeDetails) {
			setDataEdit(attributeDetails?.name || "")
		}
	}, [dispatch, attributes, attributeDetails])

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
				<WrapperModal title="Add new attribute" setShow={setShowModal}>
					<form onSubmit={createHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Attribute"
							type="text"
							placeholder="Enter attribute name"
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
				<WrapperModal title="Update attribute" setShow={setShowEditModal}>
					<form onSubmit={updateHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Attribute"
							type="text"
							placeholder="Updated attribute name"
							value={dataEdit}
							onChange={(e) => setDataEdit(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Update
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			<RenderIf isTrue={attributes && attributes?.length > 0}>
				<div className="max-w-md">
					<TransitionBtoT>
						<SmallTable
							content={attributes || []}
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

export default Attributes
