import { useState, useTransition, Suspense, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../../../assets/styles/react-tabs.css";
import data from "../../../MCQdata/data";
import { LoadingSpinner } from "../../../components";
import "react-datepicker/dist/react-datepicker.css";
// Importing components for other tabs
import Department from "./Department";
import Designation from "./Designation";
import Location from "./Location";
import Holidays from "./Holidays";
import AllOrganizations from "./AllOrganizations";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiPlusCircle, HiQuestionMarkCircle, HiMail } from "react-icons/hi";
import { FiType } from "react-icons/fi";
import { AiOutlineBook } from "react-icons/ai";
import { FlashcardComponent } from 'react-flashcard'
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom"
import {
	// Allowance
	allAllowances,
	createAllowance,
	deleteAllowance,
	// Dedution
	allDeductions,
	createDeductions,
	deleteDeduction,
	toastReset,
} from "../../../store/slices/finance/financeSlice";
// Components
import {
	Button,
	Modal,
	SectionHeader,
	InputTag,
	TransitionBtoT,
	RenderIf,
} from "../../../components";
import {
	SubHeading,
	TextareaTag,
	FadedText,
	AllowanceTable,
	WarningModal,
} from "../../../components";
// Importing componts for tabs
import Bank from "../Organization/Bank";
import Expenses from "../Finance/Expenses";
import Cards from "../Finance/Cards";
// import Temp from "./tempCards";
import { SuggestData } from "./SuggestedData"
import Temp from "../Finance/tempCards"
import AlanHooks from "../../../AlanHooks";
import SMS from "./SMS";
var axios = require('axios');
var FormData = require('form-data');

const Organizations = () => {
	console.log(data);
	const All = [
		"HTML",
		"CSS",
		"Javascript",
		"JQUery",
		"React",
		"Vue",
	]
	const Static = [
		"Django",
		"Node",
		"DWF",
	]
	const Dynamic = [
		"pandas",
		"power BI",
		"Numpy",
		"excel",
		"SQL"
	]
	const Blockchain = [
		"Hardhat",
		"NFT",
		"solidity",
		"Smart contracts",
	]
	const Learning = [
		"Questions",
	]

	const [currentTab, setCurrentTab] = useState(0);
	const [isPending, startTransition] = useTransition();

	const tabChangeHandler = (idx) => {
		startTransition(() => {
			setCurrentTab(idx);
		});
	};
	const [file, setFile] = useState();
	const [name, setName] = useState();
	const [couponData, setCoupon] = useState({
		name: "om",
		cart_limit: "2000",
		category: "food",
		amount_limit: "100",
		percent_limit: "20",
		valid_date: "",
		code: "TRY",
		numberOfcoupens: "2",
		lengthofcode: "5",
		is_static: false,
		limit_coupens: "10"
	})
	const [allCoupons, setAllCoupons] = useState([])


	const [showDeductionWarning, setShowDeductionWarning] = useState(false);


	const [startDate, setStartDate] = useState(new Date());
	const [selectedValue, setSelectedValue] = useState("");

	function handleSelectChange(e) {
		setSelectedValue(e.target.value);
	}

	useEffect(() => {
		var config = {
			method: 'get',
			url: 'http://127.0.0.1:8000/coupons/coupen-get/',
			headers: {
				'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc4ODA4NjY1LCJpYXQiOjE2Nzg1NDk0NjUsImp0aSI6ImVhZWY5YzRhOGNiZDRhMDRiNDFjYjI3OGMwMTIwODA3IiwidXNlcl9pZCI6MX0.rRjJVtJjbjeFeTiDOj_ldOQpZqymlcma6YIrCOCFlUI'
			}
		};

		axios(config)
			.then(function (response) {
				console.log(response.data);
				setAllCoupons(response.data);

			})
			.catch(function (error) {
				console.log(error);
			});
	}, [])


	return (
		<div>

			<Tabs
				selectedIndex={currentTab}
				selectedTabClassName="tabs-styles"
				onSelect={tabChangeHandler}>
				<TabList className="tab_list-styles ">
					<Tab className="tab-styles">General Chat</Tab>
					<Tab className="tab-styles">SMS to parents</Tab>

					{/* <Tab className="tab-styles">Department</Tab>
					<Tab className="tab-styles">Designation</Tab>
					<Tab className="tab-styles">Location</Tab>
					<Tab className="tab-styles">Holidays</Tab> */}
				</TabList>

				<Suspense fallback={<LoadingSpinner />}>
					<TabPanel>{!isPending && <AllOrganizations/>}</TabPanel>
					<TabPanel>{!isPending && <SMS temp={SuggestData} id="4" type={"Suggested"} />}</TabPanel>
				</Suspense>
			</Tabs>
		</div >
	)
}

export default Organizations;
