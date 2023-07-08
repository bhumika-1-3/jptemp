import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { HiPlus, HiUserGroup, HiDocumentSearch } from "react-icons/hi";
import { HiPlusCircle, HiQuestionMarkCircle, HiMail } from "react-icons/hi";
import { FiType } from "react-icons/fi";
import DatePicker from "react-datepicker";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

import {
	Button,
	Modal,
	SectionHeader,
	InputTag,
	TransitionBtoT,
} from "../../components";

import {
	WrapperModal,
	SubHeading,
	FadedText,
	LoadingSpinner,
} from "../../components";
var axios = require("axios");

const CardSmall = ({ idx, name, type, children }) => {
	const [selectedValue, setSelectedValue] = useState("");
	function handleSelectChange(e) {
		setSelectedValue(e.target.value);
	}
	const [couponData, setCoupon] = useState({
		name: "om",
		cart_limit: "2000",
		category: "food",
		amount_limit: "100",
		percent_limit: "+917666499303",
		valid_date: "",
		code: "TRY",
		numberOfcoupens: "2",
		lengthofcode: "5",
		is_static: false,
		limit_coupens: "10",
	});
	console.log(name, type);
	const { currentTheme, colors } = useSelector((state) => state.theme);

	return (
		<>
			{type === 'Suggested'
				?
				(<div className="grid grid-cols-2">
					{name["food_ecommerce_offers"]?.map((i, idx) => {
						return <Modal
							title="Add parent details"
							className="float-right"
							activator={({ setShow }) => (
								<div
									onClick={() => setShow(true)}
									className={`m-1 cursor-pointer shadow-sm border borderColor px-4 py-3 rounded-lg bg-gradient-to-r dark:bg-purple_5
			${currentTheme ? colors.bg[currentTheme].light : "bg-gray-100"}
			`}>
									<h4
										className={`font-normal text-white text-sm px-2 rounded-lg mb-1.5  dark:bg-purple-800 inline-block ${currentTheme ? colors.bg[currentTheme].dark : "bg-purple-800"
											}`}
									>
										{/* {idx} */}
									</h4>
									<div className="">
										<div>
											{i && (
												<p className={`font-bold dark:text-zinc-200 text-3xl text-slate-700 font-sans pb-2`}>
													{idx + 1}
												</p>
											)}
											<p className="font-normal dark:text-zinc-300 text-slate-900 font-sans">
												{i.reason}
											</p>
										</div>
									</div>
									{/* {children} */}
								</div>
							)}
						>
							<form onSubmit={(e)=>
							{
								e.preventDefault();
								toast("Successfully sent")}
							}>
								{/* <InputTag
							label="Notes"
							type="file"
							// placeholder="Enter deduction name"
							// value={newDeduction.name}
							onChange={(e) =>
								setFile(() => e.target.files[0])
							}
						/> */}
								<InputTag
									// Icon={FiType}
									label="name"
									type="text"
									placeholder="Enter coupon name"
									value={couponData.name}
									onChange={(e) =>
										setCoupon({ ...couponData, name: e.target.value })
									}
								/>
								<InputTag
									// Icon={FiType}
									notRequired={true}
									label="contact number"
									type="text"
									placeholder="+91"
									value={couponData.percent_limit}
									onChange={(e) =>
										setCoupon({ ...couponData, percent_limit: e.target.value })
									}
								/>


								<Button Icon={HiMail} type="submit">
									Send message
								</Button>
							</form>
						</Modal>
					})
					}

				</div>
				)

				:

				<div className={`m-4 shadow-sm border borderColor px-4 py-3 h-64 p-4 rounded-lg bg-gradient-to-r dark:bg-purple_5
			${currentTheme ? colors.bg[currentTheme].light : "bg-purple_5"}
			`}>
					<h4
						className={`font-normal text-white text-sm px-2 rounded-lg mb-1.5  dark:bg-purple-800 inline-block ${currentTheme ? colors.bg[currentTheme].dark : "bg-purple-800"
							}`}
					>
						{/* {idx} */}
					</h4>
					<div className="grid grid-cols-2 gap-6">
						<div>
							<p className="font-bold dark:text-zinc-300 text-4xl text-slate-900 font-serif pb-1">
								{name.name}
							</p>
							<p className="font-normal dark:text-zinc-300 text-slate-900 pb-1 font-sans">
								MAX {name.percent_limit}% or ₹{name.amount_limit}
							</p>
							<p className="font-normal dark:text-zinc-300 text-xl text-white-900 pb-1 font-sans">
								Min cart value ₹{name.cart_limit}
							</p>
						</div>
						<div className="float-right">
							{name && (
								<p className={`font-bold dark:text-zinc-200 text-3xl text-slate-700 font-sans pb-2`}>
									{name.dynamic_coupen ? name.dynamic_coupen[0] : name.coupens_static}
								</p>
							)}
							<p className="font-normal dark:text-zinc-300 text-slate-900 font-sans">
								Coupon Expires {name.valid_date}
							</p>
						</div>
					</div>
					{/* {children} */}

				</div>
			}

			{ }
		</>
	)
};

export default CardSmall;
