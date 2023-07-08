import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { useEffect } from "react"
import PrivateRoutes from "./routes/PrivateRoutes"
import Profile from "./views/Auth/Profile"
import Login from "./views/Auth/Login"
import DashboardLayout from "./layouts/DashboardLayout"
import AOS from "aos";
import "aos/dist/aos.css";
import Finance from "./views/Dashboard/Finance/Finance"
import Finan2 from "./views/Dashboard/Finance/Finan2"
import Signup from "./views/Auth/Signup"
import More from "./views/Auth/MoreDetails"
import AlanHooks from "./AlanHooks"

function App() {
	useEffect(() => {
		// AlanHooks();
		AOS.init({
			once: false,
			duration: 1000
		});

	
	}, []);

   
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/Profile" element={<Profile />}></Route>
					<Route path="/signup" element={<center className="m-14"><Signup /></center>}></Route>
					{/* <Route path="/more" element={<center className="m-14"><More /></center>}></Route> */}
					<Route path="/login" element={<center className="m-14"><Login /></center>}></Route>
					<Route path="/admin/finance/:id" element={<Finan2 />}></Route>
					{/* <Route path="/dashboard" element={<center className="m-14"><DashboardLayout /></center>}></Route> */}
				</Routes>
				<PrivateRoutes />
			</Router>
		</Provider>
	)
}

export default App
