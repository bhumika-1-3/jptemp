import { useEffect, useState, useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HiOutlineUser, HiPhotograph, HiSave, HiKey } from "react-icons/hi"
import {
	InputTag,
	SubHeading,
	SelectTag,
	LoadingSpinner,
	RenderIf,
	Button,
	Modal,
} from "../../../components"
import {
	updateEmployeerProfileAdmin,
	changePassword,
} from "../../../store/slices/User/userSlice"
import {
	allEmployeeTypes,
	allDepartments,
	allDesignations,
} from "../../../store/slices/employee/employeeSlice"
import {
	bloodGroupList,
	gender as genderList,
	employmentType,
	employmentStatus,
	sourceOfHiring,
} from "../../../data/data"

const initialState = {
	employee_code: "",
	first_name: "",
	middle_name: "",
	last_name: "",
	email: "",
	username: "",
	phone: "",
	gender: "",
	// image: "",
	date_of_birth: "",
	blood_group: "",
	employee_type: "",
	department: "",
	designation: "",
	employment_type: "",
	employment_status: "",
	source_of_hiring: "",
	leave_days: "",
	sick_days: "",
	is_overtime_allowed: "",
	is_active: "",
	is_verified: "",
}

const employeeReducer = (state, action) => {
	switch (action.type) {
		case "employee_code":
			return { ...state, employee_code: action.payload }
		case "first_name":
			return { ...state, first_name: action.payload }
		case "middle_name":
			return { ...state, middle_name: action.payload }
		case "last_name":
			return { ...state, last_name: action.payload }
		case "email":
			return { ...state, email: action.payload }
		case "username":
			return { ...state, username: action.payload }
		case "phone":
			return { ...state, phone: action.payload }
		case "gender":
			return { ...state, gender: action.payload }
		// case "image":
		// 	return { ...state, image: action.payload }
		case "date_of_birth":
			return { ...state, date_of_birth: action.payload }
		case "blood_group":
			return { ...state, blood_group: action.payload }
		case "employee_type":
			return { ...state, employee_type: action.payload }
		case "department":
			return { ...state, department: action.payload }
		case "designation":
			return { ...state, designation: action.payload }
		case "employment_type":
			return { ...state, employment_type: action.payload }
		case "employment_status":
			return { ...state, employment_status: action.payload }
		case "source_of_hiring":
			return { ...state, source_of_hiring: action.payload }
		case "leave_days":
			return { ...state, source_of_hiring: action.payload }
		case "sick_days":
			return { ...state, source_of_hiring: action.payload }
		case "is_overtime_allowed":
			return { ...state, source_of_hiring: action.payload }
		case "is_active":
			return { ...state, source_of_hiring: action.payload }
		case "is_verified":
			return { ...state, source_of_hiring: action.payload }
		case "set__all":
			return { ...action.payload }
		default:
			return state
	}
}

const EmployeeProfileAdmin = () => {
	const [profileImg, setProfileImg] = useState(null)
	const [passwordChangeInfo, setPasswordChangeInfo] = useState({
		password1: "",
		password2: "",
	})
	const [state, profileDispatch] = useReducer(employeeReducer, initialState)
	const { employeeProfile, isLoading } = useSelector((state) => state.user)
	const {
		employeeTypes,
		departments,
		designations,
		// isLoading: employeeIsLoading,
	} = useSelector((state) => state.employee)
	const dispatch = useDispatch()
	// console.log("user profile => ", employeeProfile)
	// console.log("user profile local state => ", state)
	// console.log("profile image", profileImg && profileImg)
	const profileUpdateHandler = (e) => {
		e.preventDefault()
		let form_data = new FormData()

		form_data.append("employee_code", state.employee_code)
		form_data.append("first_name", state.first_name)

		form_data.append("middle_name", state.middle_name)
		form_data.append("last_name", state.last_name)
		form_data.append("email", state.email)
		form_data.append("username", state.username)
		form_data.append("phone", state.phone)
		form_data.append("gender", state.gender)
		if (!employeeProfile?.image && profileImg) {
			console.log("profile image in form daata", profileImg[0])
			form_data.append("image", profileImg[0])
		}

		state.date_of_birth &&
			form_data.append("date_of_birth", state.date_of_birth)
		form_data.append("blood_group", state.blood_group)

		form_data.append("employee_type", state.employee_type)
		form_data.append("department", state.department)
		form_data.append("designation", state.designation)

		form_data.append("employment_type", state.employment_type)

		form_data.append("employment_status", state.employment_status)

		form_data.append("source_of_hiring", state.source_of_hiring)
		form_data.append("leave_days", state.leave_days)
		form_data.append("sick_days", state.sick_days)
		form_data.append("is_overtime_allowed", state.is_overtime_allowed)
		form_data.append("is_active", state.is_active)
		form_data.append("is_verified", state.is_verified)

		dispatch(
			updateEmployeerProfileAdmin({
				id: employeeProfile?.id,
				content: form_data,
			})
		)
	}
	console.log("emp state", state)
	const passwordResetHandler = (e) => {
		e.preventDefault()
		dispatch(
			changePassword({ id: employeeProfile?.id, content: passwordChangeInfo })
		)
	}

	useEffect(() => {
		if (employeeProfile) {
			profileDispatch({
				type: "set__all",
				payload: {
					employee_code: employeeProfile?.employee_code || "",
					first_name: employeeProfile?.first_name || null,
					middle_name: employeeProfile?.middle_name || null,
					last_name: employeeProfile?.last_name || null,
					email: employeeProfile?.email || null,
					username: employeeProfile?.username || "",
					phone: employeeProfile?.phone || "",
					gender: genderList?.find(
						(item) => item.name === employeeProfile?.gender
					)?.id,
					date_of_birth: employeeProfile?.date_of_birth || "",
					blood_group: bloodGroupList?.find(
						(item) => item.name === employeeProfile?.blood_group
					)?.id,
					employee_type: employeeProfile?.employee_type?.id || "",
					department: employeeProfile?.department?.id || "",
					designation: employeeProfile?.designation?.id || "",
					employment_type:
						employmentType?.find(
							(item) => item.name === employeeProfile?.employment_type
						)?.id || "",
					employment_status:
						employmentStatus?.find(
							(item) => item.name === employeeProfile?.employment_status
						)?.id || "0",
					source_of_hiring:
						sourceOfHiring?.find(
							(item) => item.name === employeeProfile?.source_of_hiring
						)?.id || "0",
					leave_days: employeeProfile?.leave_days || null,
					sick_days: employeeProfile?.sick_days || null,
					is_overtime_allowed: employeeProfile?.is_overtime_allowed,
					is_active: employeeProfile?.is_active,
					is_verified: employeeProfile?.is_verified,
				},
			})
		}
	}, [profileDispatch, employeeProfile])

	useEffect(() => {
		dispatch(allEmployeeTypes())
		dispatch(allDepartments())
		dispatch(allDesignations())
	}, [dispatch])

	return (
		<div className="bg-gray-100 dark:bg-purple_5 p-6 mt-5 rounded-xl overflow-hidden">
			{isLoading && <LoadingSpinner />}
			<div className="sm:flex sm:justify-between">
				<h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 flex items-center">
					<RenderIf isTrue={employeeProfile}>
						<HiOutlineUser className="mr-2" />
						{(employeeProfile?.first_name || "") +
							" " +
							(employeeProfile?.middle_name || "") +
							" " +
							(employeeProfile?.last_name || "")}
					</RenderIf>
				</h2>
				<Modal
					title="Change password"
					activator={({ setShow }) => (
						<Button Icon={HiKey} onClick={() => setShow(true)}>
							Change password
						</Button>
					)}
				>
					<form onSubmit={passwordResetHandler}>
						<InputTag
							value={passwordChangeInfo.password1}
							onChange={(e) =>
								setPasswordChangeInfo((prev) => ({
									...prev,
									password1: e.target.value,
								}))
							}
							type="text"
							label="Password"
							placeholder="Enter password"
						/>
						<InputTag
							value={passwordChangeInfo.password2}
							onChange={(e) =>
								setPasswordChangeInfo((prev) => ({
									...prev,
									password2: e.target.value,
								}))
							}
							type="text"
							label="Confirm password"
							placeholder="Confirm password"
						/>
						<Button type="submit">Change</Button>
					</form>
				</Modal>
			</div>

			<RenderIf isTrue={employeeProfile}>
				<div className="w-[200px] h-[230px] overflow-hidden rounded-lg mt-6 shadow-md">
					<img
						className="w-full object-cover h-full"
						src={
							employeeProfile?.image ||
							"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
						}
						alt="profile"
					/>
				</div>
				<label
					className="bg-white dark:bg-purple_1 dark:text-slate-200 border-none px-2 py-1 rounded-lg cursor-pointer duration-300 hover:bg-slate-100 shadow-md mt-6 flex items-center w-fit text-sm"
					htmlFor="profile-picture"
				>
					<HiPhotograph className="mr-2" />
					{profileImg && profileImg[0]
						? profileImg[0]?.name
						: "Change profile picture"}
				</label>
				<input
					className="hidden"
					onChange={(e) => setProfileImg(e.target.files)}
					id="profile-picture"
					type="file"
				/>
			</RenderIf>
			<form
				className="mt-6"
				onSubmit={profileUpdateHandler}
				encType="multipart/form-data"
			>
				<SubHeading>Personal Information</SubHeading>
				<div className="grid gap-x-4 md:grid-cols-3">
					<InputTag
						value={state.first_name}
						onChange={(e) =>
							profileDispatch({ type: "first_name", payload: e.target.value })
						}
						label="First name"
						placeholder="Enter employees first name"
						type="text"
						notRequired
						bgWhite
					/>
					<InputTag
						value={state.middle_name}
						onChange={(e) =>
							profileDispatch({ type: "middle_name", payload: e.target.value })
						}
						label="Middle name"
						placeholder="Enter employees middle name"
						type="text"
						notRequired
						bgWhite
					/>
					<InputTag
						value={state.last_name}
						onChange={(e) =>
							profileDispatch({ type: "last_name", payload: e.target.value })
						}
						label="Last name"
						placeholder="Enter employees last name"
						type="text"
						notRequired
						bgWhite
					/>
					<InputTag
						value={state.email}
						onChange={(e) =>
							profileDispatch({ type: "email", payload: e.target.value })
						}
						label="Email"
						placeholder="Enter email address"
						type="email"
						notRequired
						bgWhite
					/>
					<InputTag
						value={state.username}
						onChange={(e) =>
							profileDispatch({ type: "username", payload: e.target.value })
						}
						label="Username"
						placeholder="Enter username"
						type="text"
						bgWhite
					/>
					<InputTag
						value={state.phone}
						onChange={(e) =>
							profileDispatch({ type: "phone", payload: e.target.value })
						}
						label="Phone"
						placeholder="Enter phone no."
						type="text"
						bgWhite
					/>
					<SelectTag
						value={state.gender}
						onChange={(e) =>
							profileDispatch({ type: "gender", payload: e.target.value })
						}
						label="Gender"
						content={genderList}
						bgWhite
					/>
					<InputTag
						value={state.date_of_birth}
						onChange={(e) =>
							profileDispatch({
								type: "date_of_birth",
								payload: e.target.value,
							})
						}
						label="Date of birth"
						placeholder="Enter date birth"
						type="date"
						bgWhite
					/>
					<SelectTag
						value={state.blood_group}
						onChange={(e) =>
							profileDispatch({ type: "blood_group", payload: e.target.value })
						}
						label="Blood group"
						content={bloodGroupList}
						notRequired
						bgWhite
					/>
				</div>
				<SubHeading>Professional Information</SubHeading>
				<div className="grid gap-x-4 md:grid-cols-3">
					<SelectTag
						value={state.employee_type}
						onChange={(e) =>
							profileDispatch({
								type: "employee_type",
								payload: e.target.value,
							})
						}
						label="Employee type"
						content={employeeTypes ? employeeTypes : []}
						notRequired
						bgWhite
					/>
					<SelectTag
						value={state.department}
						onChange={(e) =>
							profileDispatch({ type: "department", payload: e.target.value })
						}
						label="Departments"
						content={departments ? departments : []}
						notRequired
						bgWhite
					/>
					<SelectTag
						value={state.designation}
						onChange={(e) =>
							profileDispatch({ type: "designation", payload: e.target.value })
						}
						label="Designations"
						content={designations ? designations : []}
						notRequired
						bgWhite
					/>
					<SelectTag
						value={state.employment_type}
						onChange={(e) =>
							profileDispatch({
								type: "employment_type",
								payload: e.target.value,
							})
						}
						label="Employement type"
						content={employmentType}
						notRequired
						bgWhite
					/>
					<SelectTag
						value={state.employment_status}
						onChange={(e) =>
							profileDispatch({
								type: "employment_status",
								payload: e.target.value,
							})
						}
						label="Employement status"
						content={employmentStatus}
						notRequired
						bgWhite
					/>
					<SelectTag
						value={state.source_of_hiring}
						onChange={(e) =>
							profileDispatch({
								type: "source_of_hiring",
								payload: e.target.value,
							})
						}
						label="Source of hiring"
						content={sourceOfHiring}
						notRequired
						bgWhite
					/>
					<InputTag
						value={state?.leave_days}
						onChange={(e) =>
							profileDispatch({ type: "leave_days", payload: e.target.value })
						}
						type="number"
						label="Leave days"
						placeholder="Leave days"
						notRequired
						bgWhite
					/>
					<InputTag
						value={state?.sick_days}
						onChange={(e) =>
							profileDispatch({ type: "sick_days", payload: e.target.value })
						}
						type="number"
						label="Sick days"
						placeholder="Sick days"
						notRequired
						bgWhite
					/>
					<InputTag
						value={state?.employee_code}
						onChange={(e) =>
							profileDispatch({
								type: "employee_code",
								payload: e.target.value,
							})
						}
						type="text"
						label="Employee code"
						placeholder="Employee Code"
						notRequired
						bgWhite
					/>
				</div>
				<button
					className="rounded-lg py-2 px-4 bg-slate-400 dark:bg-slate-600 dark:hover:bg-purple-700 hover:bg-purple-500 duration-300 text-slate-100 text-xl mt-5 flex items-center"
					type="Submit"
				>
					<HiSave className="mr-2" />
					Save
				</button>
			</form>
		</div>
	)
}

export default EmployeeProfileAdmin
