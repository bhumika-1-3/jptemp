import { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { usePopper } from "react-popper"
import { createPortal } from "react-dom"
import { HiDotsHorizontal } from "react-icons/hi"
import { KanbanCardPopup } from ".."

const CardKanban = ({ id, idx, children }) => {
	const [referenceElement, setReferenceElement] = useState(null)
	const [popperElement, setPopperElement] = useState(null)
	const [showPopup, setShowPopup] = useState(false)
	const { styles, attributes } = usePopper(referenceElement, popperElement)

	return (
		<Draggable draggableId={String(id + 1000)} index={idx}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					className="bg-white w-full p-2 flex items-center justify-between rounded-sm overflow-hidden"
				>
					<p className="text-slate-700">{children}</p>

					<div
						ref={setReferenceElement}
						onClick={() => setShowPopup((prev) => !prev)}
					>
						<HiDotsHorizontal className="w-5 h-5 text-slate-400 hover:text-slate-700 cursor-pointer" />
					</div>
					{showPopup &&
						createPortal(
							<div
								ref={setPopperElement}
								style={styles.popper}
								{...attributes.popper}
							>
								<KanbanCardPopup />
							</div>,
							document.getElementById("modal-portal")
						)}
				</div>
			)}
		</Draggable>
	)
}

export default CardKanban
