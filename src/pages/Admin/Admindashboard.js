import React, { useState, useEffect } from "react";
//import { Customnavbar } from "../../components/Customnavbar";
import { Link } from "react-router-dom";
import { Table } from "../../components/Table";
import { Sidebar } from "../../components/Sidebar";
import { Customtable } from "../../components/Customtable";
import { adminSidebar } from "../../data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
export const Admindashboard = () => {
  const data = [
    {
      name: "Fundamentals",
      classes: 10,
      AverageStudents: 24,
    },
    {
      name: "Chemistry",
      classes: 30,
      AverageStudents: 13,
    },
    {
      name: "OOPs",
      classes: 20,
      AverageStudents: 25,
    },
    {
      name: "DBMS",
      classes: 27,
      AverageStudents: 39,
    },
    {
      name: "VP",
      classes: 18,
      AverageStudents: 48,
    },
    {
      name: "SAMD",
      classes: 23,
      AverageStudents: 38,
    },
    {
      name: "AI",
      classes: 34,
      AverageStudents: 43,
    },
  ];
  return (
    <div>
      <h3 className="head">Admin Dasboard</h3>
      <span className="span1">
        <h6>Total Student</h6>
        <p>400</p>
      </span>
      <span className="span2">
        <h6>Total Teachers</h6>
        <p>30</p>
      </span>
      <LineChart
        className="admin-chart"
        width={750}
        height={385}
        data={data}
        style={{
          borderRadius: "10px",
          background: "white",
          paddingTop: "10px",
        }}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="classes"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="AverageStudents"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      {/* <Customtable /> */}
      {/* <Table /> */}
    </div>
  );
};
