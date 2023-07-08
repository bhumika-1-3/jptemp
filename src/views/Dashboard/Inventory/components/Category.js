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
	fetchInventoryCategories,
	addInventoryCategories,
	fetchInventoryCategoryDetails,
	updateInventoryCategory,
	deleteInventoryCategory,
	toastReset,
} from "../../../../store/slices/inventory/inventorySlice"
import SmallTable from "./SmallTable"

const Category = () => {
	const [showModal, setShowModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [category, setCategory] = useState("")
	const [categoryEdit, setCategoryEdit] = useState("")
	const {
		isLoading,
		showToast,
		message,
		categories,
		categoryDetails,
		success,
	} = useSelector((state) => state.inventory)
	const dispatch = useDispatch()

	// Create department function
	const createCategoryHandler = (e) => {
		e.preventDefault()
		dispatch(addInventoryCategories({ name: category }))
		setShowModal(false)
	}

	const editModalHandler = (id) => {
		setShowEditModal(true)
		dispatch(fetchInventoryCategoryDetails(id))
	}

	const updateCategoryHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateInventoryCategory({
				id: categoryDetails?.id,
				content: { name: categoryEdit },
			})
		)
		setShowEditModal(false)
		setTimeout(() => {
			dispatch(fetchInventoryCategories())
		}, 500)
	}

	const deleteCategoryHandler = (id) => {
		dispatch(deleteInventoryCategory(id))
		setTimeout(() => {
			dispatch(fetchInventoryCategories())
		}, 500)
	}

	useEffect(() => {
		if (!categories) {
			dispatch(fetchInventoryCategories())
		}
		if (categoryDetails) {
			setCategoryEdit(categoryDetails?.name || "")
		}
	}, [dispatch, categories, categoryDetails])

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
				<WrapperModal title="Add new category" setShow={setShowModal}>
					<form onSubmit={createCategoryHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Create category"
							type="text"
							placeholder="Enter category name"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			{/* Edit category modal */}
			<RenderIf isTrue={showEditModal}>
				<WrapperModal title="Update category" setShow={setShowEditModal}>
					<form onSubmit={updateCategoryHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Update Category"
							type="text"
							placeholder="Updated category name"
							value={categoryEdit}
							onChange={(e) => setCategoryEdit(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Update
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			<RenderIf isTrue={categories && categories?.length > 0}>
				<div className="max-w-md">
					<TransitionBtoT>
						{/* <CardSmall idx={idx + 1} name={item?.name}>
								<div className="absolute top-2 right-2 flex items-center space-x-2">
									<HiPencilAlt
										onClick={() => editModalHandler(item?.id)}
										className="cursor-pointer h-5 w-5 text-blue-400 hover:text-blue-600 duration-200"
									/>
									<HiTrash
										onClick={() => deleteCategoryHandler(item?.id)}
										className="cursor-pointer h-5 w-5 text-red-400 hover:text-red-600 duration-200"
									/>
								</div>
							</CardSmall> */}
						<SmallTable
							content={categories}
							rowsPerPage={10}
							edit={editModalHandler}
							remove={deleteCategoryHandler}
						/>
					</TransitionBtoT>
				</div>
			</RenderIf>

			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</div>
	)
}

export default Category
