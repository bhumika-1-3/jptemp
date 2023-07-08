import { useSelector } from "react-redux";
import { ThemeToggle } from "../../../components";
const includedFeatures = [
  "Quick coupons",
  "Campaign",
  "24/7 Service",
  "Realtime Analysis",
];

export default function Prices() {
  const { currentTheme, colors } = useSelector((state) => state.theme);
  const activeLink = `items-center text-sm capitalize py-2 px-2 my-1 font-semibold flex ${
    currentTheme ? colors.text[currentTheme].dark : "text-purple-700"
  }  ${
    currentTheme ? colors.bg[currentTheme].medium : "bg-purple-300"
  } dark:bg-purple-900 dark:text-slate-200 rounded-md duration-300`;
  const inActiveLink = `items-center text-sm capitalize py-2 px-2 my-1 font-semibold flex text-slate-700 dark:text-slate-300 ${
    currentTheme ? colors.bg[currentTheme].hover : "hover:bg-purple-300"
  } dark:hover:bg-purple-900  hover:rounded-md duration-300`;
  return (
    <div className="bg-white py-4 dark:bg-black-700">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Packages
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Get a yearly benefit at just rupees 349 which include the
              following benefits
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4
                className={`flex-none text-sm font-semibold leading-6 ${
                  currentTheme ? colors.text[currentTheme].dark : "bg-gray-100"
                }`}
              >
                What’s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <div
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  >
                    +
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Pay once, own it forever
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    Rs 349
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600"></span>
                </p>
                <button
                  href="#"
                  className={`mt-10 block w-full rounded-md  px-3 py-2 text-center text-sm font-semibold bg-black-300 text-white shadow-sm ${
                    currentTheme ? colors.bg[currentTheme].dark : "bg-gray-100"
                  }`}
                >
                  Get access
                </button>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
