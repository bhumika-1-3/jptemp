import { useReducer, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FaKey, FaEnvelope } from "react-icons/fa"
import {
	HiUser,
	HiUserGroup,
	HiUserAdd,
	HiCheckCircle,
	HiArrowCircleLeft,
	HiArrowCircleRight,
} from "react-icons/hi"
import { IoFootstepsSharp } from "react-icons/io5"
import { toast } from "react-toastify"
import {
	allDepartments,
	allEmployeeTypes,
	allDesignations,
	registerEmployee,
	toastReset,
	successReset,
} from "../../../store/slices/employee/employeeSlice"
import { allOrganization } from "../../../store/slices/organization/organizationSlice"
import {
	InputTag,
	Button,
	SelectTag,
	SectionHeader,
	LoadingSpinner,
	NoteText,
	RenderIf,
	SubHeading,
	TransitionBtoT,
	ChipsV2,
} from "../../../components"
import {
	employmentType,
	employmentStatus,
	sourceOfHiring,
} from "../../../data/data"

const initialEmployeeData = {
	email: "",
	first_name: "",
	last_name: "",
	password1: "",
	password2: "",
	department: "",
	designation: "",
	employee_type: "",
	employment_type: "",
	employment_status: "",
	source_of_hiring: "",
	newType: "",
}

const employeeReducer = (state, action) => {
	switch (action.type) {
		case "email":
			return { ...state, email: action.payload }
		case "first_name":
			return { ...state, first_name: action.payload }
		case "last_name":
			return { ...state, last_name: action.payload }
		case "password1":
			return { ...state, password1: action.payload }
		case "password2":
			return { ...state, password2: action.payload }
		case "department":
			return { ...state, department: action.payload }
		case "designation":
			return { ...state, designation: action.payload }
		case "organization":
			return { ...state, organization: action.payload }
		case "employee_type":
			return { ...state, employee_type: action.payload }
		case "employment_type":
			return { ...state, employment_type: action.payload }
		case "employment_status":
			return { ...state, employment_status: action.payload }
		case "source_of_hiring":
			return { ...state, source_of_hiring: action.payload }
		case "reset":
			return {
				email: "",
				first_name: "",
				last_name: "",
				password1: "",
				password2: "",
				department: "",
				designation: "",
				employee_type: "",
				employment_type: "",
				employment_status: "",
				source_of_hiring: "",
				organization: "",
			}
		default:
			return state
	}
}

const RegisterPage = () => {
	// State to determine current step of the form
	const [formStep, setFormStep] = useState(0)
	const [state, dispatch] = useReducer(employeeReducer, initialEmployeeData)
	const {
		isLoading,
		departments,
		designations,
		employeeTypes,
		message,
		showToast,
		success,
	} = useSelector((state) => state.employee)
	const { isLoading: orgIsLoading, organizations } = useSelector(
		(state) => state.organization
	)
	const employeeDispatch = useDispatch()

	const registerHandler = (e) => {
		e.preventDefault()
		employeeDispatch(registerEmployee(state))
		dispatch({ type: "reset" })
	}

	const completeFormStep = () => {
		setFormStep((prev) => prev + 1)
	}
	const prevFormStep = () => {
		setFormStep((prev) => prev - 1)
	}

	useEffect(() => {
		employeeDispatch(allDepartments())
		employeeDispatch(allEmployeeTypes())
		employeeDispatch(allDesignations())
		employeeDispatch(allOrganization())
	}, [employeeDispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		const timeout = setTimeout(() => {
			employeeDispatch(successReset())
			setFormStep(0)
		}, 10000)
		return () => {
			employeeDispatch(toastReset())
			clearTimeout(timeout)
		}
	}, [showToast, message, employeeDispatch, success])

	if (isLoading || orgIsLoading) {
		return <LoadingSpinner />
	}
	return (
		<div>
			<SectionHeader text="Register a new employee or view all employees" />
			<div className="flex justify-center w-full">
				<h2
					className={`font-light w-fit md:text-3xl text-2xl text-slate-700 dark:text-slate-200 sm:mt-8 sm:mb-8 mb-6 relative after:absolute after:w-1/3 after:rounded-3xl after:h-[2px] after:bg-slate-500 after:-bottom-2 after:left-[50%] after:right-[50%] after:translate-x-[-50%]`}
				>
					Register a new employee
				</h2>
			</div>
			{success && (
				<TransitionBtoT>
					<div className="px-7 py-6 mt-6 overflow-hidden rounded-md border borderColor bg-white dark:bg-purple_5 m-auto max-w-md flex flex-col items-center">
						<HiCheckCircle className="block h-24 w-24 mb-3 text-green-500" />
						<h2 className="text-4xl text-center text-slate-500 dark:text-slate-300">
							Succesfully registered!
						</h2>
					</div>
				</TransitionBtoT>
			)}
			{!success && (
				<div className="px-8 py-6 overflow-hidden rounded-xl border borderColor bg-[#f7f6f9] dark:bg-purple_5 m-auto max-w-lg">
					<ChipsV2
						classes="mb-2 border border-transparent dark:border-slate-50/[0.06]"
						Icon={IoFootstepsSharp}
					>
						Step{" "}
						<span className="font-bold text-sm ml-2">{formStep + 1}/4</span>
					</ChipsV2>
					{/* <h4 className="text-slate-400 text-base pl-1">
						Step <span className="font-bold">{formStep + 1}/4</span>
					</h4> */}
					<form onSubmit={registerHandler}>
						<div>
							{/* General */}
							<RenderIf isTrue={formStep === 0}>
								<TransitionBtoT>
									<SubHeading>General Info</SubHeading>
									<InputTag
										label="Email"
										type="email"
										placeholder="Enter email address"
										Icon={FaEnvelope}
										value={state?.email}
										onChange={(e) =>
											dispatch({ type: "email", payload: e.target.value })
										}
									/>

									<InputTag
										label="First Name"
										type="text"
										placeholder="Enter first name"
										Icon={HiUser}
										value={state?.first_name}
										onChange={(e) =>
											dispatch({ type: "first_name", payload: e.target.value })
										}
									/>
									<InputTag
										label="Last name"
										type="text"
										placeholder="Enter last name"
										Icon={HiUser}
										value={state?.last_name}
										onChange={(e) =>
											dispatch({ type: "last_name", payload: e.target.value })
										}
									/>
								</TransitionBtoT>
							</RenderIf>
							{/* Password */}
							<RenderIf isTrue={formStep === 1}>
								<TransitionBtoT>
									<SubHeading>Password</SubHeading>
									<InputTag
										label="Password"
										type="password"
										placeholder="Enter password"
										Icon={FaKey}
										value={state?.password1}
										onChange={(e) =>
											dispatch({ type: "password1", payload: e.target.value })
										}
									/>

									<InputTag
										label="Confirm password"
										type="password"
										placeholder="Enter password"
										Icon={FaKey}
										value={state?.password2}
										onChange={(e) =>
											dispatch({ type: "password2", payload: e.target.value })
										}
									/>
								</TransitionBtoT>
							</RenderIf>
							{/* Position */}
							<RenderIf isTrue={formStep === 2}>
								<TransitionBtoT>
									<SubHeading>Position</SubHeading>
									<SelectTag
										label="Organization"
										content={organizations || []}
										Icon={HiUserGroup}
										value={state?.organization}
										onChange={(e) =>
											dispatch({
												type: "organization",
												payload: e.target.value,
											})
										}
									/>
									<SelectTag
										label="Department"
										content={departments || []}
										Icon={HiUserGroup}
										value={state?.department}
										onChange={(e) =>
											dispatch({ type: "department", payload: e.target.value })
										}
									/>

									<SelectTag
										label="Designation"
										content={designations || []}
										Icon={HiUserGroup}
										value={state?.designation}
										onChange={(e) =>
											dispatch({ type: "designation", payload: e.target.value })
										}
									/>

									<SelectTag
										label="Type"
										content={employeeTypes || []}
										Icon={HiUserGroup}
										value={state?.employee_type}
										onChange={(e) =>
											dispatch({
												type: "employee_type",
												payload: e.target.value,
											})
										}
									/>
								</TransitionBtoT>
							</RenderIf>
							{/* Employement */}
							<RenderIf isTrue={formStep === 3}>
								<TransitionBtoT>
									<SubHeading>Employement Info</SubHeading>
									<SelectTag
										label="Employment type"
										content={employmentType || []}
										Icon={HiUserGroup}
										value={state?.employment_type}
										onChange={(e) =>
											dispatch({
												type: "employment_type",
												payload: e.target.value,
											})
										}
									/>

									<SelectTag
										label="Employment status"
										content={employmentStatus || []}
										Icon={HiUserGroup}
										value={state?.employment_status}
										onChange={(e) =>
											dispatch({
												type: "employment_status",
												payload: e.target.value,
											})
										}
									/>

									<SelectTag
										label="Source of hiring"
										content={sourceOfHiring || []}
										Icon={HiUserGroup}
										value={state?.source_of_hiring}
										onChange={(e) =>
											dispatch({
												type: "source_of_hiring",
												payload: e.target.value,
											})
										}
									/>
								</TransitionBtoT>
							</RenderIf>
							<NoteText>
								<span className="text-red-500 font-extrabold ml-1 text-md">
									*
								</span>{" "}
								section is required to fill
							</NoteText>
							<span className="block mt-6">
								{formStep === 3 && (
									<div className="flex items-center">
										<Button onClick={prevFormStep} Icon={HiArrowCircleLeft}>
											Prev
										</Button>
										<Button type="submit" Icon={HiUserAdd}>
											Register
										</Button>
									</div>
								)}
								{formStep < 3 && (
									<>
										{formStep > 0 && (
											<Button onClick={prevFormStep} Icon={HiArrowCircleLeft}>
												Prev
											</Button>
										)}
										<Button
											onClick={completeFormStep}
											Icon={HiArrowCircleRight}
										>
											Continue
										</Button>
									</>
								)}
							</span>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}

export default RegisterPage
