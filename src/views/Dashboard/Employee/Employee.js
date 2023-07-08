import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "../../../assets/styles/react-tabs.css"
import Profile from "./Profile"
import Documents from "./Documents"
import Address from "./Address"
import WorkExperience from "./WorkExperiences"
import Education from "./Education"
import Dependents from "./Dependent"
import Expenses from "./Expenses"

const Employee = () => {
	return (
		<div>
			<Tabs selectedTabClassName="tabs-styles">
				<TabList className="tab_list-styles ">
					<Tab className="tab-styles">Profile</Tab>
					<Tab className="tab-styles">Documents</Tab>
					<Tab className="tab-styles">Address</Tab>
					<Tab className="tab-styles">Work Experience</Tab>
					<Tab className="tab-styles">Education</Tab>
					<Tab className="tab-styles">Dependents</Tab>
					<Tab className="tab-styles">Expenses</Tab>
				</TabList>
				<TabPanel>
					<Profile />
				</TabPanel>
				<TabPanel>
					<Documents />
				</TabPanel>
				<TabPanel>
					<Address />
				</TabPanel>
				<TabPanel>
					<WorkExperience />
				</TabPanel>
				<TabPanel>
					<Education />
				</TabPanel>
				<TabPanel>
					<Dependents />
				</TabPanel>
				<TabPanel>
					<Expenses />
				</TabPanel>
			</Tabs>
		</div>
	)
}

export default Employee
