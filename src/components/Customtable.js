import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getAllCourses } from "../redux/actions/courseAction";
import "../styles/teacherdashboard.css";
export const Customtable = ({
  headers,
  data,
  checkArray,
  handleEdit,
  handleDelete,
  handleView,
  handleAproval,
  handleRejection,
  handleUnregister,
}) => {
  console.log("data in cutomtable is => ", data, headers);
  return (
    <div>
      <div className="class-table">
        <table>
          <thead>
            <tr>
              {headers.map((item) => (
                <th>{item?.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data?.length && headers && headers.length
              ? data.map((item, index) => {
                  return (
                    <tr>
                      {headers.map((val) => {
                        const { key } = val;

                        if (val?.label === "Actions") {
                          return (
                            <td>
                              {key.indexOf("edit") !== -1 ? (
                                <button
                                  className="tableButton"
                                  onClick={() => {
                                    handleEdit(item);
                                  }}
                                >
                                  Edit
                                </button>
                              ) : (
                                ""
                              )}
                              {key.indexOf("delete") !== -1 ? (
                                <button
                                  className="tableButton"
                                  onClick={() => {
                                    handleDelete(item);
                                  }}
                                >
                                  Delete
                                </button>
                              ) : (
                                ""
                              )}
                              {key.indexOf("view") !== -1 ? (
                                <button
                                  className="tableButton"
                                  onClick={() => {
                                    handleView(item);
                                  }}
                                >
                                  View
                                </button>
                              ) : (
                                ""
                              )}
                              {key.indexOf("approve") !== -1 ? (
                                <button
                                  className="tableButton"
                                  onClick={() => {
                                    handleAproval(item);
                                  }}
                                >
                                  Approve
                                </button>
                              ) : (
                                ""
                              )}
                              {key.indexOf("disapprove") !== -1 ? (
                                <button
                                  className="tableButton"
                                  onClick={() => {
                                    handleRejection(item);
                                  }}
                                >
                                  Disapprove
                                </button>
                              ) : (
                                ""
                              )}
                              {key.indexOf("unregister") !== -1 ? (
                                <button
                                  className="tableButton"
                                  onClick={() => {
                                    handleUnregister(item);
                                  }}
                                >
                                  Unregister
                                </button>
                              ) : (
                                ""
                              )}
                              {/* {key.indexOf("unregister") !== -1 ? (
                                <button
                                  onClick={() => {
                                    handleUnregister(item);
                                  }}
                                >
                                  Unregister
                                </button>
                              ) : (
                                ""
                              )} */}
                            </td>
                          );
                        }
                        return <td>{item[key] ? item[key] : "0"}</td>;
                      })}
                    </tr>
                  );
                })
              : "No Data Found!."}
          </tbody>
        </table>
      </div>
    </div>
  );
};
/*<td>{item[key] ? item[key] : ""}</td>  <Averagecalculator
                              totalStudents={item.studentIds.length}
                              totalClasses={item.classes}
                              courseId={item.id}
                            />*/
