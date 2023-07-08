import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import {
	RenderIf,
	SectionHeader,
	Button,
	TransitionBtoT,
	NoteText,
	SelectTag,
	WrapperModal,
	InputTag,
} from "../../../../components"
import PurchasesTable from "./PurchasesTable"
import { orderStatus } from "../../../../data/data"
import {
	fetchPurchases,
	addPurchase,
	deletePurchase,
	fetchSuppliers,
	fetchIndents,
	toastReset,
} from "../../../../store/slices/inventory/inventory2Slice"
import { HiPencilAlt, HiPlus } from "react-icons/hi"

const Purchases = () => {
	const [purchase, setPurchase] = useState({
		indent: "",
		supplier: "",
		agreed_delivery_date: "",
		order_status: "",
		delivery_reference_number: "",
	})
	const [showModal, setShowModal] = useState(false)
	const { purchases, indents, suppliers, showToast, message, success } =
		useSelector((state) => state.inventory2)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const navigateToDetails = (id) => {
		navigate(`purchase-details/${id}`)
	}

	const createHandler = (e) => {
		e.preventDefault()
		dispatch(addPurchase(purchase))
		setPurchase({
			indent: "",
			supplier: "",
			agreed_delivery_date: "",
			order_status: "",
			delivery_reference_number: "",
		})
	}

	// console.log("purchase local", purchase)

	const deleteHandler = (id) => {
		dispatch(deletePurchase(id))
		setTimeout(() => {
			dispatch(fetchPurchases())
		}, 500)
	}

	useEffect(() => {
		dispatch(fetchPurchases())
		dispatch(fetchIndents())
		dispatch(fetchSuppliers())
	}, [dispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	return (
		<div>
			<SectionHeader text="All indents">
				<Button Icon={HiPlus} onClick={() => setShowModal(true)}>
					Add
				</Button>
			</SectionHeader>

			{/* Add purchase */}
			<RenderIf isTrue={showModal}>
				<WrapperModal title="Add new purchase" setShow={setShowModal}>
					<form onSubmit={createHandler}>
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
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			<RenderIf isTrue={purchases && purchases?.length > 0}>
				<TransitionBtoT>
					<NoteText>Click on purchase name to view details</NoteText>
					<div className="max-w-3xl">
						<PurchasesTable
							content={purchases}
							rowsPerPage={10}
							onClick={navigateToDetails}
							remove={deleteHandler}
						/>
					</div>
				</TransitionBtoT>
			</RenderIf>
		</div>
	)
}

export default Purchases
