import React, { memo } from "react"
import { Route, Routes } from "react-router-dom"
import { PageNotFound } from "../components"

const MapAllowedRoutes = ({ routes, basePath, isAddNotFound }) => {
	return (
		<Routes>
			{routes.map((route) => {
				const {
					path,
					component: Component,
					children,
					permission,
					...rest
				} = route
				// console.log("child routes", children)
				return (
					<Route path={path} element={<Component />} {...rest} key={path}>
						{children &&
							children.map((item) => (
								<Route
									path={item.path}
									element={<item.component />}
									key={path}
								/>
							))}
					</Route>
				)
			})}
			{isAddNotFound && <Route path="*" element={<PageNotFound />} />}
		</Routes>
	)
}

export default memo(MapAllowedRoutes)
