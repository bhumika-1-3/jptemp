import { useState, useEffect } from "react"
import { HiMoon, HiSun } from "react-icons/hi"

const ThemeToggle = () => {
	const [darkModeToggle, setDarkModeToggle] = useState("")

	const darkHandler = () => {
		localStorage.setItem("theme", "dark")
		setDarkModeToggle("dark")
	}
	const lightHandler = () => {
		localStorage.setItem("theme", "light")
		setDarkModeToggle("light")
	}

	useEffect(() => {
		if (!localStorage.getItem("theme")) {
			localStorage.setItem("theme", "light")
		}
		const html = window.document.documentElement
		const currentTheme = localStorage.getItem("theme")
		html.className = currentTheme
		setDarkModeToggle(localStorage.getItem("theme"))
	}, [darkModeToggle])

	return (
		<div className="border text-xl rounded-md duration-300 active:bg-purple-400 active:border-purple-400 hover:bg-purple-300 hover:border-purple-300 dark:hover:border-purple-300 dark:active:border-purple-400 dark:hover:text-black cursor-pointer ml-auto borderColor dark:text-yellow-300">
			{darkModeToggle === "light" ? (
				<div className="p-2" onClick={darkHandler}>
					<HiMoon />
				</div>
			) : (
				<div className="p-2" onClick={lightHandler}>
					<HiSun />
				</div>
			)}
		</div>
	)
}

export default ThemeToggle
