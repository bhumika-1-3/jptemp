import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
// Toast <====
import { toast } from "react-toastify"
// ===>
import {
	RenderIf,
	SectionHeader,
	Button,
	TransitionBtoT,
	NoteText,
	LoadingSpinner,
	WrapperModal,
	InputTag,
	TextareaTag,
	SelectTag,
} from "../../../../components"
import SupplierTable from "./SuppliersTable"
import {
	fetchSuppliers,
	addSupplier,
	deleteSupplier,
	toastReset,
} from "../../../../store/slices/inventory/inventory2Slice"
import { HiPencilAlt, HiPlus, HiPlusCircle } from "react-icons/hi"
import { paymentTerm } from "../../../../data/data"

const Suppliers = () => {
	const [showModal, setShowModal] = useState(false)
	const [data, setData] = useState({
		name: "",
		address: "",
		payment_terms: "",
		payment_days: "",
	})
	const { suppliers, message, success, showToast, isLoading } = useSelector(
		(state) => state.inventory2
	)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const createHandler = (e) => {
		e.preventDefault()
		dispatch(addSupplier(data))
		setShowModal(false)
	}

	const deleteHandler = (id) => {
		dispatch(deleteSupplier(id))
		setTimeout(() => {
			dispatch(fetchSuppliers())
		}, 500)
	}

	const navigateToDetails = (id) => {
		navigate(`supplier-details/${id}`)
	}

	useEffect(() => {
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
			{isLoading && <LoadingSpinner />}
			<SectionHeader text="All the products">
				<Button Icon={HiPlusCircle} onClick={() => setShowModal(true)}>
					Add
				</Button>
			</SectionHeader>
			{/* Add supplier modal */}
			<RenderIf isTrue={showModal}>
				<WrapperModal title="Add new supplier" setShow={setShowModal}>
					<form onSubmit={createHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Name"
							type="text"
							placeholder="Enter supplier name"
							value={data.name}
							onChange={(e) =>
								setData((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
						<TextareaTag
							Icon={HiPencilAlt}
							label="Address"
							placeholder="Enter supplier address"
							value={data.address}
							onChange={(e) =>
								setData((prev) => ({ ...prev, address: e.target.value }))
							}
						/>
						<SelectTag
							value={data.payment_terms || ""}
							onChange={(e) =>
								setData((prev) => ({ ...prev, payment_terms: e.target.value }))
							}
							content={paymentTerm}
							label="Payment term"
						/>
						<InputTag
							Icon={HiPencilAlt}
							label="Payment days"
							type="number"
							placeholder="Enter payment days"
							value={data.payment_days}
							onChange={(e) =>
								setData((prev) => ({ ...prev, payment_days: e.target.value }))
							}
						/>
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>

			<RenderIf isTrue={suppliers && suppliers?.length > 0}>
				<TransitionBtoT>
					<NoteText>Click on supplier name to view details</NoteText>
					<div className="max-w-lg">
						<SupplierTable
							content={suppliers}
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

export default Suppliers
