import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { requestsDropdown, adminRequest, adminSidebar } from "../../data";
import { Customdropdown } from "../../components/Customdropdown";
import {
  getLeaveRequest,
  updateLeaveRequest,
} from "../../redux/actions/courseAction";
import { Dropdown } from "react-bootstrap";
import { Customtable } from "../../components/Customtable";
export const Requests = () => {
  const { requests } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);
  const [userRequests, setRequests] = useState([]);
  const [selectedCategory, setCategorySelected] = useState(requestsDropdown[1]);
  const dispatch = useDispatch();
  const handleAproval = (item) => {
    dispatch(updateLeaveRequest(item.id, "Admin Approved", handleGetRequest));
  };
  const handleRejection = (item) => {
    dispatch(
      updateLeaveRequest(item.id, "Admin Disapproved", handleGetRequest)
    );
  };
  const handleGetRequest = () => {
    if (selectedCategory.label == "Handled") {
      dispatch(getLeaveRequest("Admin Approved", "Admin Disapproved"));
    } else if (selectedCategory.label == "Not Handled") {
      dispatch(getLeaveRequest("Teacher Approved", "Teacher Approved"));
    } else setRequests([]);
  };
  useEffect(() => {
    if (requests.length) {
      const data = requests.map((item, ind) => {
        return {
          id: item.id,
          serialNo: ind + 1,
          name: item.courseSelected.name,
          date: item.dateSelected,
          reason: item.reason,
          status: item.status,
        };
      });
      setRequests(data);
    } else setRequests([]);
  }, [requests]);
  useEffect(() => {
    handleGetRequest();
  }, [selectedCategory]);
  return (
    <div>
      <div>
        <Customdropdown
          selected={selectedCategory}
          data={requestsDropdown}
          setCategorySelected={setCategorySelected}
          titleProperty="label"
        />
      </div>
      <Customtable
        headers={adminRequest}
        data={userRequests}
        handleAproval={handleAproval}
        handleRejection={handleRejection}
      />
      {/* <table className="class-table ">
        <thead>
          <tr>
            <th>S/No</th>
            <th>Course</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userRequests.length > 0
            ? userRequests.map((element, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{element?.courseSelected?.name}</th>
                    <th>{element?.dateSelected}</th>
                    <th>{element?.status}</th>
                    <th>
                      <button
                        onClick={() => {
                          handleAproval(element.id);
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          handleRejection(element.id);
                        }}
                      >
                        Disapprove
                      </button>
                    </th>
                  </tr>
                );
              })
            : "No Requests Found"}
        </tbody>
      </table> */}
    </div>
  );
};
