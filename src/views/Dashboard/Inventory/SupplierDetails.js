import { useEffect, useState } from "react"
import { HiPencilAlt, HiPlusCircle } from "react-icons/hi"
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
import Contacts from "./components/Contacts"
import {
	toastReset,
	fetchSupplierDetails,
	updateSupplier,
} from "../../../store/slices/inventory/inventory2Slice"
import { paymentTerm } from "../../../data/data"

const SupplierDetails = () => {
	const [dataEdit, setDataEdit] = useState({
		name: "",
		address: "",
		payment_terms: "",
		payment_days: "",
	})
	const { message, success, showToast, isLoading, supplierDetails } =
		useSelector((state) => state.inventory2)
	const dispatch = useDispatch()
	const { id } = useParams()

	const updateHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateSupplier({
				id: supplierDetails?.id,
				content: dataEdit,
			})
		)
		setTimeout(() => {
			dispatch(fetchSupplierDetails(id))
		}, 500)
	}

	useEffect(() => {
		dispatch(fetchSupplierDetails(id))
	}, [dispatch, id])

	useEffect(() => {
		if (supplierDetails) {
			setDataEdit({
				name: supplierDetails?.name || "",
				address: supplierDetails?.address || "",
				// payment_terms: supplierDetails?.payment_terms || "",
				payment_terms: paymentTerm.find(
					(item) => item.name === supplierDetails?.payment_terms
				).id,
				payment_days: supplierDetails?.payment_days || "",
			})
		}
	}, [dispatch, supplierDetails])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	return (
		<>
			{isLoading && <LoadingSpinner />}
			<BigText>Supplier details</BigText>
			<div className="w-full flex space-x-6">
				<div className="w-[60%]">
					<RenderIf isTrue={supplierDetails}>
						<TransitionBtoT>
							<div className="mb-4 p-6 rounded-xl overflow-hidden custom_shadow bg-gray-100 dark:bg-purple_5">
								<h3 className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Name:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{supplierDetails?.name}
									</span>
								</h3>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Address:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{supplierDetails?.address}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Payment terms:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{supplierDetails?.payment_terms}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Payment days:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{supplierDetails?.payment_days}
									</span>
								</p>
							</div>
						</TransitionBtoT>
					</RenderIf>

					{/* Supplier contact */}
					<Contacts supId={id} />
				</div>

				{/* Edit supplier */}
				<RenderIf isTrue={supplierDetails}>
					<section className="p-6 rounded-xl overflow-hidden custom_shadow bg-gray-100 dark:bg-purple_5 md:w-[40%]">
						<SubHeading>Update</SubHeading>
						<form onSubmit={updateHandler}>
							<InputTag
								Icon={HiPencilAlt}
								label="Name"
								type="text"
								placeholder="Enter supplier name"
								value={dataEdit.name}
								onChange={(e) =>
									setDataEdit((prev) => ({ ...prev, name: e.target.value }))
								}
							/>
							<TextareaTag
								Icon={HiPencilAlt}
								label="Address"
								placeholder="Enter supplier address"
								value={dataEdit.address}
								onChange={(e) =>
									setDataEdit((prev) => ({ ...prev, address: e.target.value }))
								}
							/>
							<SelectTag
								value={dataEdit.payment_terms}
								onChange={(e) =>
									setDataEdit((prev) => ({
										...prev,
										payment_terms: e.target.value,
									}))
								}
								content={paymentTerm}
								label="Payment term"
							/>
							<InputTag
								Icon={HiPencilAlt}
								label="Payment days"
								type="number"
								placeholder="Enter payment days"
								value={dataEdit.payment_days}
								onChange={(e) =>
									setDataEdit((prev) => ({
										...prev,
										payment_days: e.target.value,
									}))
								}
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

export default SupplierDetails
