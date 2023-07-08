import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
	HiPlus,
	HiCalendar,
	HiCog,
	HiIdentification,
	HiAcademicCap,
	HiLibrary,
} from "react-icons/hi"
import { FiType } from "react-icons/fi"

import {
	allEducations,
	newEducation,
	toastReset,
	removeEducation,
	updateEducation,
} from "../../../store/slices/employee/workAndEducationSlice"
import {
	Button,
	WrapperModal,
	InputTag,
	SectionHeader,
	SubHeading,
	RenderIf,
	LoadingSpinner,
	EducationTable,
	FadedText,
} from "../../../components"

const initialState = {
	institute_name: "",
	degree: "",
	specialization: "",
	date_of_completion: "",
}

const Education = () => {
	const [educationInfo, setEducationInfo] = useState(initialState)
	const [educationUpdateInfo, setEducationUpdateInfo] = useState(initialState)
	const [showEducationModal, setShowEducationModal] = useState(false)
	const [showEducationUpdateModal, setShowEducationUpdateModal] =
		useState(false)
	const [editId, setEditId] = useState(null)
	const { isLoading, showToast, message, success, educations } = useSelector(
		(state) => state.workAndEdu
	)
	const dispatch = useDispatch()
	// console.log("result", workExperience)

	const addNewEducationHandler = (e) => {
		e.preventDefault()
		dispatch(newEducation(educationInfo))
		setEducationInfo(initialState)
		setShowEducationModal(false)
	}
	const deleteEducationHandler = (id) => {
		dispatch(removeEducation(id))
	}
	const showEducationUpdateModalHandler = (id) => {
		const result = educations.find((el) => el.id === id)
		setEducationUpdateInfo(result)
		setShowEducationUpdateModal(true)
		setEditId(id)
	}

	const educationUpdateHandler = () => {
		dispatch(updateEducation({ id: editId, content: educationUpdateInfo }))
		setEditId(null)
		setEducationUpdateInfo(initialState)
		setShowEducationUpdateModal(false)
	}

	useEffect(() => {
		dispatch(allEducations())
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
			<SectionHeader text="Add education details, modify or delete them">
				<Button onClick={() => setShowEducationModal(true)} Icon={HiPlus}>
					Add
				</Button>
				<RenderIf isTrue={showEducationModal}>
					<WrapperModal title="Add education" setShow={setShowEducationModal}>
						<form onSubmit={addNewEducationHandler}>
							<InputTag
								value={educationInfo.institute_name}
								onChange={(e) =>
									setEducationInfo((prev) => ({
										...prev,
										institute_name: e.target.value,
									}))
								}
								type="text"
								Icon={HiLibrary}
								label="Institute name"
								placeholder="Enter institute name"
							/>
							<InputTag
								value={educationInfo.degree}
								onChange={(e) =>
									setEducationInfo((prev) => ({
										...prev,
										degree: e.target.value,
									}))
								}
								type="text"
								Icon={HiAcademicCap}
								label="Degree"
								placeholder="Enter degree name"
							/>
							<InputTag
								value={educationInfo.specialization}
								onChange={(e) =>
									setEducationInfo((prev) => ({
										...prev,
										specialization: e.target.value,
									}))
								}
								type="text"
								Icon={HiCog}
								label="Specialization"
								placeholder="Enter specialization"
							/>
							<InputTag
								value={educationInfo.date_of_completion}
								onChange={(e) =>
									setEducationInfo((prev) => ({
										...prev,
										date_of_completion: e.target.value,
									}))
								}
								type="date"
								Icon={HiCalendar}
								label="Completions date"
								placeholder="Enter date of completion"
							/>
							<Button type="submit" Icon={HiPlus}>
								Add
							</Button>
						</form>
					</WrapperModal>
				</RenderIf>
				<RenderIf isTrue={showEducationUpdateModal}>
					<WrapperModal
						title="Update education"
						setShow={setShowEducationUpdateModal}
					>
						<form onSubmit={educationUpdateHandler}>
							<InputTag
								value={educationUpdateInfo.institute_name}
								onChange={(e) =>
									setEducationUpdateInfo((prev) => ({
										...prev,
										institute_name: e.target.value,
									}))
								}
								type="text"
								Icon={FiType}
								label="Institute name"
								placeholder="Enter institute name"
							/>
							<InputTag
								value={educationUpdateInfo.degree}
								onChange={(e) =>
									setEducationUpdateInfo((prev) => ({
										...prev,
										degree: e.target.value,
									}))
								}
								type="text"
								Icon={HiIdentification}
								label="Degree"
								placeholder="Enter degree name"
							/>
							<InputTag
								value={educationUpdateInfo.specialization}
								onChange={(e) =>
									setEducationUpdateInfo((prev) => ({
										...prev,
										specialization: e.target.value,
									}))
								}
								type="text"
								Icon={HiCalendar}
								label="Specialization"
								placeholder="Enter specialization"
							/>
							<InputTag
								value={educationUpdateInfo.date_of_completion}
								onChange={(e) =>
									setEducationUpdateInfo((prev) => ({
										...prev,
										date_of_completion: e.target.value,
									}))
								}
								type="date"
								Icon={HiCalendar}
								label="Completions date"
								placeholder="Enter date of completion"
							/>
							<Button type="submit" Icon={HiPlus}>
								Update
							</Button>
						</form>
					</WrapperModal>
				</RenderIf>
			</SectionHeader>
			{/* Work experience table */}
			<SubHeading>Education</SubHeading>

			<RenderIf isTrue={educationInfo && educations.length > 0}>
				<EducationTable
					content={educations}
					rowsPerPage={5}
					_delete={deleteEducationHandler}
					update={showEducationUpdateModalHandler}
				/>
			</RenderIf>
			<RenderIf isTrue={educations.length < 1}>
				<FadedText>Nothing found :(</FadedText>
			</RenderIf>
		</div>
	)
}

export default Education
