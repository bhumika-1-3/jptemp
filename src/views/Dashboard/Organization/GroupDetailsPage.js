import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { HiPlus, HiUserGroup, HiLockOpen } from "react-icons/hi"
import {
	allPermissions,
	toastReset,
	groupDetails,
	groupUsers,
	updateGroup,
	removeFromGroup,
} from "../../../store/slices/User/userSlice"
import {
	LoadingSpinner,
	BigText,
	CardSmall,
	Button,
	SectionHeader,
	SubHeading,
	RenderIf,
	FadedText,
	UserTable,
	WrapperModal,
	InputTag,
} from "../../../components"

const GroupDetailsPage = () => {
	const [showUpdateModal, setShowUpdateModal] = useState(false)
	const [selectedPermissions, setSelectedPermissions] = useState([])
	const [groupName, setGroupName] = useState("")
	const [groupUserId, setGroupUserId] = useState("")
	const [removeFromGroupModal, setRemoveFromGroupModal] = useState(false)
	const dispatch = useDispatch()
	const {
		permissions,
		isLoading,
		showToast,
		message,
		groupDetail,
		groupUsersList,
		success,
	} = useSelector((state) => state.user)
	const { groupID } = useParams()

	// Permission handler for group
	const permissionsHandler = (id, e) => {
		if (!selectedPermissions.includes(id)) {
			setSelectedPermissions((prev) => [...prev, id])
			return
		}
		if (selectedPermissions.includes(id) && !e.target.checked) {
			const newArr = selectedPermissions.filter((item) => item !== id)
			setSelectedPermissions(newArr)
		}
	}

	// Check handler function checks if group already has any permission and checks the checkbox of group permission modal
	let checkedHandler = (id) => {
		const res = groupDetail?.permissions?.find((item) => item.id === id)
		if (res) {
			return true
		}
		return false
	}

	// Update group handler actually make a request to server to update the group name or its permission
	const updateGroupHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateGroup({
				id: groupDetail.id,
				data: { name: groupName, permissions: selectedPermissions },
			})
		)
		setSelectedPermissions([])
		// setSelectedGroup("")
		setGroupName("")
	}

	const removeFromGroupHandler = () => {
		dispatch(removeFromGroup({ groupId: groupID, userId: groupUserId }))
		dispatch(groupUsers(groupID))
		setRemoveFromGroupModal(false)
	}

	const showRemoveFromGroupModalHandler = (id) => {
		setRemoveFromGroupModal(true)
		setGroupUserId(id)
	}
	const closeRemoveFromGroupModalHandler = () => {
		setRemoveFromGroupModal(false)
		setGroupUserId("")
	}

	useEffect(() => {
		dispatch(groupDetails(groupID))
		dispatch(groupUsers(groupID))
		dispatch(allPermissions())
	}, [dispatch, groupID])

	useEffect(() => {
		setGroupName(groupDetail?.name || "")
		if (groupDetail?.permissions)
			setSelectedPermissions(groupDetail.permissions.map((item) => item.id))
	}, [groupDetail.name, groupDetail.permissions])

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
			<SectionHeader text="Update group name, permissions and also view user in the group">
				<Button Icon={HiPlus} onClick={() => setShowUpdateModal(true)}>
					Update group permissions
				</Button>
			</SectionHeader>
			<BigText>Group details</BigText>

			<h4 className="text-slate-600 font-normal dark:text-slate-400 sm:-mt-5  mb-4">
				Group name:{" "}
				<span className="text-slate-800 dark:text-slate-200 font-medium  inline-block border-b-2 border-b-slate-400">
					{groupDetail?.name}
				</span>
			</h4>

			<SubHeading>Group permissions</SubHeading>
			<div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
				{groupDetail?.permissions?.map((item, idx) => (
					<CardSmall key={item?.id} idx={idx + 1} name={item?.name} />
				))}
			</div>
			<RenderIf isTrue={groupDetail && groupDetail?.permissions?.length < 1}>
				<FadedText>No permission found</FadedText>
			</RenderIf>

			<div className="mt-6 max-w-580-px">
				<SubHeading>Users in this group</SubHeading>
				<RenderIf isTrue={groupUsersList && groupUsersList?.users?.length > 0}>
					<UserTable
						rowsPerPage={5}
						content={groupUsersList?.users}
						onClick={showRemoveFromGroupModalHandler}
					/>
				</RenderIf>
				<RenderIf isTrue={groupUsersList && groupUsersList?.users?.length < 1}>
					<FadedText>No user found</FadedText>
				</RenderIf>
			</div>

			{/* Group update modal */}
			<RenderIf isTrue={showUpdateModal}>
				<WrapperModal title="Update group" setShow={setShowUpdateModal}>
					<form onSubmit={updateGroupHandler}>
						<div className="sm:w-2/4 w-full">
							<InputTag
								value={groupName}
								onChange={(e) => setGroupName(e.target.value)}
								label="Group name"
								Icon={HiUserGroup}
								placeholder="Updated group name"
							/>
						</div>
						<h4 className=" text-blueGray-600 text-sm font-normal mb-2 mt-6 flex items-center dark:text-slate-400">
							<HiLockOpen className="mr-2" />
							Permissions
						</h4>
						<div className="grid md:grid-cols-3 grid-cols-1 gap-4">
							{permissions.map((item) => (
								<div key={item.id}>
									<label className="flex items-center text-slate-600 dark:text-slate-300 text-md px-2 py-1 rounded-md shadow-cardShadow dark:bg-purple-900/20 cursor-pointer">
										<input
											defaultChecked={checkedHandler(item.id)}
											type="checkbox"
											onChange={(e) => permissionsHandler(item.id, e)}
											className="mr-2"
										/>
										{item.name}
									</label>
								</div>
							))}
						</div>
						<div className="mt-6">
							<Button type="submit">Update</Button>
						</div>
					</form>
				</WrapperModal>
			</RenderIf>

			{/* Add to group modal */}
			{removeFromGroupModal && (
				<WrapperModal title="Are you sure ?" setShow={setRemoveFromGroupModal}>
					<div className=" sm:flex sm:flex-row-reverse">
						<button
							onClick={removeFromGroupHandler}
							type="button"
							className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
						>
							Yes
						</button>
						<button
							onClick={closeRemoveFromGroupModalHandler}
							type="button"
							className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
						>
							No
						</button>
					</div>
				</WrapperModal>
			)}
		</div>
	)
}

export default GroupDetailsPage
