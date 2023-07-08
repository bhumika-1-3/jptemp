// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { HiPlusCircle, HiQuestionMarkCircle } from "react-icons/hi";
// import { FiType } from "react-icons/fi";
// import { AiOutlineBook } from "react-icons/ai";
// import { FlashcardComponent } from 'react-flashcard'
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "../../../assets/styles/react-tabs.css";
// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { useNavigate } from "react-router-dom"
// import {
//   // Allowance
//   allAllowances,
//   createAllowance,
//   deleteAllowance,
//   // Dedution
//   allDeductions,
//   createDeductions,
//   deleteDeduction,
//   toastReset,
// } from "../../../store/slices/finance/financeSlice";
// // Components
// import {
//   Button,
//   Modal,
//   SectionHeader,
//   InputTag,
//   LoadingSpinner,
//   TransitionBtoT,
//   RenderIf,
// } from "../../../components";
// import {
//   SubHeading,
//   TextareaTag,
//   FadedText,
//   AllowanceTable,
//   WarningModal,
// } from "../../../components";
// // Importing componts for tabs
// import Bank from "../Organization/Bank";
// import Expenses from "./Expenses";
// import Cards from "./Cards";
// import Temp from "./tempCards";
// var axios = require('axios');
// var FormData = require('form-data');
// // var fs = require('fs');

// const Finance = () => {
//   const [domain, setDomain] = useState();
//   const CardSmall = ({ idx, name, children, value }) => {
//     const { currentTheme, colors } = useSelector((state) => state.theme);
//     useEffect(() => {

//       var config = {
//         method: 'get',
//         url: 'http://127.0.0.1:8000/openaiapp/getsummary/',

//       };

//       axios(config)
//         .then(function (response) {
//           console.log(JSON.stringify(response.data.summary));
//           settData(response.data.summary);

//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     },        )
//     return (
//       <div
//         style={{ cursor: "pointer" }}
//         onClick={() => {
//           setDomain([
//             ...domain,
//             {
//               domain: value,
//             },
//           ]);
//         }}
//         className="shadow-sm border borderColor px-4 py-3 rounded-lg bg-[#f7f6f9] dark:bg-purple_5 relative">
//         <h4
//           className={`font-normal text-white text-sm px-2 rounded-lg mb-1.5  dark:bg-purple-800 inline-block ${currentTheme ? colors.bg[currentTheme].dark : "bg-purple-800"
//             }`}>
//           {idx}
//         </h4>
//         {name && (
//           <p className="font-normal dark:text-slate-300 text-slate-700">
//             {name}
//           </p>
//         )}
//         {children}
//       </div>
//     );
//   };
//   const navigate = useNavigate();
//   const [newAllowance, setNewAllowance] = useState({
//     name: "",
//     description: "",
//   });
//   const [newDeduction, setNewDeduction] = useState({
//     name: "",
//     description: "",
//   });


//   const [sum, setsum] = useState([{
//     "pdf_name": "Science",
//     "summary": "living outside, often in a tent"
//   }]);
//   useEffect(() => {
//     var config = {
//       method: 'get',
//       // url: 'https://95d5-2402-3a80-6ff-3e4d-c83b-8d43-d444-56e7.in.ngrok.io/openaiapp/getsummary/',

//     };

//     axios(config)
//       .then(function (response) {
//         console.log(JSON.stringify(response.data));
//         setsum(JSON.stringify(response.data));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, [])
//   const [allowanceId, setAllowanceId] = useState("");
//   const [showAllowanceWarning, setShowAllowanceWarning] = useState(false);
//   const [showDeductionWarning, setShowDeductionWarning] = useState(false);
//   const [file, setFile] = useState();
//   const [name, setName] = useState();

//   function handleChange(event) {
//     setFile(event.target.files[0]);
//   }

//   const { isLoading, allowances, deductions, success, message, showToast } =
//     useSelector((state) => state.finance);
//   const dispatch = useDispatch();

//   const createAllowanceHandler = (e) => {
//     e.preventDefault();
//     dispatch(createAllowance(newAllowance));
//     setNewDeduction({
//       name: "",
//       description: "",
//     });
//   };
//   const [temp, settData] = useState([]);

//   const createDeductionHandler = (e) => {
//     e.preventDefault();
//     toast("Creating summary and flash cards")
//     var data = new FormData();
//     data.append('file', file);
//     data.append('pdf_name', name);

//     var config = {
//       method: 'post',
//       url: 'http://127.0.0.1:8000/openaiapp/summary/',
//       headers: {
//         // ...data.getHeaders()
//       },
//       data: data
//     };

//     axios(config)
//       .then(function (response) {
//         console.log(JSON.stringify(response.data));
//         toast("Notes added , summary generated")
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };
//   const deleteAllowanceHandler = () => {
//     dispatch(deleteAllowance(allowanceId));
//     setShowAllowanceWarning(false);
//     setAllowanceId("");
//   };
//   const deleteDeductionHandler = (id) => {
//     dispatch(deleteDeduction(id));
//     setShowDeductionWarning(false);
//     setAllowanceId("");
//   };

//   // Deduction delete warning modal
//   const showDeductionDeleteModalHandler = (id) => {
//     setShowDeductionWarning(true);
//     setAllowanceId(id);
//   };
//   const closeDeductionDeleteModalHandler = (id) => {
//     setShowDeductionWarning(false);
//     setAllowanceId("");
//   };
//   // Allowance delete warning modal
//   const showAllowanceDeleteModalHandler = (id) => {
//     setShowAllowanceWarning(true);
//     setAllowanceId(id);
//   };
//   const closeAllowanceDeleteModalHandler = (id) => {
//     setShowAllowanceWarning(false);
//     setAllowanceId("");
//   };

//   useEffect(() => {
//     dispatch(allAllowances());
//     dispatch(allDeductions());
//   }, [dispatch]);

//   useEffect(() => {
//     if (showToast) {
//       toast[success ? "success" : "error"](message);
//     }
//     return () => dispatch(toastReset());
//   }, [showToast, message, dispatch, success]);

//   // if (isLoading) {
//   // 	return <LoadingSpinner />
//   // }

//   var DOMAINCHOICES = [
//     { value: "FD", data: "Frontend Development" },
//     { value: "BD", data: "Backend Development" },
//     { value: "DS", data: "Data Science" },
//     { value: "SD", data: "Software Development" },
//     { value: "ML", data: "Machine Learning" },
//   ];
//   var PROFESSION_CHOICES = [
//     { value: "ST", data: " What is the longest river in the world?" },
//     { value: "DEV", data: " What is the name of the area of the upper Nile that had the richest gold mines in Africa?", },
//     { value: "MGM", data: "Management" },
//     { value: "OTH", data: "Others" },
//   ];

//   var IMPROVEMENT_CHOICES = [
//     {
//       value: "1",
//       data: "I often feel others don't understand what I am saying",
//     },
//     { value: "egypt", data: "The New Kingdom was Egypt’s most powerful and prosperous period. It lasted from about 1539 B.C. to 1075 B.C. During this time, Egypt conquered lands in the Near East and in Africa. The pharaohs of the New Kingdom built huge temples and monuments. They also created a stronger central government.The Nile River has been a major source of sustenance for the Egyptian civilization for centuries. It is the longest river in the world, stretching 4,160 miles from the equator in Africa to the Mediterranean Sea. The river is divided into two parts, the upper Nile in the south and the lower Nile in the north. Every summer, heavy rains in Ethiopia caused the Nile to flood, depositing rich soil along its shores. This soil was fertile, making it ideal for growing crops. The harsh desert acted as a barrier to keep out enemies, and the Mediterranean coast was swampy and lacked good harbors. This kept the early Egyptians close to home. Agricultural techniques such as irrigation canals and shadufs allowed farmers to expand their farmland. Egyptians grew a variety of foods, including vegetables, fruits, and materials for their clothing. They also wove marsh grasses" },
//     { value: "egypt", data: "The New Kingdom was Egypt’s most powerful and prosperous period. It lasted from about 1539 B.C. to 1075 B.C. During this time, Egypt conquered lands in the Near East and built an empire. The pharaohs of the New Kingdom were powerful military leaders. They also built many temples and monuments.The Nile River has been a major source of sustenance for the Egyptian civilization for centuries. It is the longest river in the world, stretching 4,160 miles from the equator in Africa to the Mediterranean Sea. The river is divided into two parts, the upper Nile in the south and the lower Nile in the north. Every summer, heavy rains in Ethiopia caused the Nile to flood, depositing rich soil along its shores. This soil was fertile, making it ideal for growing crops. The harsh desert acted as a barrier to keep out enemies, and the Mediterranean coast was swampy and lacked good harbors. This kept the early Egyptians close to home. Agricultural techniques such as irrigation canals and shadufs allowed farmers to expand their farmland. Egyptians grew a variety of foods, including vegetables, fruits, and materials for their clothing. They also wove marsh grasses" },
//     { value: "Resume", data: ".Bhumika Mange is a student currently pursuing a Bachelor of Technology in Computer from Dwarkadas J. Sanghvi College of Engineering with an average CGPA of 9.75. She has achieved many accolades in her academic career, such as being the top scorer in college, the 2nd rank holder in Navi Mumbai HSC, and a finalist in the 17th Avishkar inter-college research convention. She has also participated in various hackathons and coding competitions, such as Unscript Rookies 24hrs national level hackathon, Lines of Code 24hrs national level Hackathon, Codebash - competitive programming competition, and IICC- Innovate India Coding Championship by AICTE.Bhumika has also gained experience through internships at PPM Info tech pvt and Dirtpals, where she worked as a React developer and front-end developer respectively. She has also worked on various projects, such as Store Easy - Inventory Website, Get in Shape - Fitness tracking website with google fit, and Course Management System.Bhumika is proficient in various programming languages, such as C++, C, Python, HTML/CSS, JavaScript, SQL, MongoDB, React" },
//     { value: "Filler", data: "I use a lot of filler (like 'um')" },
//     { value: "Ramble", data: "I feel I ramble sometimes" },
//   ];
//   const cardData = [
//     {
//       front: {
//         text: "living outside, often in a tent",
//         image: "https://o.quizlet.com/RWRdgDus.uuqNDUrJ0ernA.jpg",
//       },
//       back: {
//         text: "Camping",
//       }
//     }
//   ]
//   // console.log(file);
//   const { currentTheme, colors } = useSelector((state) => state.theme)

//   return (
//     <div>
//       <Tabs selectedTabClassName="tabs-styles">
//         <TabList className="tab_list-styles ">
//           <Tab className="tab-styles">Notes</Tab>
//           <Tab className="tab-styles">Flash cards</Tab>
//           <Tab className="tab-styles">Summary</Tab>
//         </TabList>
//         <TabPanel>
//           <SectionHeader>
//             {/* Deduction create modal */}
//             <Modal
//               title="Add new Notes"
//               activator={({ setShow }) => (
//                 <Button Icon={HiPlusCircle} onClick={() => setShow(true)}>
//                   Add
//                 </Button>
//               )}>
//               <form onSubmit={createDeductionHandler}>
//                 <InputTag
//                   Icon={FiType}
//                   label="Notes"
//                   type="file"
//                   // placeholder="Enter deduction name"
//                   // value={newDeduction.name}
//                   onChange={(e) =>
//                     setFile(() => e.target.files[0])
//                   }
//                 />
//                 <InputTag
//                   Icon={FiType}
//                   label="name"
//                   type="text"
//                   placeholder="Enter topic name"
//                   value={name}
//                   onChange={(e) =>
//                     setName(e.target.value)
//                   }
//                 />
//                 <Button type="submit"
//                   Icon={HiPlusCircle}>
//                   Create
//                 </Button>
//               </form>
//             </Modal>
//           </SectionHeader>
//           <div className="grid md:grid-cols-4 gap-3">
//             {IMPROVEMENT_CHOICES.map((item, idx) => (
//               <TransitionBtoT key={idx}>
//                 <CardSmall value={item.value} idx={idx + 1} name={item.value} />
//               </TransitionBtoT>
//             ))}
//           </div>
//         </TabPanel>
//         <TabPanel>
//           {/* <div className="grid md:grid-cols-4 gap-3"> */}
//           {/* {PROFESSION_CHOICES.map((item, idx) => ( */}
//           {/* <TransitionBtoT key={idx}> */}
//           {/* <Accordion className="p-1 m-3">
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1a-content"
//                   id="panel1a-header"
//                 >
//                   <Typography>{item.data}</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails> */}
//           <Cards />
//           {/* </AccordionDetails> */}
//           {/* </Accordion> */}

//           {/* </TransitionBtoT> */}
//           {/* ))} */}
//           {/* </div> */}
//         </TabPanel>
//         <TabPanel>
//           <div className="grid md:grid-cols-2 gap-3">
//             {temp.length == 0 ?<div></div>:
//               temp.map((item, idx) => (
//                 item.pdf_name != ""?
//               <div>
//                 <Accordion>
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1a-content"
//                     id="panel1a-header"
//                   >
//                     <Typography>{item.pdf_name}</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <Typography>
//                       {item.summary}
//                     </Typography>
//                   </AccordionDetails>
//                 </Accordion>
//               </div>
//               :
//               null
//             ))}
//           </div>
//         </TabPanel>
//         <TabPanel>
//           <div className="relative w-full mb-3">
//             <label
//               className="flex items-center text-slate-500 text-xs font-semibold mb-2"
//               htmlFor="grid-password">
//               <AiOutlineBook className="mr-1" />
//               Resume
//             </label>
//             <input
//               onChange={handleChange}
//               name="file"
//               type="file"
//               className="px-3 py-3 placeholder-blueGray-300 text-slate-700 placeholder:text-slate-400 bg-gray-50  border borderColor rounded-xl text-sm  focus:outline-none w-full ease-linear transition-all duration-150"
//               required
//             />
//           </div>
//         </TabPanel>
//       </Tabs>

//       {/* Warning modals */}
//       {/* Allowance delete warning */}
//       {showAllowanceWarning && (
//         <WarningModal
//           close={closeAllowanceDeleteModalHandler}
//           submit={deleteAllowanceHandler}
//         />
//       )}
//       {/* Deduction delete warning */}
//       {showDeductionWarning && (
//         <WarningModal
//           close={closeDeductionDeleteModalHandler}
//           submit={deleteDeductionHandler}
//         />
//       )}

//       {/* Loading spinner */}
//       {isLoading && <LoadingSpinner />}
//     </div>
//   );
// };

// export default Finance;

import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import "./Dashboard.css"
import {
	HiPlus,
	HiUserGroup,
	HiLockOpen,
	HiDocumentSearch,
} from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
// Toast <====
import { toast } from "react-toastify"
// ===>
import {
	Button,
	Modal,
	SectionHeader,
	InputTag,
	SubHeading,
	LoadingSpinner,
	CardSmall,
	TransitionBtoT,
} from "../../../components"
import {
	allPermissions,
	groupCreate,
	toastReset,
	allGroups,
} from "../../../store/slices/User/userSlice"

const Finance = () => {


	return (
		<div>
			<PowerBIEmbed
				embedConfig={{
					type: 'report',   // Supported types: report, dashboard, tile, visual and qna
					id: 'c325f9de-187d-4a74-8484-5db327831b10',
					accessToken:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZDFmMTQzNDgtZjFiNS00YTA5LWFjOTktN2ViZjIxM2NiYzgxLyIsImlhdCI6MTY4MzQzMzA2NiwibmJmIjoxNjgzNDMzMDY2LCJleHAiOjE2ODM0MzcxODksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFTSElVc1JYNDhIdlYyUmZJS1h6dnFNdzNQeHZmQUFYSzEwaHJZaTdpeEtoS2NnODNDSkJRUXF2Q1plQko3K0JBIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTUFOR0UiLCJnaXZlbl9uYW1lIjoiQkhVTUlLQSIsImlwYWRkciI6IjExMS4xMjUuMjMxLjE4MSIsIm5hbWUiOiJCSFVNSUtBIE1BTkdFIC0gNjAwMDQyMDAwNjUiLCJvaWQiOiJlYjBjMmI4OS1mM2E4LTRhYzMtODc4ZS02NTVhYTRmNTk3ODEiLCJwdWlkIjoiMTAwMzIwMDExNDU1RkJBRCIsInJoIjoiMC5BVDBBU0VQeDBiWHhDVXFzbVg2X0lUeThnUWtBQUFBQUFBQUF3QUFBQUFBQUFBQTlBTkEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoibjRpREZJQm96ZDQyZ3FrenhyRVBiWWZHRktvLTdKaUpJeWFaeXdZZ243VSIsInRpZCI6ImQxZjE0MzQ4LWYxYjUtNGEwOS1hYzk5LTdlYmYyMTNjYmM4MSIsInVuaXF1ZV9uYW1lIjoiQkhVTUlLQS5NQU5HRTY1QHN2a21tdW1iYWkub25taWNyb3NvZnQuY29tIiwidXBuIjoiQkhVTUlLQS5NQU5HRTY1QHN2a21tdW1iYWkub25taWNyb3NvZnQuY29tIiwidXRpIjoiMHZ5TENMODNaVXliVWk1NU5zdzFBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.Vqw3VOY7biHyVxlgDGJB14crBgnTQd0cZBkOG8kTARVO58OOsjjhrPGc_Mi2MHSpUiQPUWKSVe8pKBe6GaRS19nx3krmPRkNna-6IjQt5k5Nk1CDYlusmKwn3EusaporOhg6ADYien6zCsHSa3cIA6mxbh-BqEG8UCPGi35jRGWwfsWUS7-VLAx53GyxwMkf0Z3Njan1zc1HTBoFxeBu8D3RR3ImW3PUxnOyEPCAanMcYAMFXA-AoMi0Dk_4sLjtGP_PHPC3hm5CxoL2CGNpj0CMDeCRqpeW8pI-v1cVBEswJ0jgjAIOP09NDO9soBSyy7l7cRw63fyJjXn_WZeZPA",
					embedUrl: "https://app.powerbi.com/reportEmbed?reportId=c325f9de-187d-4a74-8484-5db327831b10&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
					tokenType: models.TokenType.Aad,
					settings: {
						panes: {
							filters: {
								expanded: false,
								visible: true
							}
						},
					}
				}}

				eventHandlers={
					new Map([
						['loaded', function () { console.log('Report loaded'); }],
						['rendered', function () { console.log('Report rendered'); }],
						['error', function (event) { console.log(event.detail); }]
					])
				}

				cssClassName={"Embed-container"}

				getEmbeddedComponent={(embeddedReport) => {
					window.report = embeddedReport;
				}}
			/>
		</div>
	)
}

export default Finance
