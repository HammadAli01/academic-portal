import React from "react";
import "../styles/sidebar.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetStore } from "../redux/actions/Actions";
export const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("role");
    dispatch(resetStore());
  };
  return (
    <div>
      <aside class="sidebar">
        <nav class="nav">
          <ul>
            {data?.map((element) => {
              return (
                <li>
                  <Link to={element.path}>{element.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
};
