import { useState } from "react"
import { HiPlus } from "react-icons/hi"
import { DragDropContext } from "react-beautiful-dnd"
import {
	Board,
	CardKanban,
	Modal,
	Button,
	SectionHeader,
} from "../../../components"

const kanbanData = {
	todo: {
		boardName: "todo",
		tasks: ["a", "b", "c", "d"],
	},
	inProgress: {
		boardName: "inPorgress",
		tasks: ["Still working on it", "doing homework", "working on a project"],
	},
	finished: {
		boardName: "finished",
		tasks: ["This task is done"],
	},
}

const Kanban = () => {
	const [kanban, setKanban] = useState(kanbanData)

	const handleSource = (result) => {
		if (!result.destination) return
		switch (result.source.droppableId) {
			case "todo":
				const todoItems = Array.from(kanban.todo.tasks)
				const [reorderedTodoItem] = todoItems.splice(result.source.index, 1)
				setKanban((prev) => ({
					...prev,
					todo: { ...prev.todo, tasks: todoItems },
				}))
				handleDestination(result, reorderedTodoItem)
				return
			case "inProgress":
				const inProgressitems = Array.from(kanban.inProgress.tasks)
				const [reorderedInProgressItem] = inProgressitems.splice(
					result.source.index,
					1
				)
				setKanban((prev) => ({
					...prev,
					inProgress: { ...prev.inProgress, tasks: inProgressitems },
				}))
				handleDestination(result, reorderedInProgressItem)
				return
			case "finished":
				const finishedItems = Array.from(kanban.finished.tasks)
				const [reorderedFinishedItem] = finishedItems.splice(
					result.source.index,
					1
				)
				setKanban((prev) => ({
					...prev,
					finished: { ...prev.finished, tasks: finishedItems },
				}))
				handleDestination(result, reorderedFinishedItem)
				return
			default:
				return
		}
	}
	const handleDestination = (result, valueToDrop) => {
		if (!result.destination) return
		console.log("result", result)
		switch (result.destination.droppableId) {
			case "todo":
				const todoItems = Array.from(kanban.todo.tasks)
				todoItems.splice(result.destination.index, 0, valueToDrop)
				setKanban((prev) => ({
					...prev,
					todo: { ...prev.todo, tasks: todoItems },
				}))
				return
			case "inProgress":
				const inProgressitems = Array.from(kanban.inProgress.tasks)
				inProgressitems.splice(result.destination.index, 0, valueToDrop)
				setKanban((prev) => ({
					...prev,
					inProgress: { ...prev.inProgress, tasks: inProgressitems },
				}))
				return
			case "finished":
				const finishedItems = Array.from(kanban.finished.tasks)
				finishedItems.splice(result.destination.index, 0, valueToDrop)
				setKanban((prev) => ({
					...prev,
					finished: { ...prev.finished, tasks: finishedItems },
				}))
				return
			default:
				return
		}
	}

	const handleOnDragEnd = (result) => {
		handleSource(result)
		// setDragResult(result)
		// handleDestination(result)
	}

	// useEffect(() => {
	// 	if (dragResult !== null) {
	// 		handleDestination(dragResult)
	// 	}
	// }, [dragResult])

	return (
		<div>
			<SectionHeader text="Manages you daily tasks">
				<Modal
					title="Add new bank"
					activator={({ setShow }) => (
						<Button Icon={HiPlus} onClick={() => setShow(true)}>
							Add
						</Button>
					)}
				>
					Add new task
				</Modal>
			</SectionHeader>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<div className="w-full grid grid-cols-3 gap-3">
					<Board title="Todo" count={kanban.todo.tasks.length} id="todo">
						{kanban.todo.tasks.map((item, idx) => (
							<CardKanban id={idx} idx={idx}>
								{item}
							</CardKanban>
						))}
					</Board>
					<Board
						title="In progress"
						count={kanban.inProgress.tasks.length}
						id="inProgress"
					>
						{kanban.inProgress.tasks.map((item, idx) => (
							<CardKanban id={idx + 50} idx={idx}>
								{item}
							</CardKanban>
						))}
					</Board>
					<Board
						title="Finished"
						count={kanban.finished.tasks.length}
						id="finished"
					>
						{kanban.finished.tasks.map((item, idx) => (
							<CardKanban id={idx + 40} idx={idx}>
								{item}
							</CardKanban>
						))}
					</Board>
				</div>
			</DragDropContext>
		</div>
	)
}

export default Kanban
