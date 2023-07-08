/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaUserTie, FaBook } from "react-icons/fa";
import {
  HiUserGroup,
  HiMenuAlt2,
  HiCurrencyRupee,
  HiOfficeBuilding,
  HiSearch,
  HiHome,
  HiCube,
} from "react-icons/hi";
import { AiFillSchedule } from "react-icons/ai";
import { RiCoupon3Line } from "react-icons/ri"
import { GrUpdate } from "react-icons/gr"
import { MdCancel, MdVideoCall } from "react-icons/md";
import { BsFileEarmarkTextFill, BsBarChartLineFill } from "react-icons/bs";
import { IoMdAnalytics, IoBarChartSharp } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";
import { FaRobot, FaCalendarTimes } from "react-icons/fa";
import { MdOutlineAutoGraph } from "react-icons/md";
import axios from "../../Services/axios";
// import ImProfile from "react-icons/im"
// import NotificationDropdown from "../Dropdowns/NotificationDropdown"
// import UserDropdown from "../Dropdowns/UserDropdown"
import { ThemeToggle } from "..";
import UserNavCard from "../Cards/UserNavCard";
import { employeeProfile } from "../../store/slices/employee/employeeSlice";
import { logout } from "../../store/slices/auth/authSlice";
import RenderIf from "../RenderIf/RenderIf";
import { Image } from "@mui/icons-material";
import AlanHooks from "../../AlanHooks";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const { isAdmin } = useSelector((state) => state.auth);
  const { currentTheme, colors } = useSelector((state) => state.theme);
  // const { profile } = useSelector((state) => state.employee)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const activeLink = `items-center text-sm capitalize py-2 px-2 my-1 font-semibold flex ${currentTheme ? colors.text[currentTheme].dark : "text-purple-700"
    }  ${currentTheme ? colors.bg[currentTheme].medium : "bg-purple-300"
    } dark:bg-purple-900 dark:text-slate-200 rounded-md duration-300`;
  const inActiveLink = `items-center text-sm capitalize py-2 px-2 my-1 font-semibold flex text-slate-700 dark:text-slate-300 ${currentTheme ? colors.bg[currentTheme].hover : "hover:bg-purple-300"
    } dark:hover:bg-purple-900  hover:rounded-md duration-300`;


  const role = "user"

  return (
    <>
      <nav
        className={`md:left-0 md:block md:fixed md:top-0 md:bottom-0  md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden  dark:bg-transparent flex flex-wrap items-center justify-between md:w-64 md:py-2 pt-4 pb-4 px-3 md:px-4 border-r borderColor border-b borderColor ${currentTheme ? colors.bg[currentTheme].light : "bg-gray-100"
          }`}>
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Brand */}
          <Link
            style={{
              fontFamily: "Roxierossa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="md:mt-4 md:block inline-block text-left text-purple_1 dark:border-purple-700 dark:text-slate-200 mr-0 whitespace-nowrap text-xl font-semibold"
            to="/dashboard/">
            <img
              src="https://static.wixstatic.com/media/61a490_f032997414ae410ca1c6154b51c1e6b0~mv2.png/v1/crop/x_0,y_8,w_649,h_680/fill/w_89,h_94,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/JEETfinalLOGO.png"
              style={{ height: "50px", width: "50px" }}
            />
          </Link>

          {/* Toggler */}
          <button
            className="cursor-pointer md:hidden bg-transparent border-none"
            type="button"
            onClick={() => setCollapseShow(true)}>
            <HiMenuAlt2 className="text-slate-700 w-7 h-7 dark:text-slate-100 " />
          </button>

          {/* Collapse */}
          {collapseShow && (
            <div
              onClick={() => setCollapseShow(false)}
              className="fixed top-0 left-0 w-full h-full bg-black z-20 opacity-40 duration-500"></div>
          )}
          <div
            className={`flex flex-col items-stretch md:opacity-100 md:relative md:left-0 md:mt-4 md:shadow-none z-40 overflow-y-auto overflow-x-hidden md:h-auto  flex-1 md:bg-transparent md:dark:bg-none dark:customPurpleBg md:w-auto ${currentTheme ? colors.bg[currentTheme].light : "bg-purple-100"
              } shadow-2xl fixed top-0 bottom-0 h-screen duration-300 ${collapseShow ? "left-0 w-64 px-4" : "-left-full w-64 "
              }`}>
            {/* Form */}
            <div className="md:hidden flex  mt-4">
              <form className="mr-2">
                <div className="">
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <HiSearch className="fas fa-search dark:text-slate-400 text-slate-600"></HiSearch>
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    className="border borderColor px-3 py-2 w-full placeholder-slate-500 text-slate-700 relative bg-purple_3/20 dark:customPurpleBg_2   rounded text-sm outline-none focus:outline-none pl-10"
                  />
                </div>
              </form>
              <ThemeToggle />
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full border-r borderColor" />
            {/* Heading */}

            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <h6 className="max-w-fit text-slate-500 text-sm capitalize font-bold block px-2 pb-2 border-b-2 border-b-slate-400 dark:border-b-slate-500 mb-2">
                Dashboard
              </h6>

              {/* <li key="home">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                  onClick={() => setCollapseShow(false)}
                  to="/admin/dashboard/">
                  <AiFillSchedule className="w-5 h-5 mr-2" />
                  Profile
                </NavLink>
              </li> */}
              <li key="organization">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                  onClick={() => setCollapseShow(false)}
                  // to="/admin/organizations">
                  to="/admin/dashboard/">
                  <AiFillSchedule className="w-5 h-5 mr-2" />
                  Profile
                </NavLink>
              </li>
              <h6 className="max-w-fit text-slate-500 text-sm capitalize font-bold block px-2 pb-2 border-b-2 border-b-slate-400 dark:border-b-slate-500 mb-2 mt-4">
                General
              </h6>

              {role == "moderator" ? (
                <span>
                  <li key="home">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? activeLink : inActiveLink
                      }
                      onClick={() => setCollapseShow(false)}
                      to="/admin/organizations">
                      <MdVideoCall className="w-5 h-5 mr-2" />
                      Review
                    </NavLink>
                  </li>
                  <li key="finance">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? activeLink : inActiveLink
                      }
                      onClick={() => setCollapseShow(false)}
                      to="/admin/finance">
                      <IoMdAnalytics className="w-5 h-5 mr-2" />
                      Feedback
                    </NavLink>
                  </li>
                </span>) : null}

              {role == "contentcreator" ? (
                <span>

                  <li key="home">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? activeLink : inActiveLink
                      }
                      onClick={() => setCollapseShow(false)}
                      to="/admin/organizations">
                      <MdVideoCall className="w-5 h-5 mr-2" />
                      Upload
                    </NavLink>
                  </li>
                  <li key="finance">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? activeLink : inActiveLink
                      }
                      onClick={() => setCollapseShow(false)}
                      to="/admin/organizations">
                      <IoMdAnalytics className="w-5 h-5 mr-2" />
                      Analysis
                    </NavLink>
                  </li>
                </span>
              ) : null}
              {role == "user" ? (
                <span>
                  <li key="home">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? activeLink : inActiveLink
                      }
                      onClick={() => setCollapseShow(false)}
                      to="/admin/organizations">
                      <MdVideoCall className="w-5 h-5 mr-2" />
                      Content
                    </NavLink>
                  </li>
                  <li key="finance">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? activeLink : inActiveLink
                      }
                      onClick={() => setCollapseShow(false)}
                      to="/admin/finance">
                      <IoMdAnalytics className="w-5 h-5 mr-2" />
                      Feedback
                    </NavLink>
                  </li>
                  <li key="groups">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? activeLink : inActiveLink
                      }
                      onClick={() => setCollapseShow(false)}
                      to="/admin/group">
                      <FaCalendarTimes className="w-5 h-5 mr-2" />
                      Dashboard
                    </NavLink>
                  </li>
                  <li key="users">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? activeLink : inActiveLink
                      }
                      onClick={() => setCollapseShow(false)}
                      to="/admin/users">
                      <GrUpdate className="w-5 h-5 mr-2" />
                      Extra
                    </NavLink>
                  </li>
                </span>
              )
                : null
              }
              {/* <li key="home">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                  onClick={() => setCollapseShow(false)}
                  to="/admin/organizations">
                  <MdVideoCall className="w-5 h-5 mr-2" />
                  Commnuication
                </NavLink>
              </li>
              <li key="finance">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                  onClick={() => setCollapseShow(false)}
                  to="/admin/finance">
                  <IoMdAnalytics className="w-5 h-5 mr-2" />
                  Analysis
                </NavLink>
              </li>
              <li key="groups">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                  onClick={() => setCollapseShow(false)}
                  to="/admin/group">
                  <FaCalendarTimes className="w-5 h-5 mr-2" />
                  Student Data
                </NavLink>
              </li>
              <li key="users">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                  onClick={() => setCollapseShow(false)}
                  to="/admin/users">
                  <GrUpdate className="w-5 h-5 mr-2" />
                  Update
                </NavLink>
              </li> */}
              {/* <li key="inventory">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                  onClick={() => setCollapseShow(false)}
                  to="/admin/inventory">
                  <BsFileEarmarkTextFill className="w-5 h-5 mr-2" />
                  Chat Bot
                </NavLink>
              </li> */}
              {/* <li key="interview">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                  onClick={() => setCollapseShow(false)}
                  to="/admin/posture">
                  <FaRobot className="w-5 h-5 mr-2" />
                  Posture
                  {/* <MdCancel
                      className="w-5 h-5 mr-2 ml-auto"
                      onClick={navigate("/admin/dashboard")}
                    /> */}
              {/* </NavLink>
              </li> */}
              {/* Employee in admin mode*/}
              {/* {isAdmin && (
								<SidebarSubmenu sidebarSubmenu={sidebarMenu.employee} />
							)} */}

              {/* Employee (Only visible to logged in employees) */}
              {/* {isEmployee && (
								<li key="dashboard">
									<NavLink
										className={({ isActive }) =>
											isActive ? activeLink : inActiveLink
										}
										onClick={() => setCollapseShow(false)}
										to="/dashboard/"
									>
										<HiViewGrid className="w-5 h-5 mr-2" />
										Dashboard
									</NavLink>
								</li>
							)} */}
              {/* {isEmployee && (
								<li key="employee">
									<NavLink
										className={({ isActive }) =>
											isActive ? activeLink : inActiveLink
										}
										onClick={() => setCollapseShow(false)}
										to="/dashboard/employee"
									>
										<FaUserTie className="w-5 h-5 mr-2" />
										Employee
									</NavLink>
								</li>
							)} */}
              {/* {isEmployee && (
								<li key={sidebarMenu.employee.submenu2.profile.name}>
									<NavLink
										className={({ isActive }) =>
											isActive ? activeLink : inActiveLink
										}
										to={sidebarMenu.employee.submenu2.profile.path}
									>
										<HiUserCircle className="w-5 h-5 mr-2" />
										{sidebarMenu.employee.submenu2.profile.name}
									</NavLink>
								</li>
							)}
							{isEmployee && (
								<li key={sidebarMenu.employee.submenu2.docs.name}>
									<NavLink
										className={({ isActive }) =>
											isActive ? activeLink : inActiveLink
										}
										to={sidebarMenu.employee.submenu2.docs.path}
									>
										<HiDocument className="w-5 h-5 mr-2" />
										{sidebarMenu.employee.submenu2.docs.name}
									</NavLink>
								</li>
							)}
							{isEmployee && (
								<li key={sidebarMenu.employee.submenu2.address.name}>
									<NavLink
										className={({ isActive }) =>
											isActive ? activeLink : inActiveLink
										}
										to={sidebarMenu.employee.submenu2.address.path}
									>
										<HiHome className="w-5 h-5 mr-2" />
										{sidebarMenu.employee.submenu2.address.name}
									</NavLink>
								</li>
							)}
							{isEmployee && (
								<li key={sidebarMenu.employee.submenu2.workExperiences.name}>
									<NavLink
										className={({ isActive }) =>
											isActive ? activeLink : inActiveLink
										}
										to={sidebarMenu.employee.submenu2.workExperiences.path}
									>
										<HiBriefcase className="w-5 h-5 mr-2" />
										{sidebarMenu.employee.submenu2.workExperiences.name}
									</NavLink>
								</li>
							)}
							{isEmployee && (
								<li key={sidebarMenu.employee.submenu2.education.name}>
									<NavLink
										className={({ isActive }) =>
											isActive ? activeLink : inActiveLink
										}
										to={sidebarMenu.employee.submenu2.education.path}
									>
										<HiAcademicCap className="w-5 h-5 mr-2" />
										{sidebarMenu.employee.submenu2.education.name}
									</NavLink>
								</li>
							)}
							{isEmployee && (
								<li key={sidebarMenu.employee.submenu2.dependents.name}>
									<NavLink
										className={({ isActive }) =>
											isActive ? activeLink : inActiveLink
										}
										to={sidebarMenu.employee.submenu2.dependents.path}
									>
										<TbFriends className="w-5 h-5 mr-2" />
										{sidebarMenu.employee.submenu2.dependents.name}
									</NavLink>
								</li>
							)} */}

              {/* Apps */}
              {/* <h6 className="max-w-fit text-slate-500 text-sm capitalize font-bold block px-2 pb-2 border-b-2 border-b-slate-400 dark:border-b-slate-500 mb-2 mt-4">
								Apps
							</h6> */}
              {/* Kanban board */}
              {/* <li key="kanban-board">
								<NavLink
									className={({ isActive }) =>
										isActive ? activeLink : inActiveLink
									}
									onClick={() => setCollapseShow(false)}
									to="/dashboard/kanban"
								>
									<HiViewBoards className="w-5 h-5 mr-2" />
									Kanban
								</NavLink>
							</li> */}
            </ul>

            <div className="md:hidden mt-12 mb-4">
              {/* <RenderIf isTrue={isEmployee}>
								<UserNavCard
									logout={logoutHandler}
									name={
										profile?.first_name +
										" " +
										profile?.middle_name +
										" " +
										profile?.last_name
									}
									email={profile?.email}
								/>
							</RenderIf> */}
              <RenderIf isTrue={isAdmin}>
                <UserNavCard
                  logout={logoutHandler}
                  name={adminInfo?.first_name || ""}
                  email={adminInfo?.email || ""}
                />
              </RenderIf>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
