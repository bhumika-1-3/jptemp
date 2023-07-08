import React from "react"

// components

export default function CardProfile({ data }) {
	const {
		first_name,
		middle_name,
		last__name,
		email,
		username,
		phone,
		image,
		gender,
		date_of_birth,
		blood_group,
		type,
		department,
		designation,
	} = data
	return (
		<>
			<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
				<div className="px-6">
					<div className="flex flex-wrap justify-center">
						<div className="w-full px-4 flex justify-center">
							<div className="relative">
								<img
									alt="..."
									src={image}
									className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 max-w-150-px"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="text-left mt-12 p-8">
						<h3 className="text-xl font-semibold text-blueGray-700">
							{first_name + " " + (middle_name ? middle_name : "") + last__name}
						</h3>
						<div className="mb-2 text-blueGray-600 mt-10">
							{/* <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i> */}
							<span className="font-semibold mr-3">Email:</span>
							{email}
						</div>
						<div className="mb-2 text-blueGray-600">
							{/* <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i> */}
							<span className="font-semibold mr-3">Username:</span>
							{username}
						</div>
						<div className="mb-2 text-blueGray-600">
							{/* <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i> */}
							<span className="font-semibold mr-3">Phone:</span>
							{phone}
						</div>
						<div className="mb-2 text-blueGray-600">
							{/* <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i> */}
							<span className="font-semibold mr-3">Gender:</span>
							{gender}
						</div>
						<div className="mb-2 text-blueGray-600">
							{/* <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i> */}
							<span className="font-semibold mr-3">DOB:</span>
							{date_of_birth}
						</div>
						<div className="mb-2 text-blueGray-600">
							{/* <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i> */}
							<span className="font-semibold mr-3">Blood group:</span>
							{blood_group}
						</div>
						<div className="mb-2 text-blueGray-600">
							{/* <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i> */}
							<span className="font-semibold mr-3">Type:</span> {type}
						</div>
						<div className="mb-2 text-blueGray-600">
							{/* <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i> */}
							<span className="font-semibold mr-3">Department:</span>
							{department}
						</div>
						<div className="mb-2 text-blueGray-600">
							{/* <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i> */}
							<span className="font-semibold mr-3">Designation:</span>
							{designation}
						</div>
					</div>
					{/* <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
						<div className="flex flex-wrap justify-center">
							<div className="w-full lg:w-9/12 px-4">
								<p className="mb-4 text-lg leading-relaxed text-blueGray-700">
									An artist of considerable range, Jenna the name taken by
									Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
									and records all of his own music, giving it a warm, intimate
									feel with a solid groove structure. An artist of considerable
									range.
								</p>
								<a
									href="#pablo"
									className="font-normal text-lightBlue-500"
									onClick={(e) => e.preventDefault()}
								>
									Show more
								</a>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</>
	)
}
