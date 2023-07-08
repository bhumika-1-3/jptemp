import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "../../../assets/styles/react-tabs.css"
import AllUsersPage from "./AllUsersPage"
import Attendance from "./Attendance"
import Leave from "./Leave"

const Users = () => {
	return (
		<div>
			<Tabs selectedTabClassName="tabs-styles">
				<TabList className="tab_list-styles ">
					<Tab className="tab-styles">Dashboard</Tab>
					{/* <Tab className="tab-styles">Scores</Tab> */}
				</TabList>
				<TabPanel>
					<AllUsersPage />
				</TabPanel>
				<TabPanel>
					<Attendance />
				</TabPanel>
			</Tabs>
		</div>
	)
}

export default Users
