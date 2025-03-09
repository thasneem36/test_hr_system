import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import jwt from "jsonwebtoken";

import Login from "./component/Login.jsx";
import Temp from "./component/Temp.jsx";
import NotFound404 from "./component/NotFound404.jsx";
import DashboardAdmin from "./component/admin/DashboardAdmin.jsx";
import DashboardHR from "./component/hr/DashboardHR.jsx";
import DashboardEmployee from "./component/employee/DashboardEmployee.jsx";

class App extends Component {
  state = {
    data: {},
    loading: false,
    pass: true,
    isLogin: false,
    firstTimeAlert: true,
  };

  componentDidMount() {
    this.setState(
      {
        data: {
          _id: localStorage.getItem("_id") || "",
          Account: localStorage.getItem("Account") || "",
          Name: localStorage.getItem("Name") || "",
        },
        isLogin: localStorage.getItem("isLogin") === "true",
      },
      () => {
        this.alertFirstTime();
      }
    );
  }

  alertFirstTime() {
    if (this.state.firstTimeAlert && !this.state.isLogin) {
      setTimeout(() => {
        window.alert(
          `To explore the features of this application, here are the temporary credentials:
          
          Admin:
            ID: admin@gmail.com
            Password: admin
          
          HR:
            ID: hr@gmail.com
            Password: hr
          
          Employee:
            ID: emp@gmail.com
            Password: emp`
        );
      }, 500);
      this.setState({ firstTimeAlert: false });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ pass: true, loading: true });
    this.login(event.target[0].value, event.target[1].value);
    event.target.reset();
  };

  handleLogout = () => {
    localStorage.clear();
    this.componentDidMount();
  };

  login = async (id, pass) => {
    const bodyLogin = { email: id, password: pass };
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + "/api/login", bodyLogin);
      const decodedData = jwt.decode(res.data);

      if (!decodedData || ![1, 2, 3].includes(decodedData.Account)) {
        this.setState({ pass: false, loading: false });
        return;
      }

      localStorage.setItem("token", res.data);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("Account", decodedData.Account);
      localStorage.setItem("_id", decodedData["_id"]);
      localStorage.setItem("Name", `${decodedData["FirstName"]} ${decodedData["LastName"]}`);

      this.setState({
        data: {
          _id: decodedData["_id"],
          Account: decodedData.Account,
          Name: `${decodedData["FirstName"]} ${decodedData["LastName"]}`,
        },
        isLogin: true,
        loading: false,
      });

      const redirectPath =
        decodedData.Account == 1
          ? "/admin"
          : decodedData.Account == 2
          ? "/hr"
          : "/employee";

      window.location.href = redirectPath; // Use Navigate component instead if needed
    } catch (err) {
      console.error(err);
      this.setState({ pass: false, loading: false });
    }
  };

  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              this.state.data["Account"] == 1 ? (
                <Navigate to="/admin" />
              ) : this.state.data["Account"] == 2 ? (
                <Navigate to="/hr" />
              ) : this.state.data["Account"] == 3 ? (
                <Navigate to="/employee" />
              ) : (
                <Login
                  onSubmit={this.handleSubmit}
                  loading={this.state.loading}
                  pass={this.state.pass}
                />
              )
            }
          />
          <Route
            path="/admin"
            element={
              this.state.data["Account"] == 1 ? (
                <DashboardAdmin
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/hr"
            element={
              this.state.data["Account"] == 2 ? (
                <DashboardHR
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/employee"
            element={
              this.state.data["Account"] == 3 ? (
                <DashboardEmployee
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
