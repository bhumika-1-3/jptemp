import { AiFillFire } from "react-icons/ai";
import { useEffect, useState } from "react";
import "flowbite";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const UserNavCard = ({ name, email, logout }) => {
  const [counter, setCounter] = useState(0);
  const googleTranslateElementInit = () => {
		new window.google.translate.TranslateElement(
		  {
			pageLanguage: "en",
			includedLanguages: "hi,en,bn,fr,mr,gu,ur,te,ta,sd,sa,pa,or,mr,ml",
			layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
		  },
		  "google_translate_element"
		);
	  };
	  useEffect(() => {
		if (counter === 1) {
		  var addScript = document.createElement("script");
		  addScript.setAttribute(
			"src",
			"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
		  );
		  document.body.appendChild(addScript);
		  window.googleTranslateElementInit = googleTranslateElementInit;
		  setCounter(2);
		}
		setCounter(1);
	  }, [counter]);

  return (
    <div>
      <div className="px-2 py-1 rounded-md border borderColor bg-white dark:bg-purple_5 flex md:items-center md:flex-row flex-col">
      <div className="flex items-center">
              <div className="flex border border-purple-200 rounded">
                  <input
                      type="text"
                      className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Search..."
                  />
                  <button
                  onClick={logout}
                  className="px-2 py-1 rounded-md border-none bg-purple-600 text-slate-100 text-base font-bold md:mt-0 mt-2">
                  Search
                </button>
              </div>
              <div
              id="tooltip-default"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Tooltip content
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <div>
            <h4 className="text-sm text-slate-700 dark:text-slate-200 font-semibold">
              {!name.includes("undefined") ? name : "Name"}
            </h4>
            <span className="text-sm text-slate-400 font-normal -mt-1 block">
              {/* {email || "example@email.com"} */}
              <div id="google_translate_element"></div>
            </span>
          </div>
        </div>
        
        
      </div>
        <div className="flex items-center mr-3">
          {/* <AiFillFire className="h-8 w-8 block mr-2 text-yellow-400 dark:text-slate-500" />
          <button
            data-tooltip-target="tooltip-default"
            data-tooltip-placement="bottom"
            className="text-slate-600"
            style={{ transform: "translateX(-10px)" }}>
            9
          </button> */}
          
      </div>
    </div>
    
  );
};

export default UserNavCard;
