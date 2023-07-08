import { useState, useEffect } from "react"
import { HiPlus, HiPencilAlt, HiPlusCircle } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
// Toast <====
import { toast } from "react-toastify"
// ===>
import {
	Button,
	WrapperModal,
	SelectTag,
	InputTag,
	TransitionBtoT,
	RenderIf,
	LoadingSpinner,
	SubHeading,
} from "../../../../components"
import {
	deleteProductSpecification,
	fetchProductSpecification,
	addProductSpecification,
	fetchProductSpecificationDetails,
	updateProductSpecification,
	fetchAttributes,
	toastReset,
} from "../../../../store/slices/inventory/inventorySlice"
import SpecificationTable from "./SpecificationTable"

const Specifications = ({ prodId }) => {
	const [showModal, setShowModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [data, setData] = useState({
		attribute: "",
		value: "",
	})
	const [dataEdit, setDataEdit] = useState({
		attribute: "",
		value: "",
	})
	const {
		isLoading,
		attributes,
		showToast,
		message,
		specifications,
		specificationDetails,
		success,
	} = useSelector((state) => state.inventory)
	const dispatch = useDispatch()

	// Create unit
	const createHandler = (e) => {
		e.preventDefault()
		dispatch(addProductSpecification({ id: prodId, content: data }))
		setShowModal(false)
	}

	const editModalHandler = (id) => {
		setShowEditModal(true)
		dispatch(fetchProductSpecificationDetails({ prodId: prodId, specId: id }))
	}

	const updateHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateProductSpecification({
				prodId: prodId,
				specId: specificationDetails?.id,
				content: dataEdit,
			})
		)
		setShowEditModal(false)
		setTimeout(() => {
			dispatch(fetchProductSpecification(prodId))
		}, 500)
	}

	const deleteHandler = (id) => {
		dispatch(deleteProductSpecification({ prodId: prodId, specId: id }))
		setTimeout(() => {
			dispatch(fetchProductSpecification(prodId))
		}, 500)
	}

	useEffect(() => {
		if (!specifications) {
			dispatch(fetchProductSpecification(prodId))
		}
		if (!attributes) {
			dispatch(fetchAttributes())
		}
		if (specificationDetails) {
			setDataEdit(specificationDetails?.name || "")
		}
	}, [dispatch, specifications, specificationDetails, attributes, prodId])

	useEffect(() => {
		if (specificationDetails) {
			setDataEdit({
				attribute: specificationDetails?.attribute?.id || "",
				value: specificationDetails?.value || "",
			})
		}
	}, [specificationDetails])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	return (
		<div>
			<SubHeading>Specifications</SubHeading>
			<div>
				<Button onClick={() => setShowModal(true)} Icon={HiPlusCircle}>
					Add
				</Button>
			</div>

			<RenderIf isTrue={showModal}>
				<WrapperModal title="Add new specifications" setShow={setShowModal}>
					<form onSubmit={createHandler}>
						<SelectTag
							value={data.attribute}
							onChange={(e) =>
								setData((prev) => ({
									...prev,
									attribute: e.target.value,
								}))
							}
							label="Attributes"
							content={attributes || []}
						/>
						<InputTag
							Icon={HiPencilAlt}
							label="Value"
							type="text"
							placeholder="Enter the value"
							value={data.value}
							onChange={(e) =>
								setData((prev) => ({
									...prev,
									value: e.target.value,
								}))
							}
						/>
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			{/* Edit category modal */}
			<RenderIf isTrue={showEditModal}>
				<WrapperModal title="Update specification" setShow={setShowEditModal}>
					<form onSubmit={updateHandler}>
						<SelectTag
							value={dataEdit.attribute}
							onChange={(e) =>
								setDataEdit((prev) => ({
									...prev,
									attribute: e.target.value,
								}))
							}
							label="Attributes"
							content={attributes || []}
						/>
						<InputTag
							Icon={HiPencilAlt}
							label="Place"
							type="text"
							placeholder="Updated specification"
							value={dataEdit.value}
							onChange={(e) =>
								setDataEdit((prev) => ({
									...prev,
									value: e.target.value,
								}))
							}
						/>
						<Button type="submit" Icon={HiPlus}>
							Update
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>
			<RenderIf isTrue={specifications && specifications?.length > 0}>
				<TransitionBtoT>
					<SpecificationTable
						content={specifications}
						rowsPerPage={10}
						edit={editModalHandler}
						remove={deleteHandler}
					/>
				</TransitionBtoT>
			</RenderIf>

			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</div>
	)
}

export default Specifications
