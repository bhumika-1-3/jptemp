import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	HiOutlineDocumentAdd,
	HiOutlineDocument,
	HiOutlineUpload,
} from "react-icons/hi"
import { toast } from "react-toastify"
import {
	InputTag,
	Button,
	SelectTag,
	DocumentCard,
	SectionHeader,
	SubHeading,
	RenderIf,
	Modal,
	LoadingSpinner,
	TransitionBtoT,
} from "../../../components"
import {
	allEmployeeDocuments,
	allDocumentTypes,
	addDocuments,
	toastReset,
} from "../../../store/slices/employee/employeeSlice"

const Documents = () => {
	const [docType, setDocType] = useState("")
	const [img, setImg] = useState({})

	const {
		isLoading,
		documentTypes,
		employeeDocs,
		showToast,
		message,
		success,
	} = useSelector((state) => state.employee)
	const dispatch = useDispatch()

	const submitDocHandler = (e) => {
		e.preventDefault()
		let form_data = new FormData()
		form_data.append("document_type", docType)
		form_data.append("file", img)
		dispatch(addDocuments(form_data))
	}

	useEffect(() => {
		dispatch(allEmployeeDocuments())
		dispatch(allDocumentTypes())
	}, [dispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	// useEffect(() => {
	// 	if (showToast) {
	// 		toast(message)
	// 	}
	// 	return () => dispatch(toastReset())
	// }, [showToast, message, dispatch])

	if (isLoading) {
		return <LoadingSpinner />
	}

	return (
		<div>
			<div>
				<SectionHeader text="View all you documents">
					<Modal
						title="Upload your documents"
						activator={({ setShow }) => (
							<Button onClick={() => setShow(true)} Icon={HiOutlineUpload}>
								Add
							</Button>
						)}
					>
						<form onSubmit={submitDocHandler}>
							<SelectTag
								label="Document type"
								Icon={HiOutlineDocument}
								value={docType}
								onChange={(e) => setDocType(e.target.value)}
								content={documentTypes}
							/>
							<InputTag
								value=""
								type="file"
								label="Documents"
								Icon={HiOutlineDocumentAdd}
								onChange={(e) => setImg(e.target.files[0])}
								notRequired
							/>
							<div className="mt-4">
								<Button type="submit" Icon={HiOutlineUpload}>
									Upload
								</Button>
							</div>
						</form>
					</Modal>
				</SectionHeader>
				<SubHeading>All documents</SubHeading>
				<div>
					<RenderIf isTrue={employeeDocs.length < 1}>
						<h2 className="text-4xl text-slate-300 font-semibold dark:text-slate-600">
							:( Sorry
							<br />
							There is nothing to show here <br />
							Try uploading some documents
						</h2>
					</RenderIf>
					<RenderIf isTrue={employeeDocs.length > 0}>
						<div className="wi-full grid lg:grid-cols-4 sm:grid-cols-3 gap-4 sm:justify-start justify-center">
							{employeeDocs.map((item, idx) => (
								<TransitionBtoT>
									<DocumentCard key={item.id} data={item} idx={idx} />
								</TransitionBtoT>
							))}
						</div>
					</RenderIf>
				</div>
			</div>
		</div>
	)
}

export default Documents
