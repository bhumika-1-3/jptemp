import { useState, useEffect } from "react"
import { HiPlus, HiLocationMarker } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
// Toast <====
import { toast } from "react-toastify"
// ===>
import {
	Button,
	Modal,
	SectionHeader,
	InputTag,
	SubHeading,
	SelectTag,
	RenderIf,
	CardSmall,
	TransitionBtoT,
	LoadingSpinner,
} from "../../../components"
import {
	addCountry,
	addCity,
	addState,
	allCountries,
	allCities,
	allStates,
	toastReset,
} from "../../../store/slices/location/locationSlice"

const Location = () => {
	const [country, setCountry] = useState("")
	const [stateVal, setStateVal] = useState("")
	const [city, setCity] = useState("")
	const [countryId, setCountryId] = useState("")
	const [stateId, setStateId] = useState("")
	const { isLoading, showToast, message, countries, states, cities, success } =
		useSelector((state) => state.location)
	const { currentTheme, colors } = useSelector((state) => state.theme)
	const dispatch = useDispatch()

	const createCountryHandler = (e) => {
		e.preventDefault()
		dispatch(addCountry({ name: country }))
	}
	const createStateHandler = (e) => {
		e.preventDefault()
		dispatch(addState({ name: stateVal, country: countryId }))
	}
	const createCityHandler = (e) => {
		e.preventDefault()
		dispatch(addCity({ name: city, state: stateId }))
	}

	useEffect(() => {
		dispatch(allCountries())
		dispatch(allStates())
		dispatch(allCities())
	}, [dispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])

	if (isLoading) {
		return <LoadingSpinner />
	}

	return (
		<div>
			<SectionHeader text="View and create locations">
				<Modal
					title="Add new country"
					activator={({ setShow }) => (
						<Button Icon={HiPlus} onClick={() => setShow(true)}>
							Add country
						</Button>
					)}
				>
					<form onSubmit={createCountryHandler}>
						<InputTag
							Icon={HiLocationMarker}
							label="Add country"
							type="text"
							placeholder="Enter country name"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</Modal>
				<Modal
					title="Add new state"
					activator={({ setShow }) => (
						<Button Icon={HiPlus} onClick={() => setShow(true)}>
							Add state
						</Button>
					)}
				>
					<form onSubmit={createStateHandler}>
						<SelectTag
							Icon={HiLocationMarker}
							value={countryId}
							label="Select country"
							content={countries || []}
							onChange={(e) => setCountryId(e.target.value)}
						/>
						<InputTag
							Icon={HiLocationMarker}
							label="Add state"
							type="text"
							placeholder="Enter state name"
							value={stateVal}
							onChange={(e) => setStateVal(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</Modal>
				<Modal
					title="Add new city"
					activator={({ setShow }) => (
						<Button Icon={HiPlus} onClick={() => setShow(true)}>
							Add city
						</Button>
					)}
				>
					<form onSubmit={createCityHandler}>
						<SelectTag
							Icon={HiLocationMarker}
							value={stateId}
							label="Select state"
							content={states || []}
							onChange={(e) => setStateId(e.target.value)}
						/>
						<InputTag
							Icon={HiLocationMarker}
							label="Add city"
							type="text"
							placeholder="Enter city name"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
						<Button type="submit" Icon={HiPlus}>
							Add
						</Button>
					</form>
				</Modal>
			</SectionHeader>
			<div className="mb-6">
				<SubHeading>Countries</SubHeading>
				<RenderIf isTrue={countries && countries?.length > 0}>
					<div className="grid md:grid-cols-4 gap-3">
						{countries?.map((item, idx) => (
							<TransitionBtoT key={item.id}>
								<CardSmall idx={idx + 1} name={item.name} />
							</TransitionBtoT>
						))}
					</div>
				</RenderIf>
			</div>
			<div className="mb-6">
				<SubHeading>States</SubHeading>
				<RenderIf isTrue={states && states?.length > 0}>
					<div className="grid md:grid-cols-4 gap-3">
						{states?.map((item, idx) => (
							<TransitionBtoT key={item.id}>
								<CardSmall idx={idx + 1}>
									<p
										className={`font-semibold ${
											currentTheme
												? colors.text[currentTheme].dark
												: "text-purple-600"
										} dark:text-purple-300`}
									>
										{item.name}
									</p>
									<p className="font-semibold dark:text-slate-300 text-slate-700">
										{item.country.name}
									</p>
								</CardSmall>
							</TransitionBtoT>
						))}
					</div>
				</RenderIf>
			</div>
			<div className="mb-6">
				<SubHeading>Cities</SubHeading>
				<RenderIf isTrue={cities && cities?.length > 0}>
					<div className="grid md:grid-cols-4 gap-3">
						{cities?.map((item, idx) => (
							<TransitionBtoT key={item.id}>
								<CardSmall idx={idx + 1}>
									<p
										className={`font-semibold ${
											currentTheme
												? colors.text[currentTheme].dark
												: "text-purple-600"
										} dark:text-purple-300`}
									>
										{item.name}
									</p>
									<p className="font-semibold dark:text-slate-300 text-slate-700 inline-block">
										{item.state.name}
									</p>
									,{" "}
									<p className="font-semibold dark:text-slate-400 inline-block">
										{item.state.country.name}
									</p>
								</CardSmall>
							</TransitionBtoT>
						))}
					</div>
				</RenderIf>
			</div>
		</div>
	)
}

export default Location
