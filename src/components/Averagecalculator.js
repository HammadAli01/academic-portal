import axios from "axios";
import React, { useEffect, useState } from "react";

export const Averagecalculator = ({
  totalStudents,
  totalClasses,
  courseId,
}) => {
  // let courseStudents = totalStudents;
  const [allClasses, setAllClasses] = useState([]);
  const [courseTotalStudents, setTotalStudents] = useState(-1);
  const [percentage, setPercentage] = useState(0);
  let getAllclasses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/classes/?courseId=${courseId}`
      );
      console.log("response is of id ", courseId, response.data);
      setAllClasses(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (courseTotalStudents.length > 0) {
      setPercentage((totalStudents * totalClasses * 100) / courseTotalStudents);
    }
  }, [courseTotalStudents]);
  useEffect(() => {
    var sum = 0;
    allClasses.map((item) => {
      console.log("item ", item);
      sum = sum + item.studentsIds.length;
    });
    setTotalStudents(sum);
    // setTotalStudents(
    //   allClasses.reduce((item, acc) => {
    //     if (item?.studentsIds?.length > 0) {
    //       return acc + item.studentsIds.length;
    //     } else {
    //       return acc;
    //     }
    //   }, 0)
    // );
  }, [allClasses]);
  useEffect(() => {
    getAllclasses();
  }, [courseId]);
  return percentage ?? 1;
};
