import { useState, useEffect } from "react";
import data from "../../../MCQdata/data";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  HiUserGroup,
  HiGlobeAlt,
  HiPlusCircle,
  HiHashtag,
  HiPlus,
} from "react-icons/hi";
import {
  organizationDetails,
  updateOrganization,
  organizationLocations,
  createOrganizationLocation,
  updateOrganizationLocation,
  toastReset,
} from "../../../store/slices/organization/organizationSlice";
import { allCities } from "../../../store/slices/location/locationSlice";
import {
  BigText,
  SectionHeader,
  Button,
  WrapperModal,
  Modal,
  InputTag,
  SubHeading,
  LoadingSpinner,
  RenderIf,
  AddressCard,
  FadedText,
  SelectTag,
} from "../../../components";
import DataTag from "../../../components/InputTags/dataTag";
import MCQTag from "../../../components/InputTags/MCQTag";
import Swal from "sweetalert2";
import PieChart from "../AdminDashboard/components/Charts/PieChart";

const OrganizationDetails = () => {
  var total = 0;
  var attempt = 0;
  var { id } = useParams();
  localStorage.setItem("total", 0);
  localStorage.setItem("attempt", 0);
  const navi = useNavigate();
  const { orgID } = useParams();
  const [counter, setCounter] = useState(60);
  const gender = [
    { id: 0, name: "Unspecified" },
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Others" },
  ];
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter == 0) {
      if (id < 6) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Time Over!",
          footer: "",
        }).then((result) => {
          if (result.isConfirmed) {
            navi("/admin/organizations/");
            // Swal.fire(
            // 	{`Score`}
            // 	'success'
            // )
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: (
            <PieChart
              labels={["Jan", "Feb", "march", "April"]}
              colors={["#EED180", "#FFDEB4", "#FF8FB1", "#B7D3DF"]}
              dataSet={gender}></PieChart>
          ),
          footer: "",
        }).then((result) => {
          if (result.isConfirmed) {
            navi("/admin/organizations/");
            // Swal.fire(
            // 	{`Score`}
            // 	'success'
            // )
          }
        });
      }
    }
    total = localStorage.getItem("total");
    attempt = localStorage.getItem("attempt");
    return () => clearInterval(timer);
  }, [counter, total, attempt]);

  // useEffect(() => {
  // 	if (showToast) {
  // 		toast[success ? "success" : "error"](message)
  // 	}
  // 	return () => dispatch(toastReset())
  // }, [showToast, message, dispatch, success])

  // if (isLoading || locationLoading) {
  // 	return <LoadingSpinner />
  // }

  return (
    <div>
      <span className="text-red-800 text-lg">
        Score: {total} / {attempt}
      </span>
      <SectionHeader>
        {counter >= 10 ? (
          <span className="text-green-800 text-lg">
            Time Remaining: {counter}
          </span>
        ) : (
          <span className="text-red-800 text-lg">
            Time Remaining: {counter}
          </span>
        )}
      </SectionHeader>

      {data.map((i) => {
        return i.id == orgID ? (
          i.Questions.map((q) => {
            return (
              <div key={i.id}>
                <DataTag label={q.que}></DataTag>
                {q.op1.map((ans) => {
                  return (
                    <MCQTag
                      ques={i.Questions.length}
                      value={ans}
                      correct={q.correct}></MCQTag>
                  );
                })}
                <br />
              </div>
            );
          })
        ) : (
          <></>
        );
      })}
      <Button
        onClick={() => {
          if (id < 6) {
            Swal.fire({
              icon: "success",
              title: "Test Over... you have scored 2",
              footer: "",
            }).then((result) => {
              if (result.isConfirmed) {
                navi("/admin/organizations/");
                // Swal.fire(
                // 	{`Score`}
                // 	'success'
                // )
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              html: `<PieChart labels={["Jan", "Feb", "march", "April"]}
							colors={["#EED180", "#FFDEB4", "#FF8FB1", "#B7D3DF"]}
							dataSet={gender}
						></PieChart>`,
              footer: "",
            }).then((result) => {
              if (result.isConfirmed) {
                navi("/admin/organizations/");
                // Swal.fire(
                // 	{`Score`}
                // 	'success'
                // )
              }
            });
          }
        }}>
        submit
      </Button>
    </div>
  );
};

export default OrganizationDetails;
