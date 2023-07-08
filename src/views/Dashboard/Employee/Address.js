import { useState, useReducer, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"

import { HiPlus, HiPlusCircle } from "react-icons/hi"
import {
	addressAll,
	addNewAddress,
	addressDetail,
	removeAddress,
	updateAddress,
	toastReset,
} from "../../../store/slices/employee/employeeSlice"
import {
	allCities,
	toastReset as locationToastReset,
} from "../../../store/slices/location/locationSlice"
import {
	Button,
	InputTag,
	SelectTag,
	AddressCard,
	SectionHeader,
	SubHeading,
	Modal,
	RenderIf,
	LoadingSpinner,
	WrapperModal,
	TransitionBtoT,
} from "../../../components"

// Initial state
const initialState = {
	line_1: "",
	line_2: "",
	landmark: "",
	city: "",
	pincode: "",
}

const addressReducer = (state, action) => {
	switch (action.type) {
		case "line1": {
			return { ...state, line_1: action.payload }
		}
		case "line2": {
			return { ...state, line_2: action.payload }
		}
		case "landmark": {
			return { ...state, landmark: action.payload }
		}
		case "city": {
			return { ...state, city: action.payload }
		}
		case "pincode": {
			return { ...state, pincode: action.payload }
		}
		default: {
			return state
		}
	}
}

const Address = () => {
	const [modifyAddressInfo, setModifyAddressInfo] = useState({
		line_1: "",
		line_2: "",
		landmark: "",
		city: "",
		pincode: "",
	})
	const [addressModifyModal, setAddressModifyModal] = useState(false)
	const [state, addressDispatch] = useReducer(addressReducer, initialState)
	const {
		employeeAddresses,
		employeeAddressDetail,
		isLoading,
		showToast,
		message,
		success,
	} = useSelector((state) => state.employee)
	const {
		isLoading: locationLoading,
		showToast: locationToast,
		message: locationMessage,
		cities,
		success: locationSuccess,
	} = useSelector((state) => state.location)
	const dispatch = useDispatch()

	const addNewAddressHandler = (e) => {
		e.preventDefault()

		dispatch(addNewAddress(state))
	}

	const showUpdateAddressModalHandler = (id) => {
		setAddressModifyModal(true)
		dispatch(addressDetail(id))
	}

	const updateAddressHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateAddress({
				id: employeeAddressDetail?.id,
				content: modifyAddressInfo,
			})
		)
		setModifyAddressInfo({
			line_1: "",
			line_2: "",
			landmark: "",
			city: "",
			pincode: "",
		})
		setAddressModifyModal(false)
	}

	const deleteAddressHandler = (id) => {
		dispatch(removeAddress(id))
	}

	useEffect(() => {
		dispatch(addressAll())
		dispatch(allCities())
	}, [dispatch])

	useEffect(() => {
		if (employeeAddressDetail) {
			setModifyAddressInfo({
				line_1: employeeAddressDetail?.line_1 || "",
				line_2: employeeAddressDetail?.line_2 || "",
				landmark: employeeAddressDetail?.landmark || "",
				city: employeeAddressDetail?.city?.id || "",
				pincode: employeeAddressDetail?.pincode || "",
			})
		}
	}, [employeeAddressDetail])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	useEffect(() => {
		if (locationToast) {
			toast[locationSuccess ? "success" : "error"](locationMessage)
		}
		return () => dispatch(locationToastReset())
	}, [locationToast, locationMessage, dispatch, locationSuccess])

	if (isLoading || locationLoading) {
		return <LoadingSpinner />
	}
	return (
		<div>
			<SectionHeader text="All your addresses">
				<Modal
					title="Add your address"
					activator={({ setShow }) => (
						<Button Icon={HiPlus} onClick={() => setShow(true)}>
							Add
						</Button>
					)}
				>
					<form onSubmit={addNewAddressHandler}>
						<InputTag
							value={state.line_1}
							onChange={(e) =>
								addressDispatch({ type: "line1", payload: e.target.value })
							}
							label="Line 1"
							placeholder="Address line 1"
							type="text"
						/>
						<InputTag
							value={state.line_2}
							onChange={(e) =>
								addressDispatch({ type: "line2", payload: e.target.value })
							}
							label="Line 2"
							placeholder="Address line 2"
							type="text"
						/>
						<InputTag
							value={state.landmark}
							onChange={(e) =>
								addressDispatch({ type: "landmark", payload: e.target.value })
							}
							label="Landmark"
							placeholder="Enter landmark"
							type="text"
						/>
						<SelectTag
							value={state.city}
							onChange={(e) =>
								addressDispatch({ type: "city", payload: e.target.value })
							}
							label="City"
							content={cities}
						/>
						<InputTag
							value={state.pincode}
							onChange={(e) =>
								addressDispatch({ type: "pincode", payload: e.target.value })
							}
							label="Pincode"
							placeholder="Enter your area pincode"
							type="text"
						/>
						<div className="mt-4">
							<Button Icon={HiPlus} type="Submit">
								Add
							</Button>
							{/* <Button Icon={HiPlus} type="Submit">
							Update
						</Button> */}
						</div>
					</form>
				</Modal>
			</SectionHeader>
			<div>
				{/* Address cards */}
				<SubHeading>All your address</SubHeading>
				<div>
					<RenderIf isTrue={employeeAddresses.length > 0}>
						<div className="grid lg:grid-cols-4 md:grid-cols-2  gap-4">
							{employeeAddresses?.map((item, idx) => (
								<TransitionBtoT>
									<AddressCard
										key={idx}
										content={item}
										editAddress={showUpdateAddressModalHandler}
										deleteAddress={deleteAddressHandler}
									/>
								</TransitionBtoT>
							))}
						</div>
					</RenderIf>
					<RenderIf isTrue={employeeAddresses.length < 1}>
						<h2 className="text-4xl text-slate-300 font-semibold dark:text-slate-600">
							: ( Sorry
							<br />
							There is nothing to show here <br />
							Try adding address.
						</h2>
					</RenderIf>
				</div>
			</div>

			{/* Address update modal */}
			<RenderIf isTrue={addressModifyModal}>
				<WrapperModal title="Update address" setShow={setAddressModifyModal}>
					<form onSubmit={updateAddressHandler}>
						<InputTag
							value={modifyAddressInfo.line_1}
							onChange={(e) =>
								setModifyAddressInfo((prev) => ({
									...prev,
									line_1: e.target.value,
								}))
							}
							label="Line 1"
							placeholder="Address line 1"
							type="text"
						/>
						<InputTag
							value={modifyAddressInfo.line_2}
							onChange={(e) =>
								setModifyAddressInfo((prev) => ({
									...prev,
									line_2: e.target.value,
								}))
							}
							label="Line 2"
							placeholder="Address line 2"
							type="text"
						/>
						<InputTag
							value={modifyAddressInfo.landmark}
							onChange={(e) =>
								setModifyAddressInfo((prev) => ({
									...prev,
									landmark: e.target.value,
								}))
							}
							label="Landmark"
							placeholder="Enter landmark"
							type="text"
						/>
						<SelectTag
							value={modifyAddressInfo.city}
							onChange={(e) =>
								setModifyAddressInfo((prev) => ({
									...prev,
									city: e.target.value,
								}))
							}
							label="City"
							content={cities}
						/>
						<InputTag
							value={modifyAddressInfo.pincode}
							onChange={(e) =>
								setModifyAddressInfo((prev) => ({
									...prev,
									pincode: e.target.value,
								}))
							}
							label="Pincode"
							placeholder="Enter your area pincode"
							type="number"
						/>
						<Button type="submit" Icon={HiPlusCircle}>
							Update
						</Button>
					</form>
				</WrapperModal>
			</RenderIf>
		</div>
	)
}

export default Address
