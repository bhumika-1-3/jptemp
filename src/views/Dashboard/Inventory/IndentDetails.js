import { useEffect, useState } from "react"
import { HiPlusCircle } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
// Toast <====
import { toast } from "react-toastify"
// ===>
import {
	BigText,
	RenderIf,
	LoadingSpinner,
	TransitionBtoT,
	SelectTag,
	InputTag,
	Button,
	TextareaTag,
	SubHeading,
} from "../../../components"
import {
	toastReset,
	fetchIndentDetails,
	updateIndent,
} from "../../../store/slices/inventory/inventory2Slice"
import {
	fetchProducts,
	fetchUnits,
} from "../../../store/slices/inventory/inventorySlice"

const IndentDetails = () => {
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
	const { products, units } = useSelector((state) => state.inventory)
	const { message, success, showToast, isLoading, indentDetails } = useSelector(
		(state) => state.inventory2
	)
	const dispatch = useDispatch()
	const { id } = useParams()

	const updateHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateIndent({
				id: indentDetails?.id,
				content: indent,
			})
		)
		setTimeout(() => {
			dispatch(fetchIndentDetails(id))
		}, 500)
	}

	useEffect(() => {
		dispatch(fetchIndentDetails(id))
		dispatch(fetchUnits())
		dispatch(fetchProducts())
	}, [dispatch, id])

	useEffect(() => {
		if (indentDetails) {
			setIndent({
				product: indentDetails?.product || "",
				description: indentDetails?.description || "",
				quantity: indentDetails?.quantity || "",
				unit: indentDetails?.unit || "",
				purpose: indentDetails?.purpose || "",
				project_name: indentDetails?.project_name || "",
				order_number: indentDetails?.order_number || "",
				required_date: indentDetails?.required_date || "",
				remarks: indentDetails?.remarks || "",
			})
		}
	}, [dispatch, indentDetails])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	return (
		<>
			{isLoading && <LoadingSpinner />}
			<BigText>Indent details</BigText>
			<div className="w-full flex space-x-6">
				<div className="w-[60%]">
					<RenderIf isTrue={indentDetails}>
						<TransitionBtoT>
							<div className="mb-4 p-6 rounded-xl overflow-hidden custom_shadow bg-gray-100 dark:bg-purple_5">
								<h3 className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Product:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{indentDetails?.product}
									</span>
								</h3>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Description:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{indentDetails?.description}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Quantity:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{indentDetails?.quantity}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Unit:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{indentDetails?.unit}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Purpose:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{indentDetails?.purpose}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Project name:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{indentDetails?.project_name}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Order number:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{indentDetails?.order_number}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Required date:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{indentDetails?.required_date}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Remarks :{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{indentDetails?.remarks}
									</span>
								</p>
							</div>
						</TransitionBtoT>
					</RenderIf>
				</div>

				{/* Edit supplier */}
				<RenderIf isTrue={indentDetails}>
					<section className="p-6 rounded-xl overflow-hidden custom_shadow bg-gray-100 dark:bg-purple_5 md:w-[40%]">
						<SubHeading>Update</SubHeading>
						<form onSubmit={updateHandler}>
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
									setIndent((prev) => ({
										...prev,
										description: e.target.value,
									}))
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
									setIndent((prev) => ({
										...prev,
										project_name: e.target.value,
									}))
								}
								label="Project name"
								type="text"
								placeholder="Enter project name"
							/>
							<InputTag
								value={indent.order_number}
								onChange={(e) =>
									setIndent((prev) => ({
										...prev,
										order_number: e.target.value,
									}))
								}
								label="Order number"
								type="text"
								placeholder="Enter order number"
							/>
							<InputTag
								value={indent.required_date}
								onChange={(e) =>
									setIndent((prev) => ({
										...prev,
										required_date: e.target.value,
									}))
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

							<Button type="submit" Icon={HiPlusCircle}>
								Update
							</Button>
						</form>
					</section>
				</RenderIf>
			</div>
		</>
	)
}

export default IndentDetails
