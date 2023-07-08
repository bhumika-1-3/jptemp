import React, { useState } from "react";
import {
  TableContainer,
  Tbody,
  Thead,
  Th,
  Td,
  Table,
} from "../../../components/Tables/TableStyles";
import {
  Modal,
  SectionHeader,
  InputTag,
  TransitionBtoT,
  RenderIf,
} from "../../../components";
import "./Dashboard.css";
import { Button } from "../../../components";
import { HiPlusCircle } from "react-icons/hi";
import TableData from "./TableData";
const Groups = (props) => {
  const [name, setName] = useState("");
  const [people, setPeople] = useState("");
  const [coupon, setCoupon] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [studentData, setStudentData] = useState(TableData);

  const tableRows = studentData.map((info) => {
    return (
      <tr>
        <td>{info.id}</td>
        <td>{info.Name}</td>
        <td>{info.No_Of_People_Influenced}</td>
		<td>{info.Coupon_Code}</td>
		<td>{info.Coupon_Start_Date}</td>
		<td>{info.Coupon_Valid_Till}</td>
      </tr>
    );
  });

  const addRows = (data) => {
    const totalStudents = studentData.length;
    data.id = totalStudents + 1;
    const updatedStudentData = [...studentData];
    updatedStudentData.push(data);
    setStudentData(updatedStudentData);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changePeople = (event) => {
    setPeople(event.target.value);
  };

  const transferValue = (event) => {
    event.preventDefault();
    const val = {
      name,
      people,
      coupon,
      start,
      end,
    };
    props.func(val);
    clearState();
  };

  const clearState = () => {
    setName("");
    setPeople("");
  };

  return (
    <div>
      <div className="flex justify-between pb-5">
        <p className="text-3xl pb-6 dark:text-slate-300">
          Meet Our Influencers:
        </p>
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
            {/* <form style={{ display: "none" }} ref={form}>
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
            </form> */}
            {/* <form onSubmit={creatingCoupon}> */}
            <InputTag
              // Icon={FiType}
              label="Name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={changeName}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputTag
                // Icon={FiType}
                notRequired={true}
                label="Coupon Code"
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                }}
              />
              <InputTag
                // Icon={FiType}
                label="People Influenced"
                notRequired={true}
                type="text"
                placeholder="Enter No. of People Influenced"
                value={people}
                onChange={(e) => {
                  setPeople(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputTag
                // Icon={FiType}
                notRequired={true}
                label="Start Date"
                type="text"
                placeholder="Enter Start Date"
                value={start}
                onChange={(e) => {
                  setStart(e.target.value);
                }}
              />
              <InputTag
                // Icon={FiType}
                label="End Date"
                notRequired={true}
                type="text"
                placeholder="Enter End Date"
                value={end}
                onChange={(e) => {
                  setEnd(e.target.value);
                }}
              />
            </div>
            {/* <div className="relative w-full mb-3">
                <h1 className="text-slate-700 dark:text-slate-300 text-sm font-normal mb-2 flex items-center">
                  End Date
                </h1>
                <DatePicker
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200 bg-gray-200
								 dark:bg-transparent dark:border rounded-md text-sm shadow-sm outline-none w-full ease-linear transition-all duration-150`}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div> */}

            <Button onClick={transferValue} Icon={HiPlusCircle}>
              Create
            </Button>
            {/* <Button onClick={sendEmail} Icon={HiMail}>
                Send Promation mail
              </Button> */}
            {/* </form> */}
          </Modal>
        </SectionHeader>
      </div>
      <TableContainer>
        <Table>
          <Thead>
			<Th>Sr. No.</Th>
            <Th>Name</Th>
            <Th>Coupon Code</Th>
            <Th>No. of People Influenced</Th>
            <Th>Coupon Start Date</Th>
            <Th>Coupon Valid Till</Th>
          </Thead>
          <Tbody>
		  <Td>1</Td>
            <Td>Om Shukla</Td>
            <Td>UR7896</Td>
            <Td>4</Td>
            <Td>11-01-2023</Td>
            <Td>30-03-2023</Td>
          </Tbody>
          <Tbody>
			<Td>2</Td>
            <Td>Bhumika Mange</Td>
            <Td>UR7896</Td>
            <Td>4</Td>
            <Td>05-02-2023</Td>
            <Td>30-03-2023</Td>
          </Tbody>
          <Tbody>
		  <Td>3</Td>
            <Td>Rachana Yeldi</Td>
            <Td>YH745J</Td>
            <Td>2</Td>
            <Td>01-01-2023</Td>
            <Td>01-04-2023</Td>
          </Tbody>
          <Tbody>
		  <Td>4</Td>
            <Td>Yash Joshi</Td>
            <Td>YF745R</Td>
            <Td>3</Td>
            <Td>02-01-2023</Td>
            <Td>03-04-2023</Td>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Groups;
