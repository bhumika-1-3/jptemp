import { useEffect, useState } from "react"
import { HiPencilAlt, HiPlusCircle } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import moment from "moment-timezone"
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
	SubHeading,
} from "../../../components"
import {
	toastReset,
	fetchIndents,
	fetchSuppliers,
	fetchPurchaseDetails,
	updatePurchase,
} from "../../../store/slices/inventory/inventory2Slice"
import { orderStatus } from "../../../data/data"

const PurchaseDetails = () => {
	const [purchase, setPurchase] = useState({
		indent: "",
		supplier: "",
		agreed_delivery_date: "",
		order_status: "",
		delivery_reference_number: "",
		is_active: "",
	})
	const {
		message,
		success,
		showToast,
		isLoading,
		indents,
		suppliers,
		purchaseDetails,
	} = useSelector((state) => state.inventory2)
	const dispatch = useDispatch()
	const { id } = useParams()

	const updateHandler = (e) => {
		e.preventDefault()
		dispatch(
			updatePurchase({
				id: purchaseDetails?.id,
				content: purchase,
			})
		)
		setTimeout(() => {
			dispatch(fetchPurchaseDetails(id))
		}, 500)
	}

	useEffect(() => {
		dispatch(fetchPurchaseDetails(id))
		dispatch(fetchSuppliers())
		dispatch(fetchIndents())
	}, [dispatch, id])

	useEffect(() => {
		if (purchaseDetails) {
			setPurchase({
				indent: purchaseDetails?.indent?.id || "",
				supplier: purchaseDetails?.supplier?.id || "",
				agreed_delivery_date: purchaseDetails?.agreed_delivery_date || "",
				order_status:
					orderStatus.find(
						(item) => item.name === purchaseDetails?.order_status
					).id || "",
				delivery_reference_number:
					purchaseDetails?.delivery_reference_number || "",
				is_active: purchaseDetails?.is_active || "",
			})
		}
	}, [dispatch, purchaseDetails])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	return (
		<>
			{isLoading && <LoadingSpinner />}
			<BigText>Purchase details</BigText>
			<div className="w-full flex space-x-6">
				<div className="w-[60%]">
					<RenderIf isTrue={purchaseDetails}>
						<TransitionBtoT>
							<div className="mb-4 p-6 rounded-xl overflow-hidden custom_shadow bg-gray-100 dark:bg-purple_5">
								<h3 className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Indent:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{purchaseDetails?.indent?.product}
									</span>
								</h3>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Supplier:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{purchaseDetails?.supplier?.name}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Aggreed delivery date:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{purchaseDetails?.agreed_delivery_date}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Order status:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{purchaseDetails?.order_status}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Delivery reference number:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{purchaseDetails?.delivery_reference_number}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Created date:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{moment(purchaseDetails?.created_at).format(
											"hh:mm DD-MMMM-yyyy"
										)}
									</span>
								</p>
							</div>
						</TransitionBtoT>
					</RenderIf>
				</div>

				{/* Edit supplier */}
				<RenderIf isTrue={purchaseDetails}>
					<section className="p-6 rounded-xl overflow-hidden custom_shadow bg-gray-100 dark:bg-purple_5 md:w-[40%]">
						<SubHeading>Update</SubHeading>
						<form onSubmit={updateHandler}>
							<SelectTag
								Icon={HiPencilAlt}
								label="Indent"
								content={indents || []}
								value={purchase.indent}
								onChange={(e) =>
									setPurchase((prev) => ({ ...prev, indent: e.target.value }))
								}
							/>
							<SelectTag
								Icon={HiPencilAlt}
								label="Supplier"
								content={suppliers || []}
								value={purchase.supplier}
								onChange={(e) =>
									setPurchase((prev) => ({ ...prev, supplier: e.target.value }))
								}
							/>
							<InputTag
								value={purchase.agreed_delivery_date}
								onChange={(e) =>
									setPurchase((prev) => ({
										...prev,
										agreed_delivery_date: e.target.value,
									}))
								}
								type="date"
								Icon={HiPencilAlt}
								label="Agreed delivery date"
							/>
							<SelectTag
								content={orderStatus || []}
								value={purchase.order_status}
								onChange={(e) =>
									setPurchase((prev) => ({
										...prev,
										order_status: e.target.value,
									}))
								}
								Icon={HiPencilAlt}
								label="Order status"
							/>
							<InputTag
								type="text"
								value={purchase.delivery_reference_number}
								onChange={(e) =>
									setPurchase((prev) => ({
										...prev,
										delivery_reference_number: e.target.value,
									}))
								}
								placeholder="Enter delivery refrence date"
								Icon={HiPencilAlt}
								label="Delivery reference no."
							/>
							<SelectTag
								content={[
									{ id: true, name: "True" },
									{ id: false, name: "False" },
								]}
								value={purchase.is_active}
								onChange={(e) =>
									setPurchase((prev) => ({
										...prev,
										is_active: e.target.value,
									}))
								}
								Icon={HiPencilAlt}
								label="Is active"
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

export default PurchaseDetails
