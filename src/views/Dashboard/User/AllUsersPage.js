// import { useReducer, useEffect, useState } from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { useNavigate } from "react-router"
// import Line from "./Line"
// import Chart from "./Chart"
// import NumberOfEx from "./NumberOfEx"
// import PieChart from "../../Dashboard/AdminDashboard/components/Charts/PieChart"
// import { HiUserAdd, HiPencilAlt, HiPlus, HiSearch } from "react-icons/hi"
// import { toast } from "react-toastify"
// import ChartCard from "../AdminDashboard/components/ChartCard"
// import {
// 	toastReset,
// 	createEmployeeType,
// } from "../../../store/slices/employee/employeeSlice"
// import {
// 	allUsers,
// 	searchEmployee,
// 	toastReset as userToastReset,
// } from "../../../store/slices/User/userSlice"
// import {
// 	InputTag,
// 	Button,
// 	SectionHeader,
// 	Modal,
// 	AllUsersTable,
// 	LoadingSpinner,
// 	SubHeading,
// 	NoteText,
// 	RenderIf,
// 	FadedText,
// } from "../../../components"

// const initialEmployeeData = {
// 	newType: "",
// }

// const employeeReducer = (state, action) => {
// 	switch (action.type) {
// 		case "newType":
// 			return { ...state, newType: action.payload }
// 		case "reset":
// 			return {
// 				newType: "",
// 			}
// 		default:
// 			return state
// 	}
// }

// const AllUsersPage = () => {
// 	const [searchTerm, setSearchTerm] = useState("")
// 	const [state, dispatch] = useReducer(employeeReducer, initialEmployeeData)
// 	const { isLoading, message, showToast, success } = useSelector(
// 		(state) => state.employee
// 	)
// 	const {
// 		// isLoading: userIsLoading,
// 		users,
// 		employeeSearchResult,
// 		showToast: userShowToast,
// 		message: userMessage,
// 		success: userSuccess,
// 	} = useSelector((state) => state.user)
// 	const employeeDispatch = useDispatch()
// 	const navigate = useNavigate()

// 	const createEmployeeTypeHandler = (e) => {
// 		e.preventDefault()
// 		employeeDispatch(createEmployeeType({ name: state.newType }))
// 	}

// 	useEffect(() => {
// 		employeeDispatch(allUsers())
// 	}, [employeeDispatch])

// 	useEffect(() => {
// 		const timeout = setTimeout(() => {
// 			if (searchTerm.length > 0) {
// 				employeeDispatch(searchEmployee(searchTerm))
// 			}
// 		}, 1000)
// 		return () => clearTimeout(timeout)
// 	}, [searchTerm, employeeDispatch])

// 	useEffect(() => {
// 		if (showToast) {
// 			toast[success ? "success" : "error"](message)
// 		}
// 		return () => employeeDispatch(toastReset())
// 	}, [showToast, message, employeeDispatch, success])

// 	useEffect(() => {
// 		if (userShowToast) {
// 			toast[userSuccess ? "success" : "error"](userMessage)
// 		}
// 		return () => employeeDispatch(userToastReset())
// 	}, [userShowToast, userMessage, employeeDispatch, userSuccess])

// 	// if (isLoading || userIsLoading) {
// 	// 	return <LoadingSpinner />
// 	// }

// 	const Data = [

// 		{ gender: '0', count: 30 },
// 		{ gender: '1', count: 10 },
// 		{ gender: '2', count: 4 },
// 		{ gender: '3', count: 4 },
// 		{ gender: '4', count: 26 },
// 		{ gender: '5', count: 30 },
// 	]

// 	const Tone = [

// 		{ gender: '0', count: 5 },
// 		{ gender: '1', count: 15 },
// 		{ gender: '2', count: 23 },
// 	]
// 	return (
// 		<div>
// 			<Line />
// 			<NumberOfEx />
// 			<Chart />
// 			<div className="grid grid-cols-2 sm:col-start-8 sm:col-end-11">
// 				<ChartCard title="Buying Analysis">
// 					<PieChart labels={["None", "very less", "Less", "medium", "Active", "Upper active"]}
// 						colors={["#FF7599", "#A9FF96", "#FFBC75", "#B7D3DF", "#999EFF", "orange"]}
// 						dataSet={Data}
// 						// loading={isLoading}
// 						 />
// 				</ChartCard>
// 				<ChartCard title="Trending Coupons">
// 					<PieChart labels={["Negative", "Positive", "Neutral"]}
// 						colors={["#FF7599", "#A9FF96", "#B7D3DF"]}
// 						dataSet={Tone}
// 						// loading={isLoading} 
// 						/>
// 				</ChartCard>
// 			</div>

// 		</div >
// 	)
// }

// export default AllUsersPage

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiPlusCircle, HiQuestionMarkCircle } from "react-icons/hi";
import { FiType } from "react-icons/fi";
import { AiOutlineBook } from "react-icons/ai";
import { FlashcardComponent } from 'react-flashcard'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../../../assets/styles/react-tabs.css";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
	LoadingSpinner,
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
import Cards from "../Finance/Cards";
var axios = require('axios');
var FormData = require('form-data');
// var fs = require('fs');

const AllUsersPage = () => {
	const [domain, setDomain] = useState();
	const CardSmall = ({ idx, name, children, value }) => {
		const { currentTheme, colors } = useSelector((state) => state.theme);
		useEffect(() => {

			var config = {
				method: 'get',
				url: 'http://127.0.0.1:8000/openaiapp/getsummary/',

			};

			axios(config)
				.then(function (response) {
					console.log(JSON.stringify(response.data.summary));
					settData(response.data.summary);

				})
				.catch(function (error) {
					console.log(error);
				});
		},)
		return (
			<div
				style={{ cursor: "pointer" }}
				onClick={() => {
					setDomain([
						...domain,
						{
							domain: value,
						},
					]);
				}}
				className="shadow-sm border borderColor px-4 py-3 rounded-lg bg-[#f7f6f9] dark:bg-purple_5 relative">
				<h4
					className={`font-normal text-white text-sm px-2 rounded-lg mb-1.5  dark:bg-purple-800 inline-block ${currentTheme ? colors.bg[currentTheme].dark : "bg-purple-800"
						}`}>
					{idx}
				</h4>
				{name && (
					<p className="font-normal dark:text-slate-300 text-slate-700">
						{name}
					</p>
				)}
				{children}
			</div>
		);
	};
	const navigate = useNavigate();
	const [newAllowance, setNewAllowance] = useState({
		name: "",
		description: "",
	});
	const [newDeduction, setNewDeduction] = useState({
		name: "",
		description: "",
	});


	const [sum, setsum] = useState([{
		"pdf_name": "Science",
		"summary": "living outside, often in a tent"
	}]);
	useEffect(() => {
		var config = {
			method: 'get',
			// url: 'https://95d5-2402-3a80-6ff-3e4d-c83b-8d43-d444-56e7.in.ngrok.io/openaiapp/getsummary/',

		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
				setsum(JSON.stringify(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});
	}, [])
	const [allowanceId, setAllowanceId] = useState("");
	const [showAllowanceWarning, setShowAllowanceWarning] = useState(false);
	const [showDeductionWarning, setShowDeductionWarning] = useState(false);
	const [file, setFile] = useState();
	const [name, setName] = useState();

	function handleChange(event) {
		setFile(event.target.files[0]);
	}

	const { isLoading, allowances, deductions, success, message, showToast } =
		useSelector((state) => state.finance);
	const dispatch = useDispatch();

	const createAllowanceHandler = (e) => {
		e.preventDefault();
		dispatch(createAllowance(newAllowance));
		setNewDeduction({
			name: "",
			description: "",
		});
	};
	const [temp, settData] = useState([]);

	const createDeductionHandler = (e) => {
		e.preventDefault();
		toast("Creating summary and flash cards")
		var data = new FormData();
		data.append('file', file);
		data.append('pdf_name', name);

		var config = {
			method: 'post',
			url: 'http://127.0.0.1:8000/openaiapp/summary/',
			headers: {
				// ...data.getHeaders()
			},
			data: data
		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
				toast("Notes added , summary generated")
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	const deleteAllowanceHandler = () => {
		dispatch(deleteAllowance(allowanceId));
		setShowAllowanceWarning(false);
		setAllowanceId("");
	};
	const deleteDeductionHandler = (id) => {
		dispatch(deleteDeduction(id));
		setShowDeductionWarning(false);
		setAllowanceId("");
	};

	// Deduction delete warning modal
	const showDeductionDeleteModalHandler = (id) => {
		setShowDeductionWarning(true);
		setAllowanceId(id);
	};
	const closeDeductionDeleteModalHandler = (id) => {
		setShowDeductionWarning(false);
		setAllowanceId("");
	};
	// Allowance delete warning modal
	const showAllowanceDeleteModalHandler = (id) => {
		setShowAllowanceWarning(true);
		setAllowanceId(id);
	};
	const closeAllowanceDeleteModalHandler = (id) => {
		setShowAllowanceWarning(false);
		setAllowanceId("");
	};

	useEffect(() => {
		dispatch(allAllowances());
		dispatch(allDeductions());
	}, [dispatch]);

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message);
		}
		return () => dispatch(toastReset());
	}, [showToast, message, dispatch, success]);

	// if (isLoading) {
	// 	return <LoadingSpinner />
	// }

	var DOMAINCHOICES = [
		{ value: "FD", data: "Frontend Development" },
		{ value: "BD", data: "Backend Development" },
		{ value: "DS", data: "Data Science" },
		{ value: "SD", data: "Software Development" },
		{ value: "ML", data: "Machine Learning" },
	];
	var PROFESSION_CHOICES = [
		{ value: "ST", data: " What is the longest river in the world?" },
		{ value: "DEV", data: " What is the name of the area of the upper Nile that had the richest gold mines in Africa?", },
		{ value: "MGM", data: "Management" },
		{ value: "OTH", data: "Others" },
	];

	var IMPROVEMENT_CHOICES = [
		{
			value: "1",
			data: "I often feel others don't understand what I am saying",
		},
		{ value: "egypt", data: "The New Kingdom was Egypt’s most powerful and prosperous period. It lasted from about 1539 B.C. to 1075 B.C. During this time, Egypt conquered lands in the Near East and in Africa. The pharaohs of the New Kingdom built huge temples and monuments. They also created a stronger central government.The Nile River has been a major source of sustenance for the Egyptian civilization for centuries. It is the longest river in the world, stretching 4,160 miles from the equator in Africa to the Mediterranean Sea. The river is divided into two parts, the upper Nile in the south and the lower Nile in the north. Every summer, heavy rains in Ethiopia caused the Nile to flood, depositing rich soil along its shores. This soil was fertile, making it ideal for growing crops. The harsh desert acted as a barrier to keep out enemies, and the Mediterranean coast was swampy and lacked good harbors. This kept the early Egyptians close to home. Agricultural techniques such as irrigation canals and shadufs allowed farmers to expand their farmland. Egyptians grew a variety of foods, including vegetables, fruits, and materials for their clothing. They also wove marsh grasses" },
		{ value: "egypt", data: "The New Kingdom was Egypt’s most powerful and prosperous period. It lasted from about 1539 B.C. to 1075 B.C. During this time, Egypt conquered lands in the Near East and built an empire. The pharaohs of the New Kingdom were powerful military leaders. They also built many temples and monuments.The Nile River has been a major source of sustenance for the Egyptian civilization for centuries. It is the longest river in the world, stretching 4,160 miles from the equator in Africa to the Mediterranean Sea. The river is divided into two parts, the upper Nile in the south and the lower Nile in the north. Every summer, heavy rains in Ethiopia caused the Nile to flood, depositing rich soil along its shores. This soil was fertile, making it ideal for growing crops. The harsh desert acted as a barrier to keep out enemies, and the Mediterranean coast was swampy and lacked good harbors. This kept the early Egyptians close to home. Agricultural techniques such as irrigation canals and shadufs allowed farmers to expand their farmland. Egyptians grew a variety of foods, including vegetables, fruits, and materials for their clothing. They also wove marsh grasses" },
		{ value: "Resume", data: ".Bhumika Mange is a student currently pursuing a Bachelor of Technology in Computer from Dwarkadas J. Sanghvi College of Engineering with an average CGPA of 9.75. She has achieved many accolades in her academic career, such as being the top scorer in college, the 2nd rank holder in Navi Mumbai HSC, and a finalist in the 17th Avishkar inter-college research convention. She has also participated in various hackathons and coding competitions, such as Unscript Rookies 24hrs national level hackathon, Lines of Code 24hrs national level Hackathon, Codebash - competitive programming competition, and IICC- Innovate India Coding Championship by AICTE.Bhumika has also gained experience through internships at PPM Info tech pvt and Dirtpals, where she worked as a React developer and front-end developer respectively. She has also worked on various projects, such as Store Easy - Inventory Website, Get in Shape - Fitness tracking website with google fit, and Course Management System.Bhumika is proficient in various programming languages, such as C++, C, Python, HTML/CSS, JavaScript, SQL, MongoDB, React" },
		{ value: "Filler", data: "I use a lot of filler (like 'um')" },
		{ value: "Ramble", data: "I feel I ramble sometimes" },
	];
	const cardData = [
		{
			front: {
				text: "living outside, often in a tent",
				image: "https://o.quizlet.com/RWRdgDus.uuqNDUrJ0ernA.jpg",
			},
			back: {
				text: "Camping",
			}
		}
	]
	// console.log(file);
	const { currentTheme, colors } = useSelector((state) => state.theme)
	function uploadFile(file) {
		const formData = new FormData();
		formData.append('file', file);
	
		fetch('/upload', {
		  method: 'POST',
		  body: formData
		})
		  .then(response => {
			// handle success
			console.log('File uploaded successfully');
		  })
		  .catch(error => {
			// handle error
			console.error('Error uploading file:', error);
		  });
	  }
	  function handleFileUpload(event) {
		const file = event.target.files[0];
		uploadFile(file);
	  }
	return (
		<div>
			<Tabs selectedTabClassName="tabs-styles">
				<TabList className="tab_list-styles ">
					<Tab className="tab-styles">Notes</Tab>
					<Tab className="tab-styles">Courses</Tab>
					<Tab className="tab-styles">Student Data</Tab>
				</TabList>
				<TabPanel>
					<SectionHeader>
						{/* Deduction create modal */}
						<Modal
							title="Add new Notes"
							activator={({ setShow }) => (
								<Button Icon={HiPlusCircle} onClick={() => setShow(true)}>
									Add
								</Button>
							)}>
							<form onSubmit={createDeductionHandler}>
								<InputTag
									Icon={FiType}
									label="Notes"
									type="file"
									// placeholder="Enter deduction name"
									// value={newDeduction.name}
									onChange={(e) =>
										setFile(() => e.target.files[0])
									}
								/>
								<InputTag
									Icon={FiType}
									label="name"
									type="text"
									placeholder="Enter topic name"
									value={name}
									onChange={(e) =>
										setName(e.target.value)
									}
								/>
								<Button type="submit"
									Icon={HiPlusCircle}>
									Create
								</Button>
							</form>
						</Modal>
					</SectionHeader>
					<div className="grid md:grid-cols-4 gap-3">
						{IMPROVEMENT_CHOICES.map((item, idx) => (
							<TransitionBtoT key={idx}>
								<CardSmall value={item.value} idx={idx + 1} name={item.value} />
							</TransitionBtoT>
						))}
					</div>
				</TabPanel>
				<TabPanel>
					{/* <div className="grid md:grid-cols-4 gap-3"> */}
					{/* {PROFESSION_CHOICES.map((item, idx) => ( */}
					{/* <TransitionBtoT key={idx}> */}
					{/* <Accordion className="p-1 m-3">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{item.data}</Typography>
                </AccordionSummary>
                <AccordionDetails> */}
					<Cards />
					{/* </AccordionDetails> */}
					{/* </Accordion> */}

					{/* </TransitionBtoT> */}
					{/* ))} */}
					{/* </div> */}
				</TabPanel>
				<TabPanel>
					<div className="grid md:grid-cols-2 gap-3">
						{PROFESSION_CHOICES.length == 0 ? <div></div> :
							PROFESSION_CHOICES.map((item, idx) => (
								item.pdf_name != "" ?
									<div>
										<Accordion>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
											>
												<Typography>{item.data}</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Typography>
													{item.value}
												</Typography>
											</AccordionDetails>
										</Accordion>
									</div>
									:
									null
							))}
					</div>
					<div className="text-2xl font-bold pt-8 m-3">Upload User data:</div>
					<form>
						<div className="flex items-center justify-center w-full pt-10">
							<label
								for="dropzone-file"
								className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
							>
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<svg
										aria-hidden="true"
										className="w-10 h-10 mb-3 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
										></path>
									</svg>
									<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
										<span className="font-semibold">Click to upload</span> or
										drag and drop
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										SVG, PNG, JPG or GIF (MAX. 800x400px)
									</p>
								</div>
								<input id="dropzone-file" type="file" onChange={handleFileUpload} className="hidden" />
							</label>
						</div>
						<button
							className={`mt-10 m-5 block w-60 float-right rounded-md  px-3 py-2 text-center text-sm font-semibold bg-black-300 text-white shadow-sm ${currentTheme ? colors.bg[currentTheme].dark : "bg-purple-700"
								}`}
						>
							Submit
						</button>
					</form>
				</TabPanel>
				<TabPanel>
					<div className="relative w-full mb-3">
						<label
							className="flex items-center text-slate-500 text-xs font-semibold mb-2"
							htmlFor="grid-password">
							<AiOutlineBook className="mr-1" />
							Resume
						</label>
						<input
							onChange={handleChange}
							name="file"
							type="file"
							className="px-3 py-3 placeholder-blueGray-300 text-slate-700 placeholder:text-slate-400 bg-gray-50  border borderColor rounded-xl text-sm  focus:outline-none w-full ease-linear transition-all duration-150"
							required
						/>
					</div>
				</TabPanel>
			</Tabs>

			{/* Warning modals */}
			{/* Allowance delete warning */}
			{showAllowanceWarning && (
				<WarningModal
					close={closeAllowanceDeleteModalHandler}
					submit={deleteAllowanceHandler}
				/>
			)}
			{/* Deduction delete warning */}
			{showDeductionWarning && (
				<WarningModal
					close={closeDeductionDeleteModalHandler}
					submit={deleteDeductionHandler}
				/>
			)}

			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</div>
	);
};

export default AllUsersPage;