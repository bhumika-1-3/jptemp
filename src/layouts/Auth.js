import React from "react"
import { Outlet } from "react-router-dom"

// components
import { AuthNavbar } from "../components"

// Images
// import bgImg from "../assets/img/register_bg_2.png"

export default function Auth() {
	return (
		<>
			<AuthNavbar transparent />
			<main>
				<section className="w-full h-screen overflow-hidden flex justify-center items-center bg-gray-200 font-lato">
					<Outlet />
				</section>
			</main>
		</>
	)
}
