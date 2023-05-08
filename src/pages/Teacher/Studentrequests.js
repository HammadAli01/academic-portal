import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Customdropdown } from "../../components/Customdropdown";
import { Customtable } from "../../components/Customtable";
//import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { teacherSidebar, requestsDropdown, adminRequest } from "../../data";
import {
  getCourses,
  getLeaveRequest,
  updateLeaveRequest,
} from "../../redux/actions/courseAction";
export const Studentrequests = () => {
  const { requests } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);
  const [userRequests, setRequests] = useState([]);
  const [filteredRequests, setFilteredrequests] = useState([]);
  const { courses } = useSelector((state) => state.course);
  const [selectedCategory, setCategorySelected] = useState(requestsDropdown[1]);
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const handleAproval = (item) => {
    dispatch(updateLeaveRequest(item.id, "Teacher Approved", handleGetRequest));
  };
  const handleRejection = (item) => {
    dispatch(
      updateLeaveRequest(item.id, "Teacher Disapproved", handleGetRequest)
    );
  };
  const handleGetRequest = () => {
    if (selectedCategory.label == "Handled") {
      dispatch(getLeaveRequest("Teacher Approved", "Teacher Disapproved"));
    } else if (selectedCategory.label == "Not Handled") {
      dispatch(getLeaveRequest("Teacher Approval", "Teacher Approval"));
    } else setRequests([]);
  };

  useEffect(() => {
    handleGetRequest();
  }, [selectedCategory]);
  useEffect(() => {
    if (requests.length > 0) {
      const data = requests.map((item, ind) => {
        if (item.courseSelected.teacherId == user.id) {
          return {
            id: item.id,
            serialNo: ind + 1,
            name: item.courseSelected.name,
            date: item.dateSelected,
            reason: item.reason,
            status: item.status,
          };
        }
      });
      setRequests(data);
    } else setRequests([]);
  }, [requests]);
  // useEffect(() => {
  //   dispatch(getCourses(user.id));
  //   console.log("before");
  // }, []);
  // useEffect(() => {
  //   courses.map((course) => {
  //     userRequests.map((request) => {
  //       if (request.courseSelected.id == course.id) {
  //         console.log("rq ------>", request);
  //         setFilteredrequests((state) => [...state, request]);
  //       }
  //     });
  //   });
  //   console.log("after");
  //   // setRequests((state) =>
  //   //   state.filter((request) => {
  //   //     return courses.filter((course) => {
  //   //       if (course.id === request.courseSelected.id) {
  //   //         return true;
  //   //       }
  //   //     });
  //   //   })
  //   // );
  // }, [courses]);

  return (
    <div>
      <Customdropdown
        selected={selectedCategory}
        data={requestsDropdown}
        setCategorySelected={setCategorySelected}
        titleProperty="label"
      />
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
          {filteredRequests.length >= 0
            ? filteredRequests.map((element, index) => {
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
