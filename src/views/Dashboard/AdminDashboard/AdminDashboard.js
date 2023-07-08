import { useEffect } from "react";
import { BigText, RenderIf } from "../../../components";
import Attendance from "./components/Attendance";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGenderData,
  fetchBloodGroupData,
  fetchLeavesData,
} from "../../../store/slices/charts/chartsSlice";
import PieChart from "./components/Charts/PieChart";
import ChartCard from "./components/ChartCard";
import BarChart from "./components/Charts/BarChart";
import { EmailSend } from "../../Auth/EmailSend";
import { Link } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { RiProfileLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import addNotification from "react-push-notification";
import Prices from "./Prices";

const AdminDashboard = () => {
  // const { isLoading, genderData, leavesData, bloodGroupData } = useSelector(
  //   (state) => state.charts
  // );
  // console.log(genderData);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchGenderData());
  //   dispatch(fetchLeavesData());
  //   dispatch(fetchBloodGroupData());
  // }, [dispatch]);

  const buttonClick = () => {
    addNotification({
      title: "Your coupon limit is about to expire",
      subtitle: "Your coupon limit is about to expire",
      message: "Renew to continue",
      theme: "darkblue",
      native: true, // when using native, your OS will handle theming.
    });
  };
  const { currentTheme, colors } = useSelector((state) => state.theme);
  const activeLink = `items-center text-sm capitalize py-2 px-2 my-1 font-semibold flex ${currentTheme ? colors.text[currentTheme].dark : "text-purple-700"
    }  ${currentTheme ? colors.bg[currentTheme].medium : "bg-purple-300"
    } dark:bg-purple-900 dark:text-slate-200 rounded-md duration-300`;
  const inActiveLink = `items-center text-sm capitalize py-2 px-2 my-1 font-semibold flex text-slate-700 dark:text-slate-300 ${currentTheme ? colors.bg[currentTheme].hover : "hover:bg-purple-300"
    } dark:hover:bg-purple-900  hover:rounded-md duration-300`;

  function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        // handle success
        console.log('File uploaded successfully');
      })
      .catch(error => {
        // handle error
        console.error('Error uploading file:', error);
      });
  }
  function handleFileUpload(event) {
    const file = event.target.files[0];
    uploadFile(file);
  }
  return (
    <div>
      {/* <BigText onMouseOver={buttonClick}>Profile</BigText> */}
      <div className="page">
        <button onMouseOver={buttonClick} className="p-2 text-3xl">
          Content Creator
        </button>
      </div>
      <section className="pt-1 bg-blueGray-50">
        <div className="w-full md px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6 rounded-lg border-2 border-slake-200">
              <div className="flex flex-wrap">
                <div className="grid grid-cols-2 gap-10 justify-between">
                  <div className="w-full px-4 flex justify-start">
                    {/* <div className=""> */}
                    <img
                      alt="..."
                      src="https://media.istockphoto.com/id/653952640/vector/p-logo-hipster-letter-black-and-white-monogram-simple-overlapping-minimalistic-style-ribbon.jpg?s=612x612&w=0&k=20&c=ggLqfidJSfwPFEqtyC78sJ4BtYUcJ7_lkWzCJDYPsh8="
                      className="shadow-xl rounded-full align-left float-left border-none h-56 w-56 mt-2"
                    />
                    {/* </div> */}
                  </div>
                  <div className="justify-center mt-5">
                    <h3 className="text-5xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                      Kavita Kumar
                    </h3>
                    <div className="text-lg leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      <CgProfile className="mr-1 inline" />
                      @physicsWallah
                    </div>
                    <div className="text-lg leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      <RiProfileLine className="mr-1 inline" />
                       Grades
                    </div>
                   {/* <div className="text-lg leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      <CgProfile className="mr-1 inline" />
                      Pan - ABCTY1234D
                    </div> */}
                  </div>
                </div>
                {/* <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src="https://pbs.twimg.com/profile_images/3234971560/c024c9660698fd91133a417c4831810a_400x400.png"
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                    {/* </div> */}
              </div>
              <div className="w-full px-4 text-center mt-20">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-5 p-3 text-center">
                    <span className="text-3xl font-bold block uppercase tracking-wide text-blueGray-600">
                      220
                    </span>
                    <span className="text-xl text-blueGray-400">Videos</span>
                  </div>
                  <div className="mr-5 p-3 text-center ml-7">
                    <span className="text-3xl font-bold block uppercase tracking-wide text-blueGray-600">
                      10
                    </span>
                    <span className="text-xl text-blueGray-400">Subjects</span>
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <span className="text-3xl font-bold block uppercase tracking-wide text-blueGray-600">
                      5
                    </span>
                    <span className="text-xl text-blueGray-400">Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
