import React, { Component } from "react";
import "./DashboardHR.css";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";
import RoleForm from "../RoleForm.jsx";
import Position from "../Position.jsx";
import Department from "../Department.jsx";
import Country from "../Country.jsx";
import State from "../State.jsx";
import City from "../City.jsx";
import Company from "../Company.jsx";
import Employee from "../Employee.jsx";
import Salary from "../Salary.jsx";
import LeaveApplicationHR from "./LeaveApplicationHR.jsx";
import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faChair,
  faBuilding,
  faUser,
  faUserTie,
  faRupeeSign,
  faFileAlt,
  faCity,
  faGlobeAmericas,
  faPlaceOfWorship,
  faArchway,
} from "@fortawesome/free-solid-svg-icons";

class DashboardHR extends Component {
  state = {
    redirect: true,
    checked: true 
  };

  handleChange = (checked) => {
    console.log("switch");

    if (this.state.checked === true) { 
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
            <NavBar loginInfo={this.props.data} checked={this.state.checked} handleChange={this.handleChange} onLogout={this.props.onLogout} />
          </div>

          <div id="main-non-nav">
            <div id="sidebar">
              <div id="sidebar-top-content" />
              <div id="main-title">
                <FontAwesomeIcon icon={faUserTie} className="sidebar-icon" />
                HR
              </div>
              <ul className="navbar-ul">
                <li><Link to="/hr/employee"><FontAwesomeIcon icon={faUser} className="sidebar-icon" /> User </Link></li>
                <li><Link to="/hr/salary"><FontAwesomeIcon icon={faRupeeSign} className="sidebar-icon" /> Salary </Link></li>
                <li><Link to="/hr/leave-application-hr"><FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" /> Leave Application </Link></li>
                <li><Link to="/hr/company"><FontAwesomeIcon icon={faCity} className="sidebar-icon" /> Company </Link></li>
                <li><Link to="/hr/role"><FontAwesomeIcon icon={faUsers} className="sidebar-icon" /> Role </Link></li>
                <li><Link to="/hr/position"><FontAwesomeIcon icon={faChair} className="sidebar-icon" /> Position </Link></li>
                <li><Link to="/hr/department"><FontAwesomeIcon icon={faBuilding} className="sidebar-icon" /> Department </Link></li>
                <li><Link to="/hr/country"><FontAwesomeIcon icon={faGlobeAmericas} className="sidebar-icon" /> Country </Link></li>
                <li><Link to="/hr/state"><FontAwesomeIcon icon={faPlaceOfWorship} className="sidebar-icon" /> State </Link></li>
                <li><Link to="/hr/city"><FontAwesomeIcon icon={faArchway} className="sidebar-icon" /> City </Link></li>
              </ul>
            </div>

            <div id="main-content">
              <Routes>
                <Route path="/hr/employee" element={<Employee />} />
                <Route path="/hr/salary" element={<Salary />} />
                <Route path="/hr/leave-application-hr" element={<LeaveApplicationHR />} />
                <Route path="/hr/company" element={<Company />} />
                <Route path="/hr/role" element={<Role />} />
                <Route path="/hr/position" element={<Position />} />
                <Route path="/hr/department" element={<Department />} />
                <Route path="/hr/country" element={<Country />} />
                <Route path="/hr/state" element={<State />} />
                <Route path="/hr/city" element={<City />} />
                <Route path="*" element={<NotFound404 />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default DashboardHR;
