import { createSlice } from "@reduxjs/toolkit"

const themeColor = localStorage.getItem("colorMode")

const initialState = {
	currentTheme: themeColor ? themeColor : null,
	colors: {
		bg: {
			blue: {
				light: "bg-blue-100",
				medium: "bg-blue-200",
				hover: "hover:bg-blue-200",
				dark: "bg-blue-800",
			},
			yellow: {
				light: "bg-yellow-100",
				medium: "bg-yellow-200",
				hover: "hover:bg-yellow-200",
				dark: "bg-yellow-800",
			},
			green: {
				light: "bg-green-100",
				medium: "bg-green-200",
				hover: "hover:bg-green-200",
				dark: "bg-green-800",
			},
			red: {
				light: "bg-red-100",
				medium: "bg-red-200",
				hover: "hover:bg-red-200",
				dark: "bg-red-800",
			},
		},
		text: {
			blue: {
				light: "text-blue-100",
				dark: "text-blue-800",
				border: "border-blue-700",
			},
			yellow: {
				light: "text-yellow-100",
				dark: "text-yellow-800",
				border: "border-yellow-700",
			},
			green: {
				light: "text-green-100",
				dark: "text-green-800",
				border: "border-green-700",
			},
			red: {
				light: "text-red-100",
				dark: "text-red-800",
				border: "border-red-700",
			},
		},
	},
}

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state.currentTheme = action.payload
			localStorage.setItem("colorMode", action.payload)
		},
		resetTheme: (state) => {
			state.currentTheme = null
			localStorage.removeItem("colorMode")
		},
	},
})

export const { setTheme, resetTheme } = themeSlice.actions

export default themeSlice.reducer
