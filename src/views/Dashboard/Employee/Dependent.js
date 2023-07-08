import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { HiPlus, HiAcademicCap, HiLibrary } from "react-icons/hi"

import {
	allDependents,
	newDependent,
	toastReset,
	removeDependent,
	updateDependent,
} from "../../../store/slices/employee/workAndEducationSlice"
import {
	Button,
	WrapperModal,
	InputTag,
	SectionHeader,
	SubHeading,
	RenderIf,
	LoadingSpinner,
	DependentsTable,
	FadedText,
	SelectTag,
} from "../../../components"

const relationData = [
	{
		name: "Father",
		id: 0,
	},
	{
		name: "Mother",
		id: 1,
	},
	{
		name: "Brother",
		id: 2,
	},
	{
		name: "Sister",
		id: 3,
	},
	{
		name: "Spouse",
		id: 4,
	},
	{
		name: "Child",
		id: 5,
	},
]

const initialState = {
	name: "",
	date_of_birth: "",
	relationship: "",
}

const Dependent = () => {
	const [dependentInfo, setDependentInfo] = useState(initialState)
	const [dependentUpdateInfo, setDependentUpdateInfo] = useState(initialState)
	const [showDependentModal, setShowDependentModal] = useState(false)
	const [showDependentUpdateModal, setShowDependentUpdateModal] =
		useState(false)
	const [editId, setEditId] = useState(null)
	const { isLoading, showToast, message, success, dependents } = useSelector(
		(state) => state.workAndEdu
	)
	const dispatch = useDispatch()

	const addNewDependentHandler = (e) => {
		e.preventDefault()
		dispatch(newDependent(dependentInfo))
		setDependentInfo(initialState)
		setShowDependentModal(false)
	}
	const deleteDependentHandler = (id) => {
		console.log("relations delete id", id)
		dispatch(removeDependent(id))
	}
	const showDependentUpdateModalHandler = (id) => {
		const result = dependents.find((el) => el.id === id)
		const relationId = relationData.find(
			(el) => el.name === result.relationship
		)
		setDependentUpdateInfo({ ...result, relationship: relationId.id })
		setShowDependentUpdateModal(true)
		setEditId(id)
	}

	const dependentUpdateHandler = () => {
		dispatch(updateDependent({ id: editId, content: dependentUpdateInfo }))
		setEditId(null)
		setDependentUpdateInfo(initialState)
		setShowDependentUpdateModal(false)
	}

	useEffect(() => {
		dispatch(allDependents())
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
			<SectionHeader text="Add dependents details, modify or delete them">
				<Button onClick={() => setShowDependentModal(true)} Icon={HiPlus}>
					Add
				</Button>
				<RenderIf isTrue={showDependentModal}>
					<WrapperModal title="Add dependent" setShow={setShowDependentModal}>
						<form onSubmit={addNewDependentHandler}>
							<InputTag
								value={dependentInfo.name}
								onChange={(e) =>
									setDependentInfo((prev) => ({
										...prev,
										name: e.target.value,
									}))
								}
								type="text"
								Icon={HiLibrary}
								label="Name"
								placeholder="Enter name"
							/>
							<InputTag
								value={dependentInfo.date_of_birth}
								onChange={(e) =>
									setDependentInfo((prev) => ({
										...prev,
										date_of_birth: e.target.value,
									}))
								}
								type="date"
								Icon={HiAcademicCap}
								label="Date of birth"
								placeholder="Enter date of birth"
							/>
							<SelectTag
								value={dependentInfo.relationship}
								onChange={(e) =>
									setDependentInfo((prev) => ({
										...prev,
										relationship: e.target.value,
									}))
								}
								label="Relationship"
								content={relationData}
							/>
							<Button type="submit" Icon={HiPlus}>
								Add
							</Button>
						</form>
					</WrapperModal>
				</RenderIf>
				<RenderIf isTrue={showDependentUpdateModal}>
					<WrapperModal
						title="Update dependent"
						setShow={setShowDependentUpdateModal}
					>
						<form onSubmit={dependentUpdateHandler}>
							<InputTag
								value={dependentUpdateInfo.name}
								onChange={(e) =>
									setDependentUpdateInfo((prev) => ({
										...prev,
										name: e.target.value,
									}))
								}
								type="text"
								Icon={HiLibrary}
								label="Name"
								placeholder="Enter name"
							/>
							<InputTag
								value={dependentUpdateInfo.date_of_birth}
								onChange={(e) =>
									setDependentUpdateInfo((prev) => ({
										...prev,
										date_of_birth: e.target.value,
									}))
								}
								type="date"
								Icon={HiAcademicCap}
								label="Date of birth"
								placeholder="Enter date of birth"
							/>
							<SelectTag
								value={dependentUpdateInfo.relationship}
								onChange={(e) =>
									setDependentUpdateInfo((prev) => ({
										...prev,
										relationship: e.target.value,
									}))
								}
								label="Relationship"
								content={relationData}
							/>
							<Button type="submit" Icon={HiPlus}>
								Update
							</Button>
						</form>
					</WrapperModal>
				</RenderIf>
			</SectionHeader>
			{/* Work experience table */}
			<SubHeading>Dependents</SubHeading>

			<RenderIf isTrue={dependents && dependents.length > 0}>
				<DependentsTable
					content={dependents}
					rowsPerPage={5}
					_delete={deleteDependentHandler}
					update={showDependentUpdateModalHandler}
				/>
			</RenderIf>
			<RenderIf isTrue={dependents.length < 1}>
				<FadedText>Nothing found :(</FadedText>
			</RenderIf>
		</div>
	)
}

export default Dependent
