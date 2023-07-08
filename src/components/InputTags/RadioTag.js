import React from "react"

const RadioTag = ({ label, onChange, Icon, content }) => {
	return (
		<div className="w-full">
			<div className="relative w-full mb-3">
				<div className="text-slate-700 dark:text-slate-300 text-sm font-normal mb-2 flex items-center">
					{Icon && <Icon className="mr-2" />}
					{label}
				</div>
				{content?.map((item) => (
					<label
						key={item.id}
						className="mx-1 text-sm font-semibold text-slate-700 cursor-pointer dark:text-slate-300"
					>
						{item.name}
						<input
							type="radio"
							value={item.value}
							onChange={onChange}
							name={label}
							className="ml-1 dark:bg-slate-600"
						/>
					</label>
				))}
			</div>
		</div>
	)
}

export default RadioTag
