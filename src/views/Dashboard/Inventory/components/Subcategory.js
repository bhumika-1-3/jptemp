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
	SelectTag,
	InputTag,
	TransitionBtoT,
	RenderIf,
	LoadingSpinner,
} from "../../../../components"
import {
	fetchInventoryCategories,
	fetchInventorySubcategories,
	addInventorySubcategories,
	fetchInventorySubcategoryDetails,
	updateInventorySubcategory,
	deleteInventorySubcategory,
	toastReset,
} from "../../../../store/slices/inventory/inventorySlice"
import SmallTable from "./SmallTable"

const Subcategory = () => {
	const [showModal, setShowModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [subCategory, setSubCategory] = useState({
		category: "",
		name: "",
	})
	const [subCategoryEdit, setSubCategoryEdit] = useState({
		category: "",
		name: "",
	})
	const {
		isLoading,
		showToast,
		message,
		categories,
		subCategories,
		subCategoryDetails,
		success,
	} = useSelector((state) => state.inventory)
	const dispatch = useDispatch()

	const createSubCategoryHandler = (e) => {
		e.preventDefault()
		dispatch(addInventorySubcategories(subCategory))
		setShowModal(false)
	}

	const editModalHandler = (id) => {
		setShowEditModal(true)
		dispatch(fetchInventorySubcategoryDetails(id))
	}

	const updateSubCategoryHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateInventorySubcategory({
				id: subCategoryDetails?.id,
				content: subCategoryEdit,
			})
		)
		setShowEditModal(false)
		setTimeout(() => {
			dispatch(fetchInventorySubcategories())
		}, 500)
	}

	const deleteSubCategoryHandler = (id) => {
		dispatch(deleteInventorySubcategory(id))
		setTimeout(() => {
			dispatch(fetchInventorySubcategories())
		}, 500)
	}

	useEffect(() => {
		if (!categories) {
			dispatch(fetchInventoryCategories())
		}
		if (!subCategories) {
			dispatch(fetchInventorySubcategories())
		}
		if (subCategoryDetails) {
			setSubCategoryEdit({
				category: subCategoryDetails?.category?.id,
				name: subCategoryDetails?.name,
			})
		}
	}, [dispatch, subCategories, subCategoryDetails, categories])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	return (
		<div>
			<SectionHeader text="All the categories">
				<Button Icon={HiPlus} onClick={() => setShowModal(true)}>
					Add
				</Button>
			</SectionHeader>

			<RenderIf isTrue={showModal}>
				<WrapperModal title="Add new subcategory" setShow={setShowModal}>
					<form onSubmit={createSubCategoryHandler}>
						<SelectTag
							value={subCategory.category}
							onChange={(e) =>
								setSubCategory((prev) => ({
									...prev,
									category: e.target.value,
								}))
							}
							label="Category"
							content={categories || []}
						/>
						<InputTag
							Icon={HiPencilAlt}
							label="Sub category name"
							type="text"
							placeholder="Enter sub category name"
							value={subCategory.name}
							onChange={(e) =>
								setSubCategory((prev) => ({
									...prev,
									name: e.target.value,
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
			<RenderIf isTrue={showEditModal && subCategoryDetails}>
				<WrapperModal title="Update subcategory" setShow={setShowEditModal}>
					<form onSubmit={updateSubCategoryHandler}>
						<SelectTag
							value={subCategoryEdit.category}
							onChange={(e) =>
								setSubCategoryEdit((prev) => ({
									...prev,
									category: e.target.value,
								}))
							}
							label="Category"
							content={categories || []}
						/>
						<InputTag
							Icon={HiPencilAlt}
							label="Sub category name"
							type="text"
							placeholder="Enter sub category name"
							value={subCategoryEdit.name}
							onChange={(e) =>
								setSubCategoryEdit((prev) => ({
									...prev,
									name: e.target.value,
								}))
							}
						/>
						<Button type="submit" Icon={HiPlus}>
							Update
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			<RenderIf isTrue={subCategories && subCategories?.length > 0}>
				<div className="max-w-md">
					<TransitionBtoT>
						<SmallTable
							content={subCategories}
							rowsPerPage={10}
							edit={editModalHandler}
							remove={deleteSubCategoryHandler}
							subCat
						/>
					</TransitionBtoT>
				</div>
			</RenderIf>

			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</div>
	)
}

export default Subcategory
