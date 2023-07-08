import axios from "./axios"
import axios2 from "./axiosMultiPartForm"

// Allowances
export const getAllAllowances = async () => {
	const res = await axios.get("/finances/allowances/")
	return res.data
}
export const addNewAllowance = async (data) => {
	const res = await axios.post("/finances/allowances/", data)
	return res.data
}
export const getAllowanceDetail = async (data) => {
	const res = await axios.get(`/finances/allowances/${data}/`)
	return res.data
}
export const modifyAllowance = async (data) => {
	const res = await axios.patch(
		`/finances/allowances/${data.id}/`,
		data.content
	)
	return res.data
}
export const removeAllowance = async (data) => {
	const res = await axios.delete(`/finances/allowances/${data}/`)
	return res.data
}

// Deductions
export const getAllDeductions = async () => {
	const res = await axios.get("/finances/deductions/")
	return res.data
}
export const addNewDeductions = async (data) => {
	const res = await axios.post("/finances/deductions/", data)
	return res.data
}
export const getDeductionDetail = async (data) => {
	const res = await axios.get(`/finances/deductions/${data}/`)
	return res.data
}
export const modifyDeduction = async (data) => {
	const res = await axios.patch(
		`/finances/deductions/${data.id}/`,
		data.content
	)
	return res.data
}
export const removeDeduction = async (data) => {
	const res = await axios.delete(`/finances/deductions/${data}/`)
	return res.data
}

// Employee <--- Finances { Allowance }
export const getEmployeeAllowance = async (data) => {
	const res = await axios.get(`/finances/allowances/${data}/`)
	return res.data
}
export const addEmployeeAllowance = async (data) => {
	const res = await axios.post(`/finances/allowances/${data.id}/`, data.content)
	return res.data
}
export const getEmployeeAllowanceDetail = async (data) => {
	const res = await axios.get(
		`/finances/allowances/${data.employeeId}/${data.allowanceId}/`
	)
	return res.data
}
export const modifyEmployeeAllowance = async (data) => {
	const res = await axios.patch(
		`/finances/allowances/${data.employeeId}/${data.allowanceId}/`,
		data.content
	)
	return res.data
}
export const removeEmployeeAllowance = async (data) => {
	const res = await axios.delete(
		`/finances/allowances/${data.employeeId}/${data.allowanceId}/`
	)
	return res.data
}

// Employee <--- Finances { Allowance }
export const getEmployeeDeductions = async (data) => {
	const res = await axios.get(`/finances/deductions/${data}/`)
	return res.data
}
export const addEmployeeDeduction = async (data) => {
	const res = await axios.post(`/finances/deductions/${data.id}/`, data.content)
	return res.data
}
export const getEmployeeDeductionDetail = async (data) => {
	const res = await axios.get(
		`/finances/deductions/${data.employeeId}/${data.deductionId}/`
	)
	return res.data
}
export const modifyEmployeeDeduction = async (data) => {
	const res = await axios.patch(
		`/finances/deductions/${data.employeeId}/${data.deductionId}/`,
		data.content
	)
	return res.data
}
export const removeEmployeeDeduction = async (data) => {
	const res = await axios.delete(
		`/finances/deductions/${data.employeeId}/${data.deductionId}/`
	)
	return res.data
}

// Employee <--- Earnings
export const getEmployeeEarnings = async (data) => {
	const res = await axios.get(`/finances/earning/${data}/`)
	return res.data
}
export const modifyEmployeeEarnings = async (data) => {
	const res = await axios.patch(
		`/finances/earning/${data.userId}/`,
		data.content
	)
	return res.data
}

// Employee <--- Payroll
export const getEmployeePayroll = async (data) => {
	const res = await axios.get(
		`/finances/payroll/${data.userId}/?month=${data.month}&year=${data.year}`
	)
	return res.data
}

// Expenses
export const getAllExpenses = async (data) => {
	const res = await axios.get(`/finances/expenses/?cleared=${data || ""}`)
	return res.data
}
export const getExpensesByEmployee = async (data) => {
	const res = await axios.get(`/finances/expenses/${data}/`)
	return res.data
}
export const getExpensesDetails = async (data) => {
	const res = await axios.get(`/finances/expenses/${data}/`)
	return res.data
}
export const modifyExpenses = async (data) => {
	const res = await axios.patch(`/finances/expenses/${data.id}/`, data.content)
	return res.data
}

// Expenses (when employee logged in)
export const getAllExpensesEmployee = async (data) => {
	const res = await axios.get(`/employee/expenses/?cleared=${data}`)
	return res.data
}
export const addNewExpenseEmployee = async (data) => {
	const res = await axios2.post(`/employee/expenses/`, data)
	return res.data
}
export const modifyNewExpenseEmployee = async (data) => {
	const res = await axios2.patch(`/employee/expenses/${data.id}/`, data.content)
	return res.data
}
export const getEmployeeExpenseDetails = async (data) => {
	const res = await axios.get(`/employee/expenses/${data}/`)
	return res.data
}
