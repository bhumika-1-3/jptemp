import { SubHeading } from ".."
import { Droppable } from "react-beautiful-dnd"

const Board = ({ title, count, id, children }) => {
	return (
		<div className="border borderColor w-full h-full rounded-sm">
			<span className="mt-1 ml-2 block">
				<SubHeading>
					{title} <span className="ml-2 text-slate-400">{count}</span>
				</SubHeading>
			</span>
			<Droppable droppableId={id}>
				{(provided) => (
					<div
						className="bg-slate-200 p-3 grid gap-2"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{children}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	)
}

export default Board
