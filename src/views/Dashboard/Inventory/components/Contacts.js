import { useState, useEffect } from "react"
import { HiPlus, HiPencilAlt, HiPlusCircle } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"

import {
	Button,
	WrapperModal,
	InputTag,
	TransitionBtoT,
	RenderIf,
	LoadingSpinner,
	SubHeading,
} from "../../../../components"
import ContactsTable from "./ContactsTable"
import {
	fetchSupplierContacts,
	addSupplierContact,
	deleteSupplierContact,
} from "../../../../store/slices/inventory/inventory2Slice"

const Contacts = ({ supId }) => {
	const [showModal, setShowModal] = useState(false)
	// const [showEditModal, setShowEditModal] = useState(false)
	const [data, setData] = useState({
		name: "",
		phone: "",
		email: "",
	})
	// const [dataEdit, setDataEdit] = useState({
	// 	name: "",
	// 	phone: "",
	// 	email: "",
	// })
	const { isLoading, contacts } = useSelector((state) => state.inventory2)
	const dispatch = useDispatch()

	// Create unit
	const createHandler = (e) => {
		e.preventDefault()
		if (supId) {
			dispatch(addSupplierContact({ supplierId: supId, content: data }))
		}
		setShowModal(false)
	}

	// const editModalHandler = (id) => {
	// 	setShowEditModal(true)
	// 	dispatch(fetchProductSpecificationDetails({ supId: supId, contactId: id }))
	// }

	// const updateHandler = (e) => {
	// 	e.preventDefault()
	// 	dispatch(
	// 		updateProductSpecification({
	// 			supId: supId,
	// 			contactId: contactDetails?.id,
	// 			content: dataEdit,
	// 		})
	// 	)
	// 	setShowEditModal(false)
	// 	setTimeout(() => {
	// 		dispatch(fetchProductSpecification(prodId))
	// 	}, 500)
	// }

	const deleteHandler = (id) => {
		dispatch(deleteSupplierContact({ supplierId: supId, contactId: id }))
		setTimeout(() => {
			dispatch(fetchSupplierContacts(supId))
		}, 500)
	}

	useEffect(() => {
		if (supId) {
			dispatch(fetchSupplierContacts(supId))
		}
	}, [dispatch, supId])

	return (
		<div>
			<SubHeading>Contacts</SubHeading>
			<div>
				<Button onClick={() => setShowModal(true)} Icon={HiPlusCircle}>
					Add
				</Button>
			</div>

			<RenderIf isTrue={showModal}>
				<WrapperModal title="Add new contact" setShow={setShowModal}>
					<form onSubmit={createHandler}>
						<InputTag
							Icon={HiPencilAlt}
							label="Name"
							type="text"
							placeholder="Enter the name"
							value={data.name}
							onChange={(e) =>
								setData((prev) => ({
									...prev,
									name: e.target.value,
								}))
							}
						/>
						<InputTag
							Icon={HiPencilAlt}
							label="Phone"
							type="number"
							placeholder="Enter the phone number"
							value={data.phone}
							onChange={(e) =>
								setData((prev) => ({
									...prev,
									phone: e.target.value,
								}))
							}
						/>
						<InputTag
							Icon={HiPencilAlt}
							label="Email"
							type="email"
							placeholder="Enter the email address"
							value={data.email}
							onChange={(e) =>
								setData((prev) => ({
									...prev,
									email: e.target.value,
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
			{/* <RenderIf isTrue={showEditModal}>
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
			</RenderIf> */}
			<RenderIf isTrue={contacts && contacts?.length > 0}>
				<TransitionBtoT>
					<ContactsTable
						content={contacts}
						rowsPerPage={10}
						// edit={editModalHandler}
						remove={deleteHandler}
					/>
				</TransitionBtoT>
			</RenderIf>

			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</div>
	)
}

export default Contacts
