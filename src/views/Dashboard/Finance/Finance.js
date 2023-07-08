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
import { useNavigate } from "react-router-dom";
import { BsChevronBarDown } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react'
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
import Bank from "../Organization/Bank";
import Expenses from "./Expenses";
import Cards from "./Cards";
import Temp from "./tempCards";
import Groups from "../Organization/Groups";
import { forEach, forIn } from "lodash";
var axios = require('axios');
var FormData = require('form-data');
// var fs = require('fs');

const Finance = () => {

	const Tile = ({ data, setConveniences }) => {
		const [selected, setSelected] = useState(false);
		const select = () => {
			if (selected) {
				setConveniences((prev) => prev.filter((item) => item !== data));
				setSelected(selected);
			} else {
				setConveniences((prev) => [...prev, data]);
				setSelected(!selected);
			}
		};
		return (
			<div
				onClick={select}
				className={`flex px-4 py-2 gap-2 rounded outline shadow cursor-pointer bg-emerald-100 ${selected ? "outline-2" : "outline-0"
					}`}
			>
				{/* <CiWifiOn className="text-xl" /> */}
				<h1 className="">{data}</h1>
			</div>
		);
	};
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
		})
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
	const [conveniences, setConveniences] = useState([]);


	const [sum, setsum] = useState([{
		"pdf_name": "Science",
		"summary": "living outside, often in a tent"
	}]);

	const [langVideos, setLangVideos] = useState([]);
	const [tagVideos, setTagVideos] = useState([]);
	const [videos, setVideos] = useState([]);

	const [langs, setLangs] = useState(["English","Hindi"]);
	const [tags, setTags] = useState(["Maths","Python"]);
	const [query, setQuery] = useState("");

	const getByQuery = () => {
		var urlPath = 'http://127.0.0.1:8000/api/videos/search?q='
		urlPath = urlPath + query
		var config = {
			method: 'get',
			url: urlPath,
		};
		console.log(config)
		axios(config)
			.then(function (response) {
				setVideos(response.data);
			})
			.catch(function (error) {
				console.log(error);
			}
		);
	}

	const getByTags = () => {
		var urlPath = 'http://127.0.0.1:8000/api/videos/tags?tags='
		for (var i = 0; i < tags.length; i++) {
			urlPath = urlPath + tags[i].toLowerCase() + ','
		}
		if(urlPath[urlPath.length-1] === ','){
			urlPath = urlPath.substring(0, urlPath.length - 1);
		}
		var config = {
			method: 'get',
			url: urlPath,
		};
		console.log(config)
		axios(config)
			.then(function (response) {
				setTagVideos(response.data);
			})
			.catch(function (error) {
				console.log(error);
			}
		);
	}
	const getByLanguage = () => {
		var urlPath = 'http://127.0.0.1:8000/api/videos/langs?langs='
		for (var i = 0; i < langs.length; i++) {
			urlPath = urlPath + langs[i].toLowerCase() + ','
		}
		if(urlPath[urlPath.length-1] === ','){
			urlPath = urlPath.substring(0, urlPath.length - 1);
		}
		var config = {
			method: 'get',
			url: urlPath,
		};
		console.log(config)
		axios(config)
			.then(function (response) {
				setLangVideos(response.data);
			})
			.catch(function (error) {
				console.log(error);
			}
		);
	}
	useEffect(() => {
		getByLanguage();
		getByTags();
		getByQuery();
		console.log(langVideos);
		console.log(tagVideos);
		console.log(videos);
	}, [tags, langs, query])
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


	return (
		<div>
			<Tabs selectedTabClassName="tabs-styles">
				<TabList className="tab_list-styles ">
					<Tab className="tab-styles">By languages</Tab>
					<Tab className="tab-styles">By Tags</Tab>
					<Tab className="tab-styles">Trending</Tab>
					<Tab className="tab-styles">Recommended</Tab>
					{/* <Tab className="tab-styles">Summary</Tab> */}
				</TabList>
				<TabPanel>
					<div className="flex flex-col gap-2 mt-4 p-4">
						<h1 className="text-lg font-semibold">Select languages</h1>
						<div className="flex flex-wrap gap-2">
							<Tile data="English" setConveniences={setConveniences} />
							<Tile data="Hindi" setConveniences={setConveniences} />
							<Tile data="Marathi" setConveniences={setConveniences} />
							<Tile data="Gujarati" setConveniences={setConveniences} />
							<Tile data="Urdu" setConveniences={setConveniences} />
						</div>
					</div>
					<div class="grid grid-cols-3 gap-3">
						<div class="max-w-sm rounded overflow-hidden shadow-lg">

							<div class="aspect-video">
								<iframe
									class="w-full h-full"
									src="https://www.youtube.com/embed/gzALIXcY4pg"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen>
								</iframe>
							</div>

							{/*	<div class="relative overflow-hidden pb-9/16 ">
								<iframe  src="https://www.youtube.com/embed/gzALIXcY4pg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
							</div>*/}
							<div class="px-6 py-4">
								<div class="font-bold text-xl mb-2">American History</div>
								<p class="text-gray-700 text-base">
									About American History
								</p>
							</div>
							<div>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography>Previous</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>
											<div>
												<a href={'https://www.youtube.com/embed/gzALIXcY4pg'}>Link</a>
											</div>
										</Typography>
									</AccordionDetails>
								</Accordion>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel2a-content"
										id="panel2a-header"
									>
										<Typography>Next</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>
											<div>
												<a href={'https://www.youtube.com/embed/gzALIXcY4pg'}>Link</a>
											</div>
										</Typography>
									</AccordionDetails>
								</Accordion>

							</div>
						</div>
						<div class="max-w-sm rounded overflow-hidden shadow-lg">
							<div class="aspect-video">
								<iframe
									class="w-full h-full"
									src="https://www.youtube.com/embed/gzALIXcY4pg"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen>
								</iframe>
							</div>
							<div class="px-6 py-4">
								<div class="font-bold text-xl mb-2">American History</div>
								<p class="text-gray-700 text-base">
									About American History
								</p>
							</div>
							<div>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography>Previous</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>
											<div>
												<a href={'https://www.youtube.com/embed/gzALIXcY4pg'}>Link</a>
											</div>
										</Typography>
									</AccordionDetails>
								</Accordion>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel2a-content"
										id="panel2a-header"
									>
										<Typography>Next</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>
											<div>
												<a href={'https://www.youtube.com/embed/gzALIXcY4pg'}>Link</a>
											</div>
										</Typography>
									</AccordionDetails>
								</Accordion>

							</div>
						</div>
						<div class="max-w-sm rounded overflow-hidden shadow-lg">
							<div class="aspect-video">
								<iframe
									class="w-full h-full"
									src="https://www.youtube.com/embed/gzALIXcY4pg"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen>
								</iframe>
							</div>
							<div class="px-6 py-4">
								<div class="font-bold text-xl mb-2">American History</div>
								<p class="text-gray-700 text-base">
									About American History
								</p>
							</div>
							<div>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography>Previous</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>
											<div>
												<a href={'https://www.youtube.com/embed/gzALIXcY4pg'}>Link</a>
											</div>
										</Typography>
									</AccordionDetails>
								</Accordion>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel2a-content"
										id="panel2a-header"
									>
										<Typography>Next</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>
											<div>
												<a href={'https://www.youtube.com/embed/gzALIXcY4pg'}>Link</a>
											</div>
										</Typography>
									</AccordionDetails>
								</Accordion>

							</div>
						</div>
						<div class="max-w-sm rounded overflow-hidden shadow-lg">
							<div class="aspect-video">
								<iframe
									class="w-full h-full"
									src="https://www.youtube.com/embed/gzALIXcY4pg"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen>
								</iframe>
							</div>
							<div class="px-6 py-4">
								<div class="font-bold text-xl mb-2">American History</div>
								<p class="text-gray-700 text-base">
									About American History
								</p>
							</div>
							<div>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography>Previous</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>
											<div>
												<a href={'https://www.youtube.com/embed/gzALIXcY4pg'}>Link</a>
											</div>
										</Typography>
									</AccordionDetails>
								</Accordion>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel2a-content"
										id="panel2a-header"
									>
										<Typography>Next</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>
											<div>
												<a href={'https://www.youtube.com/embed/gzALIXcY4pg'}>Link</a>
											</div>
										</Typography>
									</AccordionDetails>
								</Accordion>

							</div>
						</div>
						<div class="max-w-sm rounded overflow-hidden shadow-lg">
							<div class="aspect-video">
								<iframe
									class="w-full h-full"
									src="https://www.youtube.com/embed/gzALIXcY4pg"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen>
								</iframe>
							</div>
							<div class="px-6 py-4">
								<div class="font-bold text-xl mb-2">American History</div>
								<p class="text-gray-700 text-base">
									About American History
								</p>
							</div>
							<div>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography>Previous</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>
											<div>
												<a href={'https://www.youtube.com/embed/gzALIXcY4pg'}>Google</a>
											</div>
										</Typography>
									</AccordionDetails>
								</Accordion>
								<Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel2a-content"
										id="panel2a-header"
									>
										<Typography>Next</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>
											<div>
												<a href={'https://www.youtube.com/embed/gzALIXcY4pg'}>Google</a>
											</div>
										</Typography>
									</AccordionDetails>
								</Accordion>

							</div>
						</div>
					</div>
				</TabPanel>
			</Tabs>
			{/* Warning modals */}
			{/* Allowance delete warning */}
			{
				showAllowanceWarning && (
					<WarningModal
						close={closeAllowanceDeleteModalHandler}
						submit={deleteAllowanceHandler}
					/>
				)
			}
			{/* Deduction delete warning */}
			{
				showDeductionWarning && (
					<WarningModal
						close={closeDeductionDeleteModalHandler}
						submit={deleteDeductionHandler}
					/>
				)
			}

			{/* Loading spinner */}
			{isLoading && <LoadingSpinner />}
		</div >
	);
};

export default Finance;

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router"
// import { PowerBIEmbed } from 'powerbi-client-react';
// import { models } from 'powerbi-client';
// import "./Dashboard.css"
// import {
// 	HiPlus,
// 	HiUserGroup,
// 	HiLockOpen,
// 	HiDocumentSearch,
// } from "react-icons/hi"
// import { useDispatch, useSelector } from "react-redux"
// // Toast <====
// import { toast } from "react-toastify"
// // ===>
// import {
// 	Button,
// 	Modal,
// 	SectionHeader,
// 	InputTag,
// 	SubHeading,
// 	LoadingSpinner,
// 	CardSmall,
// 	TransitionBtoT,
// } from "../../../components"
// import {
// 	allPermissions,
// 	groupCreate,
// 	toastReset,
// 	allGroups,
// } from "../../../store/slices/User/userSlice"

// const Finance = () => {


// 	return (
// 		<div>
// 			<PowerBIEmbed
// 				embedConfig={{
// 					type: 'report',   // Supported types: report, dashboard, tile, visual and qna
// 					id: 'c325f9de-187d-4a74-8484-5db327831b10',
// 					embedUrl: "https://app.powerbi.com/reportEmbed?reportId=c325f9de-187d-4a74-8484-5db327831b10&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
// 					accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZDFmMTQzNDgtZjFiNS00YTA5LWFjOTktN2ViZjIxM2NiYzgxLyIsImlhdCI6MTY4MDk4Mzc0NCwibmJmIjoxNjgwOTgzNzQ0LCJleHAiOjE2ODA5ODgyNzUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFlTExLTVBaYXY3ZURSYk1JWUhNWXl0ZERBTWd5OWZQOGk2Q2VHQkF5NldwUjJ4Sk5SVFc0emxyODZucFErS1lRIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTUFOR0UiLCJnaXZlbl9uYW1lIjoiQkhVTUlLQSIsImlwYWRkciI6IjExNC43OS4xNzkuMTYxIiwibmFtZSI6IkJIVU1JS0EgTUFOR0UgLSA2MDAwNDIwMDA2NSIsIm9pZCI6ImViMGMyYjg5LWYzYTgtNGFjMy04NzhlLTY1NWFhNGY1OTc4MSIsInB1aWQiOiIxMDAzMjAwMTE0NTVGQkFEIiwicmgiOiIwLkFUMEFTRVB4MGJYeENVcXNtWDZfSVR5OGdRa0FBQUFBQUFBQXdBQUFBQUFBQUFBOUFOQS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJuNGlERklCb3pkNDJncWt6eHJFUGJZZkdGS28tN0ppSkl5YVp5d1lnbjdVIiwidGlkIjoiZDFmMTQzNDgtZjFiNS00YTA5LWFjOTktN2ViZjIxM2NiYzgxIiwidW5pcXVlX25hbWUiOiJCSFVNSUtBLk1BTkdFNjVAc3ZrbW11bWJhaS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJCSFVNSUtBLk1BTkdFNjVAc3ZrbW11bWJhaS5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJxQmtIS1lKVVZFYU9wTnYtd0ZsQ0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.jXe6V9HhfgSZVF5ir_UkfpAAmeI3xCYgYnXKYrkQuc52jQ3mLU1x23X2_cvaxiV09MKARCMK3-exclzBC5nF19UvwRAJzxBh-xvmandyqbqIctPQkPL2uLPHHWG9d4NAhNOBR-hpor7uvcc0a6bkQXXK9wnQp7RzgUXhsD1zf_B3fvRtBDbr6cp_xkBqc3pS6y006qRXfW7FTHOua4MSOCoHyPJV2oEMuxf46087C0KJatCSGMtRpvgVOsFwuZtB5AGk3s185PlYEdgkuvr7K5rC2ue0-xxJnPCjWXDmSWWoAdAns3HB5h5i1GVoe4BFIqPa1ajJCHzWWcBfK0dPeg',
// 					tokenType: models.TokenType.Aad,
// 					settings: {
// 						panes: {
// 							filters: {
// 								expanded: false,
// 								visible: true
// 							}
// 						},
// 					}
// 				}}

// 				eventHandlers={
// 					new Map([
// 						['loaded', function () { console.log('Report loaded'); }],
// 						['rendered', function () { console.log('Report rendered'); }],
// 						['error', function (event) { console.log(event.detail); }]
// 					])
// 				}

// 				cssClassName={"Embed-container"}

// 				getEmbeddedComponent={(embeddedReport) => {
// 					window.report = embeddedReport;
// 				}}
// 			/>
// 		</div>
// 	)
// }

// export default Finance
