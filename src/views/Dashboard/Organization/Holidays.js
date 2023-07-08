import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { HiPlusCircle, HiCalendar, HiRefresh } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import {
	allHolidays,
	createHolidays,
	toastReset,
} from "../../../store/slices/Attendance/attendanceSlice"

// Components
import {
	SectionHeader,
	SubHeading,
	Button,
	WrapperModal,
	InputTag,
	RadioTag,
	RenderIf,
	LoadingSpinner,
	TransitionBtoT,
} from "../../../components"

const Holidays = () => {
	const [showModal, setShowModal] = useState(false)
	const [holidayInfo, setHolidayInfo] = useState({
		date: "",
		name: "",
		recurring: null,
	})
	const { holidays, showToast, message, success, isLoading } = useSelector(
		(state) => state.attendance
	)
	const { currentTheme, colors } = useSelector((state) => state.theme)
	const dispatch = useDispatch()

	const createHolidayHandler = (e) => {
		e.preventDefault()
		dispatch(
			createHolidays({
				...holidayInfo,
				// recurring: holidayInfo.recurring ? "True" : "False",
			})
		)
		setShowModal(false)
	}

	useEffect(() => {
		dispatch(allHolidays())
	}, [dispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])

	return (
		<div>
			<SectionHeader text="View and create holidays">
				<Button Icon={HiPlusCircle} onClick={() => setShowModal(true)}>
					Create
				</Button>
			</SectionHeader>

			<RenderIf isTrue={showModal}>
				<WrapperModal title="Create new holiday" setShow={setShowModal}>
					<form onSubmit={createHolidayHandler}>
						<InputTag
							label="Name"
							placeholder="Enter holiday name"
							type="text"
							value={holidayInfo.name}
							onChange={(e) =>
								setHolidayInfo((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
						<InputTag
							Icon={HiCalendar}
							label="Date"
							placeholder="Enter holiday date"
							type="date"
							value={holidayInfo.date}
							onChange={(e) =>
								setHolidayInfo((prev) => ({ ...prev, date: e.target.value }))
							}
						/>
						<RadioTag
							Icon={HiRefresh}
							label="Recurring"
							content={[
								{ id: 1, value: true, name: "Yes" },
								{ id: 2, value: false, name: "No" },
							]}
							onChange={(e) =>
								setHolidayInfo((prev) => ({
									...prev,
									recurring: e.target.value,
								}))
							}
						/>
						<div className="mt-6">
							<Button Icon={HiPlusCircle} type="submit">
								Create
							</Button>
						</div>
					</form>
				</WrapperModal>
			</RenderIf>

			<div>
				<SubHeading>Holidays</SubHeading>
				<div>
					<RenderIf isTrue={holidays?.length < 1}>
						<h2 className="text-4xl text-slate-300 font-semibold dark:text-slate-600">
							There is no holiday found : (
						</h2>
					</RenderIf>
					<RenderIf isTrue={holidays && holidays?.length > 0}>
						<div className="grid md:grid-cols-4 gap-3">
							{holidays?.map((item, idx) => (
								<TransitionBtoT key={item.id}>
									<div className="shadow-cardShadow px-4 py-3 rounded-lg dark:bg-purple_5 relative">
										<span
											className={`font-semibold text-white text-sm px-2 rounded-lg mb-1.5 ${
												currentTheme
													? colors.bg[currentTheme].dark
													: "bg-purple-800"
											} inline-block dark:bg-purple-800`}
										>
											{idx + 1}
										</span>
										<h4 className="text-md font-semibold text-slate-700 dark:text-slate-300">
											{item.name}
										</h4>
										<span className="font-sm text-slate-700 dark:text-slate-400">
											{item.date}
										</span>
										<span className="font-sm text-slate-700 dark:text-slate-400 block">
											Recurring:{" "}
											<span className="font-semibold text-slate-700 dark:text-slate-200">
												{item.recurring ? "Yes" : "No"}
											</span>
										</span>
									</div>
								</TransitionBtoT>
							))}
						</div>
					</RenderIf>
				</div>
			</div>
			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</div>
	)
}

export default Holidays
