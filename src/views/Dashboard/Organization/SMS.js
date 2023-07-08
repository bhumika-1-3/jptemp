import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { HiPlus, HiUserGroup, HiDocumentSearch } from "react-icons/hi";
import { HiPlusCircle, HiQuestionMarkCircle, HiMail } from "react-icons/hi";
import { FiType } from "react-icons/fi";
import DatePicker from "react-datepicker";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

import {
  Button,
  Modal,
  SectionHeader,
  InputTag,
  TransitionBtoT,
} from "../../../components";
import {
  allOrganization,
  createOrganization,
  toastReset,
} from "../../../store/slices/organization/organizationSlice";
import {
  WrapperModal,
  SubHeading,
  CardSmall,
  FadedText,
  LoadingSpinner,
} from "../../../components";
var axios = require("axios");

const SMS = ({ temp, id, type }) => {
  const [showModal, setShowModal] = useState(false);
  const [orgName, setOrgName] = useState("");
  const { showToast, message, success, isLoading, organizations } = useSelector(
    (state) => state.organization
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orgCreateHandler = (e) => {
    e.preventDefault();
    dispatch(createOrganization({ name: orgName }));
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(allOrganization());
  }, [dispatch]);

  useEffect(() => {
    if (showToast) {
      toast[success ? "success" : "error"](message);
    }
    return () => dispatch(toastReset());
  }, [showToast, message, dispatch, success]);

  // if (isLoading) {
  // 	return <LoadingSpinner />
  // }
  const [couponData, setCoupon] = useState({
    name: "om",
    cart_limit: "2000",
    category: "food",
    amount_limit: "100",
    percent_limit: "20",
    valid_date: "",
    code: "TRY",
    numberOfcoupens: "2",
    lengthofcode: "5",
    is_static: false,
    limit_coupens: "10",
  });

  const [startDate, setStartDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState("");

  const creatingCoupon = (e) => {
    e.preventDefault();

    console.log(startDate, selectedValue);
    const date = new Date(startDate); // Convert seconds to milliseconds
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero to month
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero to day

    if (selectedValue == "Static") {
      console.log("static");
      console.log(year + '-' + month + '-' + day);

      var data1 = JSON.stringify({
        name: couponData.name,
        is_static: true,
        cart_limit: couponData.cart_limit,
        category: couponData.category,
        amount_limit: couponData.amount_limit,
        percent_limit: couponData.percent_limit,
        valid_date: year + '-' + month + '-' + day,
        code: couponData.code,
        numberOfcoupens: parseInt(couponData.numberOfcoupens),
        lengthofcode: parseInt(couponData.lengthofcode),
        limit_coupens: couponData.limit_coupens,
      });

      var config = {
        method: "post",
        url: "http://127.0.0.1:8000/coupons/static-create/",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc4ODA4NjY1LCJpYXQiOjE2Nzg1NDk0NjUsImp0aSI6ImVhZWY5YzRhOGNiZDRhMDRiNDFjYjI3OGMwMTIwODA3IiwidXNlcl9pZCI6MX0.rRjJVtJjbjeFeTiDOj_ldOQpZqymlcma6YIrCOCFlUI",
          "Content-Type": "application/json",
        },
        data: data1,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          toast("New Coupon added , start earning :)");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      var data2 = JSON.stringify({
        name: couponData.name,
        is_static: false,
        cart_limit: couponData.cart_limit,
        category: couponData.category,
        amount_limit: couponData.amount_limit,
        percent_limit: couponData.percent_limit,
        valid_date: year + "-" + month + "-" + day,
        code: couponData.code,
        numberOfcoupens: parseInt(couponData.numberOfcoupens),
        lengthofcode: parseInt(couponData.lengthofcode),
        limit_coupens: couponData.limit_coupens,

      });

      var config2 = {
        method: "post",
        url: "http://127.0.0.1:8000/coupons/dynamic-create/",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc4ODA4NjY1LCJpYXQiOjE2Nzg1NDk0NjUsImp0aSI6ImVhZWY5YzRhOGNiZDRhMDRiNDFjYjI3OGMwMTIwODA3IiwidXNlcl9pZCI6MX0.rRjJVtJjbjeFeTiDOj_ldOQpZqymlcma6YIrCOCFlUI",
          "Content-Type": "application/json",
        },
        data: data2,
      };

      axios(config2)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          toast("New Coupon added , start earning :)");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  function handleSelectChange(e) {
    setSelectedValue(e.target.value);
  }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);
    emailjs
      .sendForm(
        "service_n1w3bwk",
        "template_i8ncuco",
        form.current,
        "7Fm1eXPkrfYXUPgwt"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  console.log(temp[0]);
  console.log(temp[1]);

  return (
    <>
      <SectionHeader>
        <Modal
          title="Add new coupon"
          className="float-right"
          activator={({ setShow }) => (
            <Button Icon={HiPlusCircle} onClick={() => setShow(true)}>
              Add
            </Button>
          )}
        >
          <form style={{ display: "none" }} ref={form}>
            <input type="text" name="from_name" value="Om Shukla" />
            <input
              type="email"
              name="reply_to"
              value="bhumikamange13@gmail.com"
            />
            <input
              name="message"
              value="You have received new coupon check it out"
            />
          </form>
          <form onSubmit={creatingCoupon}>
            {/* <InputTag
							label="Notes"
							type="file"
							// placeholder="Enter deduction name"
							// value={newDeduction.name}
							onChange={(e) =>
								setFile(() => e.target.files[0])
							}
						/> */}
            <InputTag
              // Icon={FiType}
              label="name"
              type="text"
              placeholder="Enter coupon name"
              value={couponData.name}
              onChange={(e) =>
                setCoupon({ ...couponData, name: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <InputTag
                // Icon={FiType}
                notRequired={true}
                label="cart limit"
                type="text"
                placeholder="Enter Cart limit"
                value={couponData.cart_limit}
                onChange={(e) =>
                  setCoupon({ ...couponData, cart_limit: e.target.value })
                }
              />
              <InputTag
                // Icon={FiType}
                label="amount limit"
                notRequired={true}
                type="text"
                placeholder="Enter Amount limit"
                value={couponData.amount_limit}
                onChange={(e) =>
                  setCoupon({ ...couponData, amount_limit: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputTag
                // Icon={FiType}
                notRequired={true}
                label="percent limit"
                type="text"
                placeholder="Enter Cart limit"
                value={couponData.percent_limit}
                onChange={(e) =>
                  setCoupon({ ...couponData, percent_limit: e.target.value })
                }
              />
              <InputTag
                // Icon={FiType}
                label="Number Of coupons"
                notRequired={true}
                type="text"
                placeholder="Enter number of coupons"
                value={couponData.numberOfcoupens}
                onChange={(e) =>
                  setCoupon({ ...couponData, numberOfcoupens: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputTag
                // Icon={FiType}
                notRequired={true}
                label="category"
                type="text"
                placeholder="Enter category"
                value={couponData.category}
                onChange={(e) =>
                  setCoupon({ ...couponData, category: e.target.value })
                }
              />
              <InputTag
                // Icon={FiType}
                label="Enter the length of code"
                notRequired={true}
                type="text"
                placeholder="Length"
                value={couponData.lengthofcode}
                onChange={(e) =>
                  setCoupon({ ...couponData, lengthofcode: e.target.value })
                }
              />
            </div>
            <InputTag
              // Icon={FiType}
              label="code"
              type="text"
              placeholder="Enter the shareable code"
              value={couponData.code}
              onChange={(e) =>
                setCoupon({ ...couponData, code: e.target.value })
              }
            />
            <div className="relative w-full mb-3">
              <h1 className="text-slate-700 dark:text-slate-300 text-sm font-normal mb-2 flex items-center">
                End Date
              </h1>
              <DatePicker
                className={`border-0 px-3 py-3 placeholder-blueGray-300 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200 bg-gray-200
								 dark:bg-transparent dark:border rounded-md text-sm shadow-sm outline-none w-full ease-linear transition-all duration-150`}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="relative w-full mb-3">
              <h1 className="text-slate-700 dark:text-slate-300 text-sm font-normal mb-2 flex items-center">
                Type
              </h1>
              <select
                className={`border-0 px-3 py-3 placeholder-blueGray-300 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200 bg-gray-200
        dark:bg-transparent dark:border rounded-md text-sm shadow-sm outline-none w-full ease-linear transition-all duration-150`}
                value={selectedValue}
                onChange={handleSelectChange}
              >
                <option value={"Static"}>Static</option>
                <option value={"Dynamic"}>Dynamic</option>
              </select>
            </div>
            <InputTag
              // Icon={FiType}
              label="User Data"
              notRequired={true}
              type="file"
              // placeholder="Enter Amount limit"
              // value={couponData.amount_limit}
              // onChange={(e) =>
              //   setCoupon({ ...couponData, amount_limit: e.target.value })
              // }
            />
            <Button type="submit" Icon={HiPlusCircle}>
              Create
            </Button>
            <Button onClick={sendEmail} Icon={HiMail}>
              Send Promation mail
            </Button>
          </form>
        </Modal>
      </SectionHeader>

      {/* All the organizations */}
      <SubHeading>Default Messages :)</SubHeading>
      {type === "Suggested"
        ? temp?.map((item, idx) => (
          <TransitionBtoT key={idx}>
            <CardSmall idx={idx + 1} name={item} type={type}></CardSmall>
          </TransitionBtoT>
        ))
        :
        (
          <div className="grid grid-cols-2 gap-3">
            {temp?.map((code, id) => (
              <TransitionBtoT key={id}>
                <CardSmall idx={id + 1} name={code} type={type}></CardSmall>
              </TransitionBtoT>
            )
            )}
          </div>
        )
      }
      { }
      {/* <RenderIf isTrue={organizations && organizations?.length < 1}>
        <FadedText>No organization found</FadedText>
      </RenderIf> */}

      {/* Loading spinner */}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default SMS;