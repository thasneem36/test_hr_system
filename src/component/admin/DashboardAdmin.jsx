import React, { Component } from "react";
import "./DashboardAdmin.css";
import { HashRouter as Router, Route, Link, Navigate } from "react-router-dom";
import { Routes } from "react-router-dom"; // Use Routes instead of Switch

import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";
import RoleForm from "../RoleForm.jsx";
import Position from "../Position.jsx";
import Department from "../Department.jsx";
import AdminPortal from "./AdminPortal.jsx";
import AdminProjectBid from "./AdminProjectBid.jsx";
import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersCog,
  faUsers,
  faChair,
  faBuilding,
  faDollarSign,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";

function RoleAdminF() {
  return <Role />;
}
function RoleFormF() {
  return <RoleForm />;
}

function PositionF() {
  return <Position />;
}
function DepartmentF() {
  return <Department />;
}
function AdminPortalF() {
  return <AdminPortal />;
}
function AdminProjectBidF() {
  return <AdminProjectBid />;
}

class DashboardAdmin extends Component {
  state = {
    redirect: true,
    checked: true,
  };

  handleChange = (checked) => {
    console.log("switch");
    if (this.state.checked == true) {
      document.getElementById("sidebar").setAttribute("class", "display-none");
    } else {
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }
    this.setState({ checked });
  };

  render() {
    return (
      <Router>
        <div id="outer-main-div">
          <div id="outer-nav">
            <NavBar
              loginInfo={this.props.data}
              checked={this.state.checked}
              handleChange={this.handleChange}
              onLogout={this.props.onLogout}
            />
          </div>

          <div id="main-non-nav">
            <div id="sidebar">
              <div id="sidebar-top-content" />
              <div id="main-title">
                <FontAwesomeIcon icon={faUsersCog} className="sidebar-icon" />
                Admin
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link to="/admin/role">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                    Role
                  </Link>
                </li>
                <li>
                  <Link to="/admin/position">
                    <FontAwesomeIcon icon={faChair} className="sidebar-icon" />
                    Position
                  </Link>
                </li>
                <li>
                  <Link to="/admin/department">
                    <FontAwesomeIcon icon={faBuilding} className="sidebar-icon" />
                    Department
                  </Link>
                </li>
                <li>
                  <Link to="/admin/project-bid">
                    <FontAwesomeIcon icon={faDollarSign} className="sidebar-icon" />
                    Project Bidding
                  </Link>
                </li>
                <li>
                  <Link to="/admin/portal-master">
                    <FontAwesomeIcon icon={faTasks} className="sidebar-icon" />
                    Portal Master
                  </Link>
                </li>
              </ul>
            </div>
            <div id="main-area">
              <div id="sidebar-top-content" />
              <Routes>
                <Route path="/admin/role" element={<RoleAdminF />} />
                <Route path="/admin/position" element={<PositionF />} />
                <Route path="/admin/department" element={<DepartmentF />} />
                <Route path="/admin/portal-master" element={<AdminPortalF />} />
                <Route path="/admin/project-bid" element={<AdminProjectBidF />} />
                <Route path="*" element={<Navigate to="/admin/role" />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default DashboardAdmin;