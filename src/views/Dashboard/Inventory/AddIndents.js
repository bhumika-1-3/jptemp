import { useState, useEffect } from "react"
import { HiPlusCircle } from "react-icons/hi"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
	LoadingSpinner,
	RenderIf,
	SelectTag,
	InputTag,
	Button,
	BigText,
	TextareaTag,
} from "../../../components"

import {
	fetchProducts,
	fetchUnits,
} from "../../../store/slices/inventory/inventorySlice"
import {
	addIndent,
	toastReset,
} from "../../../store/slices/inventory/inventory2Slice"

const AddIndents = () => {
	const [indent, setIndent] = useState({
		product: "",
		description: "",
		quantity: "",
		unit: "",
		purpose: "",
		project_name: "",
		order_number: "",
		required_date: "",
		remarks: "",
	})
	const { isLoading, products, units } = useSelector((state) => state.inventory)
	const {
		isLoading: addIndentIsLoading,
		showToast,
		success,
		message,
	} = useSelector((state) => state.inventory2)
	const dispatch = useDispatch()

	const createHandler = (e) => {
		e.preventDefault()
		dispatch(addIndent(indent))
		setIndent({
			product: "",
			description: "",
			quantity: "",
			unit: "",
			purpose: "",
			project_name: "",
			order_number: "",
			required_date: "",
			remarks: "",
		})
	}

	useEffect(() => {
		dispatch(fetchUnits())
		dispatch(fetchProducts())
	}, [dispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])

	return (
		<>
			{(addIndentIsLoading || isLoading) && <LoadingSpinner />}
			<BigText>Add a new indent</BigText>
			<section className="p-6 rounded-xl overflow-hidden custom_shadow bg-gray-100 dark:bg-purple_5 max-w-2xl">
				<form onSubmit={createHandler}>
					<RenderIf isTrue={products && products?.length > 0}>
						<SelectTag
							value={indent.product}
							onChange={(e) =>
								setIndent((prev) => ({ ...prev, product: e.target.value }))
							}
							label="Products"
							content={products || []}
						/>
					</RenderIf>
					<TextareaTag
						value={indent.description}
						onChange={(e) =>
							setIndent((prev) => ({ ...prev, description: e.target.value }))
						}
						label="Description"
						placeholder="Enter description"
					/>
					<InputTag
						value={indent.quantity}
						onChange={(e) =>
							setIndent((prev) => ({ ...prev, quantity: e.target.value }))
						}
						label="Quantity"
						type="number"
						placeholder="Enter quantity"
					/>
					<RenderIf isTrue={units && units?.length > 0}>
						<SelectTag
							value={indent.unit}
							onChange={(e) =>
								setIndent((prev) => ({ ...prev, unit: e.target.value }))
							}
							label="Unit"
							content={units || []}
						/>
					</RenderIf>
					<InputTag
						value={indent.purpose}
						onChange={(e) =>
							setIndent((prev) => ({ ...prev, purpose: e.target.value }))
						}
						label="Purpose"
						type="text"
						placeholder="Enter purpose"
					/>
					<InputTag
						value={indent.project_name}
						onChange={(e) =>
							setIndent((prev) => ({ ...prev, project_name: e.target.value }))
						}
						label="Project name"
						type="text"
						placeholder="Enter project name"
					/>
					<InputTag
						value={indent.order_number}
						onChange={(e) =>
							setIndent((prev) => ({ ...prev, order_number: e.target.value }))
						}
						label="Order number"
						type="text"
						placeholder="Enter order number"
					/>
					<InputTag
						value={indent.required_date}
						onChange={(e) =>
							setIndent((prev) => ({ ...prev, required_date: e.target.value }))
						}
						label="Required date"
						type="date"
						placeholder="Enter required date"
					/>
					<TextareaTag
						value={indent.remarks}
						onChange={(e) =>
							setIndent((prev) => ({ ...prev, remarks: e.target.value }))
						}
						label="Remarks"
						placeholder="Enter remarks"
					/>

					<div className="mt-6">
						<Button Icon={HiPlusCircle}>Add</Button>
					</div>
				</form>
			</section>
		</>
	)
}

export default AddIndents
