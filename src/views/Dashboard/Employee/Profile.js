import { useEffect } from "react"
import { HiMail, HiPhone, HiCalendar } from "react-icons/hi"
import { TbFriends } from "react-icons/tb"
import { IoWater } from "react-icons/io5"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { SubHeading, LoadingSpinner, RenderIf } from "../../../components"
import {
	employeeProfile,
	toastReset,
} from "../../../store/slices/employee/employeeSlice"

const Profile = () => {
	const { isLoading, profile, showToast, message, success } = useSelector(
		(state) => state.employee
	)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(employeeProfile())
	}, [dispatch])
	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])

	if (isLoading && profile) {
		return <LoadingSpinner />
	}
	return (
		<>
			<div className="">
				<div className="w-full bg-gray-100 dark:bg-purple_5 p-6 mt-5 rounded-xl overflow-hidden">
					<div className="flex sm:flex-row flex-col">
						<RenderIf isTrue={profile}>
							<div className="w-[200px] h-[230px] overflow-hidden rounded-lg sm:mr-4 shadow-md">
								<img
									className="w-full object-cover h-full"
									src={
										profile?.image ||
										"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
									}
									alt="profile"
								/>
							</div>
						</RenderIf>
						<div className="sm:mt-0 mt-6">
							<h2 className="text-2xl font-medium text-slate-700 dark:text-slate-200 flex items-center mb-2">
								<RenderIf isTrue={profile}>
									{/* <HiOutlineUser className="mr-2" /> */}
									{(profile?.first_name || "") +
										" " +
										(profile?.middle_name || "") +
										" " +
										(profile?.last_name || "")}
								</RenderIf>
							</h2>

							<p className="flex items-center text-slate-500 dark:text-slate-300">
								{profile?.email && <HiMail className="mr-2" />}
								{profile?.email}
							</p>
							<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
								{!profile?.phone && <HiPhone className="mr-2" />}
								{profile?.phone} 984563728
							</p>
							{!profile?.date_of_birth && (
								<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
									{!profile?.date_of_birth && <HiCalendar className="mr-2" />}
									DOB:
									<span className="font-semibold ml-1">
										{profile?.date_of_birth} 02-01-2000
									</span>
								</p>
							)}
							{profile?.gender && (
								<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
									{profile?.gender && <TbFriends className="mr-2" />}
									Gender:
									<span className="font-semibold ml-1">
										{profile?.gender}
									</span>{" "}
								</p>
							)}
							{!profile?.blood_group && (
								<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
									{!profile?.blood_group && <IoWater className="mr-2" />}
									Blood group:
									<span className="font-semibold ml-1">
										{profile?.blood_group} O positive
									</span>{" "}
								</p>
							)}
						</div>
					</div>
					<div className="mt-5">
						<SubHeading>Professional Information</SubHeading>
						<div className="grid sm:grid-cols-2 max-w-xl grid-cols-1 gap-4">
							<div className="sm:border-r sm:border-b-0 sm:pb-0 pb-4 border-b borderColor">
								{profile?.employee_type?.name && (
									<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
										Employee type:
										<span className="font-semibold ml-1">
											{profile?.employee_type?.name}
										</span>{" "}
									</p>
								)}
								{profile?.department?.name && (
									<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
										Department:
										<span className="font-semibold ml-1">
											{profile?.department?.name}
										</span>{" "}
									</p>
								)}
								{profile?.designation?.name && (
									<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
										Designation:
										<span className="font-semibold ml-1">
											{profile?.designation?.name}
										</span>{" "}
									</p>
								)}
								{profile?.organization?.name && (
									<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
										Organization:
										<span className="font-semibold ml-1">
											{profile?.organization?.name}
										</span>{" "}
									</p>
								)}
								{profile?.date_joined && (
									<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
										Date joined:
										<span className="font-semibold ml-1">
											{profile?.date_joined &&
												new Date(profile?.date_joined).toDateString()}
										</span>{" "}
									</p>
								)}
							</div>
							<div className="sm:pl-2">
								{profile?.employment_type && (
									<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
										Employment type:
										<span className="font-semibold ml-1">
											{profile?.employment_type}
										</span>{" "}
									</p>
								)}
								{profile?.employment_status && (
									<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
										Employment status:
										<span className="font-semibold ml-1">
											{profile?.employment_status}
										</span>{" "}
									</p>
								)}
								{profile?.source_of_hiring && (
									<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
										Source of hiring:
										<span className="font-semibold ml-1">
											{profile?.source_of_hiring}
										</span>{" "}
									</p>
								)}
								{profile?.leave_days && (
									<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
										Leave days:
										<span className="font-semibold ml-1">
											{profile?.leave_days}
										</span>{" "}
									</p>
								)}
								{profile?.sick_days && (
									<p className="flex items-center text-slate-500 dark:text-slate-300 mt-[2px]">
										Sick days:
										<span className="font-semibold ml-1">
											{profile?.sick_days}
										</span>{" "}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
