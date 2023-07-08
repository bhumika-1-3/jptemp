const KanbanCardPopup = ({ edit }) => {
	return (
		<div className="max-w-100-px w-full py-1 bg-white rounded shadow-xl border borderColor dark:bg-purple_5 ">
			<button className="block w-full text-left bg-transparent px-3 text-slate-700 dark:text-slate-200 font-normal text-base hover:text-slate-200 hover:bg-slate-900">
				Edit
			</button>
			<button className="block w-full text-left bg-transparent px-3 text-red-400  font-normal text-base hover:bg-slate-900">
				Delete
			</button>
		</div>
	)
}

export default KanbanCardPopup
