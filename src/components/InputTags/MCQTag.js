import React, { useState } from "react";
import Swal from "sweetalert2";
const MCQTag = ({
  value,
  label,
  onChange,
  type,
  placeholder,
  Icon,
  notRequired,
  bgWhite,
  number,
  ques,
  correct,
}) => {
  var total = localStorage.getItem("total");
  var attempt = localStorage.getItem("attempt");
  const [color, setColor] = useState("bg-gray-200");
  return (
    <div className="w-full px-2">
      <div className="relative w-full mb-3">
        <button
          placeholder={placeholder}
          required={!notRequired ? true : false}
          value={value}
          onClick={() => {
            if (value == correct) {
              setColor("green");
              localStorage.setItem("total", total + 1);
              localStorage.setItem("attempt", attempt + 1);
            } else {
              setColor("red");
              localStorage.setItem("attempt", attempt + 1);
            }
          }}
          type={type}
          min={0}
          className={`${
            color == "green" ? "bg-green-400 text-white" : "bg-gray-200"
          } ${
            color == "red" ? "bg-red-400 text-white" : "bg-gray-200"
          }  border-0 px-3 text-left py-3 placeholder-blueGray-300 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200 ${
            bgWhite ? "bg-white" : "bg-gray-200"
          } dark:bg-transparent dark:border rounded-md text-sm shadow-sm outline-none w-full ease-linear transition-all duration-150`}>
          {value}
        </button>
      </div>
    </div>
    // <div className="w-full">
    // 	<div className="relative w-full mb-3">
    // 		<label className=" text-slate-700 dark:text-slate-300 text-sm font-normal mb-2 flex items-center">
    // 			{Icon && <Icon className="mr-2" />}
    // 			{label}
    // 			{!notRequired && (
    // 				<span className="text-red-500 font-extrabold ml-1 text-md">*</span>
    // 			)}
    // 		</label>
    // 		<input
    // 			placeholder={placeholder}
    // 			required={!notRequired ? true : false}
    // 			value={value}
    // 			onChange={onChange}
    // 			type={type}
    // 			className="border-0 px-3 py-3 placeholder-blueGray-300 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200 bg-white dark:bg-transparent dark:border rounded text-sm shadow-cardShadow outline-none w-full ease-linear transition-all duration-150"
    // 		/>
    // 	</div>
    // </div>
  );
};

export default MCQTag;
