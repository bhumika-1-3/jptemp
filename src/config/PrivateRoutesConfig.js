import { Navigate } from "react-router-dom";
// Roles
import Roles from "./roles";

import Auth from "../layouts/Auth";
import Login from "../views/Auth/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Organizations from "../views/Dashboard/Organization/Organizations";
import AdminDashboard from "../views/Dashboard/AdminDashboard/AdminDashboard";
import AttendanceByDate from "../views/Dashboard/AdminDashboard/components/AttendanceByDate";
import OrganizationDetails from "../views/Dashboard/Organization/OrganizationDetails";
import Groups from "../views/Dashboard/Organization/Groups";
import RegisterEmployee from "../views/Dashboard/User/RegisterPage";
import GroupDetailsPage from "../views/Dashboard/Organization/GroupDetailsPage";
import Finance from "../views/Dashboard/Finance/Finance";
import AllowanceDetails from "../views/Dashboard/Finance/AllowanceDetails";
import DeductionDetails from "../views/Dashboard/Finance/DeductionDetails";
import EmployeeAllowanceDetails from "../views/Dashboard/Finance/EmployeeAllowanceDetails";
import EmployeeDeductionDetails from "../views/Dashboard/Finance/EmployeeDeductionDetails";
import Users from "../views/Dashboard/User/Users";
import BulkAttendance from "../views/Dashboard/User/BulkAttendance";
import EmployeeDetailsPage from "../views/Dashboard/User/EmployeeDetailsPage";
import EmployeeDashboard from "../views/Dashboard/Employee/EmployeeDashboard";
import Employee from "../views/Dashboard/Employee/Employee";
import EmployeeAddAllowancePage from "../views/Dashboard/User/EmployeeAddAllowancePage";
import EmployeeAddDeductionPage from "../views/Dashboard/User/EmployeeAddDeductionPage";
// Inventory
import Inventory from "../views/Dashboard/Inventory/Inventory";
import AddProducts from "../views/Dashboard/Inventory/AddProducts";
import ProductDetails from "../views/Dashboard/Inventory/ProductDetails";
import SupplierDetails from "../views/Dashboard/Inventory/SupplierDetails";
import AddIndents from "../views/Dashboard/Inventory/AddIndents";
import IndentDetails from "../views/Dashboard/Inventory/IndentDetails";
import PurchaseDetails from "../views/Dashboard/Inventory/PurchaseDetails";
import Posture from "../components/Posture/Posture.js";

const NavigateTo = () => {
  return <Navigate to="/auth/login" />;
};

const routes = [
  // auth
  {
    path: "/",
    component: NavigateTo,
  },
  {
    path: "/auth",
    component: NavigateTo,
  },
  {
    component: Auth,
    path: "/auth",
    children: [
      {
        component: Login,
        path: "login",
      },
    ],
  },
  // admin
  {
    component: DashboardLayout,
    path: "/admin",
    children: [
      {
        component: Organizations,
        path: "organizations",
      },
      {
        component: AdminDashboard,
        path: "dashboard",
      },
      {
        component: AttendanceByDate,
        path: "dashboard/attendance-by-date/:date",
      },
      {
        component: AttendanceByDate,
        path: "users/attendance-by-date/:date",
      },
      {
        component: OrganizationDetails,
        path: "organizations/organization-details/:orgID",
      },
      {
        component: RegisterEmployee,
        path: "users/register-employee",
      },
      {
        component: Groups,
        path: "group",
      },
      {
        component: GroupDetailsPage,
        path: "group/group-details/:groupID",
      },
      {
        component: Finance,
        path: "finance",
      },
      {
        component: AllowanceDetails,
        path: "finance/allowance-details/:allowanceId",
      },
      {
        component: DeductionDetails,
        path: "finance/deduction-details/:deductionId",
      },
      // {
      // 	component: EmployeeAllowanceDetails,
      // 	path: "finance/employee-allowance-details/:userId/:allowanceId",
      // },
      // {
      // 	component: EmployeeDeductionDetails,
      // 	path: "finance/employee-deduction-details/:userId/:deductionId",
      // },
      {
        component: Users,
        path: "users",
      },
      {
        component: BulkAttendance,
        path: "users/bulk-attendance",
      },
      {
        component: BulkAttendance,
        path: "dashboard/users/bulk-attendance",
      },
      {
        component: EmployeeDetailsPage,
        path: "users/employee-details/:userID",
      },
      {
        component: EmployeeAllowanceDetails,
        path: "users/employee-details/:userID/employee-allowance-details/:allowanceId",
      },
      {
        component: EmployeeDeductionDetails,
        path: "users/employee-details/:userID/employee-deduction-details/:deductionId",
      },
      {
        component: EmployeeAddAllowancePage,
        path: "users/employee-details/:userID/add-allowance",
      },
      {
        component: EmployeeAddDeductionPage,
        path: "users/employee-details/:userID/add-deduction",
      },
      // Inventory
      {
        component: Inventory,
        path: "inventory",
      },
      {
        component: AddProducts,
        path: "inventory/add-product",
      },
      {
        component: ProductDetails,
        path: "inventory/product-details/:id",
      },
      {
        component: SupplierDetails,
        path: "inventory/supplier-details/:id",
      },
      {
        component: AddIndents,
        path: "inventory/add-indents",
      },
      {
        component: IndentDetails,
        path: "inventory/indent-details/:id",
      },
      {
        component: PurchaseDetails,
        path: "inventory/purchase-details/:id",
      },
      {
        component: Posture,
        path: "posture/",
      },
    ],
  },
  // Employee
  {
    component: DashboardLayout,
    path: "/employee",
    permissions: [Roles.employee],
    children: [
      {
        component: EmployeeDashboard,
        path: "dashboard",
      },
      {
        component: Employee,
        path: "",
      },
    ],
  },
  // HR
  {
    component: DashboardLayout,
    path: "/hr",
    permissions: [Roles.hr],
    children: [
      {
        component: EmployeeDashboard,
        path: "dashboard",
      },
      {
        component: AttendanceByDate,
        path: "dashboard/attendance-by-date/:date",
      },
      {
        component: AttendanceByDate,
        path: "users/attendance-by-date/:date",
      },
      {
        component: RegisterEmployee,
        path: "users/register-employee",
      },
      {
        component: Finance,
        path: "finance",
      },
      {
        component: AllowanceDetails,
        path: "finance/allowance-details/:allowanceId",
      },
      {
        component: DeductionDetails,
        path: "finance/deduction-details/:deductionId",
      },
      {
        component: EmployeeAllowanceDetails,
        path: "users/employee-details/:userID/employee-allowance-details/:allowanceId",
      },
      {
        component: EmployeeDeductionDetails,
        path: "users/employee-details/:userID/employee-deduction-details/:deductionId",
      },
      {
        component: Users,
        path: "users",
      },
      {
        component: BulkAttendance,
        path: "users/bulk-attendance",
      },
      {
        component: BulkAttendance,
        path: "dashboard/users/bulk-attendance",
      },
      {
        component: EmployeeDetailsPage,
        path: "users/employee-details/:userID",
      },
      {
        component: Employee,
        path: "employee",
      },
      {
        component: EmployeeAllowanceDetails,
        path: "users/employee-details/:userID/employee-allowance-details/:allowanceId",
      },
      {
        component: EmployeeDeductionDetails,
        path: "users/employee-details/:userID/employee-deduction-details/:deductionId",
      },
      {
        component: EmployeeAddAllowancePage,
        path: "users/employee-details/:userID/add-allowance",
      },
      {
        component: EmployeeAddDeductionPage,
        path: "users/employee-details/:userID/add-deduction",
      },
    ],
  },
  // Inventory
  {
    component: DashboardLayout,
    path: "/inventory",
    permissions: [Roles.inventory],
    children: [
      {
        component: EmployeeDashboard,
        path: "dashboard",
      },
      {
        component: Inventory,
        path: "",
      },
      {
        component: AddProducts,
        path: "add-product",
      },
      {
        component: ProductDetails,
        path: "product-details/:id",
      },
      {
        component: Employee,
        path: "employee",
      },
    ],
  },
  // Finance
  {
    component: DashboardLayout,
    path: "/finance",
    permissions: [Roles.finance],
    children: [
      {
        component: EmployeeDashboard,
        path: "dashboard",
      },
      {
        component: Finance,
        path: "",
      },
      {
        component: AllowanceDetails,
        path: "allowance-details/:allowanceId",
      },
      {
        component: DeductionDetails,
        path: "deduction-details/:deductionId",
      },
      {
        component: Employee,
        path: "employee",
      },
    ],
  },
];

export default routes;
