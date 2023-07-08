import { useState, useTransition, Suspense } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../../../assets/styles/react-tabs.css";
import { LoadingSpinner } from "../../../components";

// Components
import Category from "./components/Category";
import Subcategory from "./components/Subcategory";
import Unit from "./components/Unit";
import Manufacturers from "./components/Manufacturers";
import Places from "./components/Places";
import Locations from "./components/Locations";
import Attributes from "./components/Attributes";
import Products from "./components/Products";
import Suppliers from "./components/Suppliers";
import Indents from "./components/Indents";
import Purchases from "./components/Purchases";
import { AiFillRobot } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
const Inventory = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [chat, chatlog] = useState([
    {
      user: "bot",
      message: "How can I help your preparation ?",
    },
  ]);
  const [chat2, chatlog2] = useState([
    {
      user: "me",
      message: "",
    },
  ]);
  const [input, setInput] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    // chatlog(chat.concat({ user: "me", message: input }));
    console.log(chat2);

    const res = await fetch(
      "http://127.0.0.1:8000/doubts/doubts/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
        }),
      }
    );

    const data = await res.json();
    console.log(data);
    const info = data.response;
    let temp = "These will help you " + info;
    // info.map((k) => {
    // 	return temp = temp + " " + k.url;
    // })
    // chatlog([...chat, { user: "bot", message: temp }])
    chatlog([
      ...chat,
      { user: "me", message: input },
      { user: "bot", message: temp },
    ]);
    setInput("");
    console.log(chat);
  };
  return (
    <form>
      <div className="grid grid-cols-2 gap-4">
        {chat.map((i) => {
          return i.user == "bot" ? (
            <div className="p-6 bg-gray-300/[0.4] rounded-md shadow-md ml-2">
              <div className="flex items-center text-sm justify-center h-10 w-10 rounded-full bg-purple-400 flex-shrink-0">
                <AiFillRobot className="text-lg "></AiFillRobot>
              </div>
              <span>{i.message}</span>
            </div>
          ) : (
            <div
              className="float-right p-6"
              style={{ transform: "translateX(220px)" }}>
              <div className="flex items-center justify-center text-sm h-10 w-10 text-white rounded-full bg-slate-900 flex-shrink-0">
                <FaUserAlt className="text-lg"></FaUserAlt>
              </div>

              <div>{i.message}</div>
            </div>
          );
        })}
      </div>
      <div
        className="grid p-3 sticky top-0 z-50 grid-cols-4 gap">
        <input
          className={`col-span-3 border-0 px-3 py-3 placeholder-blueGray-300 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200 
						bg-gray-200
					dark:bg-transparent dark:border rounded-md text-sm shadow-sm outline-none w-full ease-linear transition-all duration-150`}
          value={input}
          placeholder="Enter the query"
          onChange={(e) => setInput(e.target.value)}></input>
        <button
          className="text-lg px-4 text-gray-200 rounded-md bg-slate-700"
          onClick={handlesubmit}>
          Send
        </button>
      </div>
      {/* <div className="flex h-screen antialiased text-gray-800">
				<div className="flex flex-row w-full overflow-x-hidden">
					<div className="flex flex-col flex-auto ">
						<div
							className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
						>
							<div className="flex flex-col h-full overflow-x-auto mb-4">
								<div
									className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 flex-shrink-0"
								>
									<AiFillRobot className="text-lg"></AiFillRobot>
								</div>
								<div className="flex flex-col h-full">
									{
										chat.map((message, index) => {
											return <div>{message.message}</div>
										})
									}
								</div>
							</div>
							<div
								style={{ transform: "translateY(-43px)" }}
								className=" flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
							>
								<div className="flex-grow ml-4">
									<div className="relative w-full">
										<input
											type="text"
											onChange={(e) => setInput(e.target.value)}
											value={input}
											className="flex w-full border rounded-xl focus:outline-none focus:border-green-300 pl-4 h-10"
										/>
										<button
											className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
										>

										</button>
									</div>
								</div>
								<div className="ml-4">
									<button
										type="submit"
										className="flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
									>
										<span>Send</span>
										<span className="ml-2">

										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div> */}
      {/* </div> */}
    </form>
  );
};

const Chatmsg = ({ message }) => {
  <div className="col-start-1 col-end-8 p-3 rounded-lg">
    <div className="flex flex-row items-center">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 flex-shrink-0">
        <AiFillRobot className="text-lg"></AiFillRobot>
      </div>
      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
        <div>{message.message}</div>
      </div>
    </div>
  </div>;
};

export default Inventory;
