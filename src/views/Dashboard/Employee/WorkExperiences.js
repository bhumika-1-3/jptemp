import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
	HiPlus,
	HiCalendar,
	HiDocumentText,
	HiIdentification,
} from "react-icons/hi"
import { FiType } from "react-icons/fi"

import {
	allWorkExperiences,
	newWorkExperience,
	toastReset,
	removeWorkExperience,
	updateWorkExperience,
} from "../../../store/slices/employee/workAndEducationSlice"
import {
	Button,
	WrapperModal,
	InputTag,
	SectionHeader,
	SubHeading,
	TextareaTag,
	RenderIf,
	LoadingSpinner,
	WorkExperienceTable,
	FadedText,
} from "../../../components"

const initialState = {
	previous_company_name: "",
	job_title: "",
	start_date: "",
	end_date: "",
	job_description: "",
}

const WorkExperiences = () => {
	const [workExperience, setWorkExperience] = useState(initialState)
	const [showWorkModal, setShowWorkModal] = useState(false)
	const [showWorkUpdateModal, setShowWorkUpdateModal] = useState(false)
	const [editId, setEditId] = useState(null)
	const { isLoading, showToast, message, success, workExperiences } =
		useSelector((state) => state.workAndEdu)
	const dispatch = useDispatch()
	console.log("result", workExperience)

	const addNewWorkExpoerienceHandler = (e) => {
		e.preventDefault()
		dispatch(newWorkExperience(workExperience))
		setWorkExperience(initialState)
		setShowWorkModal(false)
	}
	const deleteWorkExperienceHandler = (id) => {
		dispatch(removeWorkExperience(id))
	}
	const showWorkExperienceModalHandler = (id) => {
		const result = workExperiences.find((el) => el.id === id)
		setWorkExperience(result)
		setShowWorkUpdateModal(true)
		setEditId(id)
	}

	const workExperiencesUpdateHandler = () => {
		dispatch(updateWorkExperience({ id: editId, content: workExperience }))
		setEditId(null)
		setWorkExperience(initialState)
		setShowWorkUpdateModal(false)
	}

	useEffect(() => {
		dispatch(allWorkExperiences())
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
			<SectionHeader text="Employee's work experiences, education and their dependents">
				<Button onClick={() => setShowWorkModal(true)} Icon={HiPlus}>
					Add
				</Button>
				<RenderIf isTrue={showWorkModal}>
					<WrapperModal title="Add work experience" setShow={setShowWorkModal}>
						<form onSubmit={addNewWorkExpoerienceHandler}>
							<InputTag
								value={workExperience.previous_company_name}
								onChange={(e) =>
									setWorkExperience((prev) => ({
										...prev,
										previous_company_name: e.target.value,
									}))
								}
								type="text"
								Icon={FiType}
								label="Previous company name"
								placeholder="Enter company name"
							/>
							<InputTag
								value={workExperience.job_title}
								onChange={(e) =>
									setWorkExperience((prev) => ({
										...prev,
										job_title: e.target.value,
									}))
								}
								type="text"
								Icon={HiIdentification}
								label="Job title"
								placeholder="Enter job title"
							/>
							<InputTag
								value={workExperience.start_date}
								onChange={(e) =>
									setWorkExperience((prev) => ({
										...prev,
										start_date: e.target.value,
									}))
								}
								type="date"
								Icon={HiCalendar}
								label="Start date"
								placeholder="Enter start date"
							/>
							<InputTag
								value={workExperience.end_date}
								onChange={(e) =>
									setWorkExperience((prev) => ({
										...prev,
										end_date: e.target.value,
									}))
								}
								type="date"
								Icon={HiCalendar}
								label="End date"
								placeholder="Enter end date"
							/>
							<TextareaTag
								value={workExperience.job_description}
								onChange={(e) =>
									setWorkExperience((prev) => ({
										...prev,
										job_description: e.target.value,
									}))
								}
								Icon={HiDocumentText}
								label="Job description"
								placeholder="Enter job description"
							/>

							<Button type="submit" Icon={HiPlus}>
								Add
							</Button>
						</form>
					</WrapperModal>
				</RenderIf>
				<RenderIf isTrue={showWorkUpdateModal}>
					<WrapperModal
						title="Update work experience"
						setShow={setShowWorkUpdateModal}
					>
						<form onSubmit={workExperiencesUpdateHandler}>
							<InputTag
								value={workExperience.previous_company_name}
								onChange={(e) =>
									setWorkExperience((prev) => ({
										...prev,
										previous_company_name: e.target.value,
									}))
								}
								type="text"
								Icon={FiType}
								label="previous company name"
								placeholder="Enter company name"
							/>
							<InputTag
								value={workExperience.job_title}
								onChange={(e) =>
									setWorkExperience((prev) => ({
										...prev,
										job_title: e.target.value,
									}))
								}
								type="text"
								Icon={HiIdentification}
								label="Job title"
								placeholder="Enter job title"
							/>
							<InputTag
								value={workExperience.start_date}
								onChange={(e) =>
									setWorkExperience((prev) => ({
										...prev,
										start_date: e.target.value,
									}))
								}
								type="date"
								Icon={HiCalendar}
								label="Start date"
								placeholder="Enter start date"
							/>
							<InputTag
								value={workExperience.end_date}
								onChange={(e) =>
									setWorkExperience((prev) => ({
										...prev,
										end_date: e.target.value,
									}))
								}
								type="date"
								Icon={HiCalendar}
								label="End date"
								placeholder="Enter end date"
							/>
							<TextareaTag
								value={workExperience.job_description}
								onChange={(e) =>
									setWorkExperience((prev) => ({
										...prev,
										job_description: e.target.value,
									}))
								}
								Icon={HiDocumentText}
								label="Job description"
								placeholder="Enter job description"
							/>
							<Button type="submit" Icon={HiPlus}>
								Update
							</Button>
						</form>
					</WrapperModal>
				</RenderIf>
			</SectionHeader>
			{/* Work experience table */}
			<SubHeading>Work experience</SubHeading>

			<RenderIf isTrue={workExperiences && workExperiences.length > 0}>
				<WorkExperienceTable
					content={workExperiences}
					rowsPerPage={5}
					_delete={deleteWorkExperienceHandler}
					update={showWorkExperienceModalHandler}
				/>
			</RenderIf>
			<RenderIf isTrue={workExperiences.length < 1}>
				<FadedText>Nothing found :(</FadedText>
			</RenderIf>
		</div>
	)
}

export default WorkExperiences
