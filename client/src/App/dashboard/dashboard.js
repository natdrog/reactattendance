import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./components/misc/loading";
import Sidebar from "./components/sidebar";
import LoginCard from "./components/cards/login";
import AttendanceHistoryCard from "./components/cards/attendance-history";
import AttendanceCode from "./components/cards/attend-code";
import { setCurrentUser } from "../actions/user-actions";
import { addUser } from "../actions/users-actions";
import axios from "axios";
import "./resources/style.css";
import permissions from "./permissions";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekCode: ""
    };
    this.getInfo = this.getInfo.bind(this);
    this.getAttendCode = this.getAttendCode.bind(this);
    if (this.props.user.firstName === undefined) {
      this.getInfo();
    }
    this.getAttendCode();
  }

  getInfo() {
    axios
      .post("/api/dashboard/getInfo", {
        token: sessionStorage.getItem("id")
      })
      .then(res => {
        var info = res.data;
        if (info !== false) {
          this.onSetCurrentUser(info.id);
          this.onAddUser({ [info.id]: info });
          this.setState({ ...this.state });
        }
      });
  }

  getAttendCode() {
    axios
      .post("/api/attendance/getWeekCode", {
        token: sessionStorage.getItem("id")
      })
      .then(res => {
        var info = res.data;
        if (info !== false) {
          this.setState({ ...this.state, weekCode: info.code });
        }
      });
  }

  onSetCurrentUser(userID) {
    this.props.onSetCurrentUser(userID);
  }
  onAddUser(user) {
    this.props.onAddUser(user);
  }

  render() {
    if (this.props.users[this.props.user] === undefined) {
      return <Loading />;
    } else {
      return (
        <div className="container-fluid">
          <Sidebar active="dashboard" />
          <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
            <h1>Welcome {this.props.users[this.props.user].firstName}!</h1>
            <hr />
            <div className="container-fluid">
              <div className="row">
                {permissions.canSignIn.includes(
                  this.props.users[this.props.user].position
                ) ? (
                  <div className="col-md-6 dashcomp">
                    <LoginCard />
                  </div>
                ) : null}
                {permissions.canSignIn.includes(
                  this.props.users[this.props.user].position
                ) ? (
                  <div className="col-md-6 dashcomp">
                    <AttendanceHistoryCard />
                  </div>
                ) : null}
                {permissions.canSeeWeekCode.includes(
                  this.props.users[this.props.user].position
                ) ? (
                  <div className="col-md-6 dashcomp">
                    <AttendanceCode code={this.state.weekCode} />
                  </div>
                ) : null}
              </div>
            </div>
          </main>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  onSetCurrentUser: setCurrentUser,
  onAddUser: addUser
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
