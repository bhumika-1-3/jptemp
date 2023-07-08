import { AiFillFire } from "react-icons/ai";
import "flowbite";
const UserNavCard = ({ name, email, logout }) => {
  return (
    <div className="px-2 py-1 rounded-md border borderColor bg-white dark:bg-purple_5 flex md:items-center md:flex-row flex-col">
      <div className="flex items-center mr-3">
        {/* <AiFillFire className="h-8 w-8 block mr-2 text-yellow-400 dark:text-slate-500" />
        <button
          data-tooltip-target="tooltip-default"
          data-tooltip-placement="bottom"
          className="text-slate-600"
          style={{ transform: "translateX(-10px)" }}>
          9
        </button> */}
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
            {email || "example@email.com"}
          </span>
        </div>
      </div>
      <button
        onClick={logout}
        className="px-2 py-1 rounded-md border-none bg-purple-600 text-slate-100 text-base font-bold md:mt-0 mt-2">
        Logout
      </button>
    </div>
  );
};

export default UserNavCard;
