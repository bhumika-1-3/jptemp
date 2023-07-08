import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import {
	RenderIf,
	SectionHeader,
	Button,
	TransitionBtoT,
	NoteText,
} from "../../../../components"
import IndentsTable from "./IndentsTable"
import {
	fetchIndents,
	deleteIndent,
	toastReset,
} from "../../../../store/slices/inventory/inventory2Slice"
import { HiPlusCircle } from "react-icons/hi"

const Indents = () => {
	const { indents, showToast, message, success } = useSelector(
		(state) => state.inventory2
	)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const navigateToDetails = (id) => {
		navigate(`indent-details/${id}`)
	}

	const deleteHandler = (id) => {
		dispatch(deleteIndent(id))
		setTimeout(() => {
			dispatch(fetchIndents())
		}, 500)
	}

	useEffect(() => {
		dispatch(fetchIndents())
	}, [dispatch])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])
	return (
		<div>
			<SectionHeader text="All indents">
				<Button Icon={HiPlusCircle} onClick={() => navigate("add-indents")}>
					Add
				</Button>
			</SectionHeader>
			<RenderIf isTrue={indents && indents?.length > 0}>
				<TransitionBtoT>
					<NoteText>Click on product name to view details</NoteText>
					<div className="max-w-3xl">
						<IndentsTable
							content={indents}
							rowsPerPage={10}
							onClick={navigateToDetails}
							remove={deleteHandler}
						/>
					</div>
				</TransitionBtoT>
			</RenderIf>
		</div>
	)
}

export default Indents
