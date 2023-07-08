import { useState, useRef } from "react"
import { HiCalendar, HiDocumentDownload, HiSearch } from "react-icons/hi"
import { useSelector, useDispatch } from "react-redux"
import { useReactToPrint } from "react-to-print"

import {
	LoadingSpinner,
	SubHeading,
	SectionHeader,
	InputTag,
	Button,
	RenderIf,
	FadedText,
} from "../../../components"
import { fetchEmployeePayroll } from "../../../store/slices/finance/financeSlice"

const EmployeePayroll = ({ userId }) => {
	const [payrollInfo, setPayrollInfo] = useState("")
	const payslipRef = useRef(null)
	const { isLoading, employeePayroll } = useSelector((state) => state.finance)
	const { employeeProfile } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const getPayrollHandler = (e) => {
		e.preventDefault()
		const onlyYear = new Date(payrollInfo).getFullYear()
		const onlyMonth = new Date(payrollInfo).getMonth()
		if (userId) {
			dispatch(
				fetchEmployeePayroll({
					userId: userId,
					month: onlyMonth + 1,
					year: onlyYear.toString(),
				})
			)
		}
	}

	const downloadPayslip = useReactToPrint({
		content: () => payslipRef.current,
	})

	if (isLoading) {
		return <LoadingSpinner />
	}
	return (
		<div>
			<SectionHeader text="Select month and year to get employee payroll information." />
			<form onSubmit={getPayrollHandler} className="max-w-md">
				<InputTag
					type="month"
					value={payrollInfo}
					onChange={(e) => setPayrollInfo(e.target.value)}
					label="Select month and year of the payroll"
					Icon={HiCalendar}
				/>
				<Button type="submit" Icon={HiSearch}>
					Get
				</Button>
			</form>

			<span className="block mt-4"></span>
			<RenderIf isTrue={employeePayroll && employeePayroll !== {}}>
				<SubHeading>Search Result</SubHeading>
				<div>
					<Button onClick={downloadPayslip} Icon={HiDocumentDownload}>
						Downlaod
					</Button>
				</div>

				<div
					ref={payslipRef}
					className="min-w-[894px] min-h-[1150px] bg-white shadow-xl border borderColor py-4 px-10 relative flex flex-col"
				>
					<h2 className="text-center text-2xl font-semibold mt-3">Payslip</h2>
					<div className="grid grid-cols-2 gap-4 mt-6">
						<div className="grid grid-cols-2">
							<div>
								<h4>Pay Period</h4>
								<h4>Paid Days</h4>
								<h4>Absent Days</h4>
								<h4>Total Working Days</h4>
								<h4>Leave Days</h4>
							</div>
							<div>
								<h4>
									: {employeePayroll?.month + " " + employeePayroll?.year}
								</h4>
								<h4>: {employeePayroll?.paid_days}</h4>
								<h4>: {employeePayroll?.absent_days}</h4>
								<h4>: {employeePayroll?.total_working_days}</h4>
								<h4>: {employeePayroll?.leave_days}</h4>
							</div>
						</div>
						<div className="grid grid-cols-2">
							<div>
								<h4>Employee name</h4>
								<h4>Designation</h4>
								<h4>Department</h4>
							</div>
							<div>
								<h4>
									:{" "}
									{(employeeProfile?.first_name || " ") +
										(employeeProfile?.middle_name || " ") +
										(employeeProfile?.last_name || " ")}
								</h4>
								<h4>: {employeeProfile?.designation?.name || "--"}</h4>
								<h4>: {employeeProfile?.department?.name || "--"}</h4>
							</div>
						</div>
					</div>

					<table className="table-auto w-full border-collapse mt-10">
						<thead>
							<tr className="bg-blue-100 border text-left px-8 py-4">
								<th className="border px-2 py-1">Earnings</th>
								<th className="w-[130px] border px-2 py-1">Amount</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border px-2 py-1">Gross salary</td>
								<td className="border px-2 py-1">
									&#8377; {employeePayroll?.gross_salary}
								</td>
							</tr>
							<tr>
								<td className="border px-2 py-1">Basic salary</td>
								<td className="border px-2 py-1">
									&#8377; {employeePayroll?.basic_salary}
								</td>
							</tr>
							<tr>
								<td className="border px-2 py-1 font-semibold">
									{"<---- Allowance ---->"}
								</td>
								<td className="border px-2 py-1">{"--"}</td>
							</tr>
							{/* Allowances */}
							{employeePayroll?.allowances?.map((item) => (
								<tr>
									<td className="border px-2 py-1">{item?.allowance?.name}</td>
									<td className="border px-2 py-1">
										&#8377; {item?.allowance_amount}
									</td>
								</tr>
							))}
							<tr>
								<td className="border px-2 py-1">Total allowance</td>
								<td className="border px-2 py-1">
									&#8377; {employeePayroll?.total_allowance}
								</td>
							</tr>
							<tr>
								<td className="border px-2 py-1">Other allowance</td>
								<td className="border px-2 py-1">
									&#8377; {employeePayroll?.other_allowance}
								</td>
							</tr>
							<tr className="bg-slate-100">
								<td className="border px-2 py-1">Total earnings</td>
								<td className="border px-2 py-1">
									&#8377; {employeePayroll?.total_earning}
								</td>
							</tr>
							{/* Deductions */}
							<tr>
								<td className="border px-2 py-1 font-semibold">
									{"<---- Deductions ---->"}
								</td>
								<td className="border px-2 py-1">{"--"}</td>
							</tr>

							{employeePayroll?.deductions?.map((item) => (
								<tr>
									<td className="border px-2 py-1">{item?.deduction?.name}</td>
									<td className="border px-2 py-1">
										- &#8377; {item?.deduction_amount}
									</td>
								</tr>
							))}
							<tr>
								<td className="border px-2 py-1">Total deductions</td>
								<td className="border px-2 py-1">
									- &#8377; {employeePayroll?.total_deduction}
								</td>
							</tr>

							<tr className="bg-green-200 font-semibold ">
								<td className="border px-2 py-1">
									{"<----"} Net salary {"---->"}
								</td>
								<td className="border px-2 py-1">
									&#8377; {employeePayroll?.net_salary}
								</td>
							</tr>
						</tbody>
					</table>

					<div className="flex justify-between mt-36 mx-5">
						<div className="w-[220px] h-[100px] border-b-2 border-b-slate-400 text-center">
							Employer Signature
						</div>
						<div className="w-[220px] h-[100px] border-b-2 border-b-slate-400 text-center">
							Employee Signature
						</div>
					</div>

					<p className="text-xs text-slate-400 uppercase font-semibold block py-4 mt-auto text-center">
						This is a system generated payslip
					</p>
				</div>
			</RenderIf>
			<RenderIf isTrue={!employeePayroll || employeePayroll === {}}>
				<FadedText>No payroll found</FadedText>
			</RenderIf>
			{/* <RenderIf isTrue={employeePayroll && employeePayroll !== {}}> */}
		</div>
	)
}

export default EmployeePayroll
