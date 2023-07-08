import { useNavigate } from "react-router"
import { FiArrowLeft } from "react-icons/fi"
import { TransitionBtoT } from ".."

const PageNotFound = () => {
	const navigate = useNavigate()
	return (
		<div className="h-screen w-full flex items-center justify-center bg-white px-7">
			<TransitionBtoT>
				<div className=" sm:text-8xl text-6xl text-black">
					<h2>Page Not Found!</h2>
					<h2
						onClick={() => navigate(-1)}
						className="cursor-pointer mt-4 flex items-center sm:text-6xl text-4xl underline hover:text-purple-700 duration-300"
					>
						<FiArrowLeft className="block mr-3 mt-2" />
						Go back
					</h2>
				</div>
			</TransitionBtoT>
		</div>
	)
}

export default PageNotFound
