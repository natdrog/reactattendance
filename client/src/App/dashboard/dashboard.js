import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "./components/sidebar";
import LoginCard from "./components/cards/login";
import AttendanceHistoryCard from "./components/cards/attendance-history";
import { setFirstName, setLastName } from "../actions/user-actions";
import axios from "axios";
import "./resources/style.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.getInfo = this.getInfo.bind(this);
    if (this.props.user.first_name === "") {
      this.getInfo();
    }
  }

  getInfo() {
    axios
      .post("/api/dashboard/getInfo", {
        token: sessionStorage.getItem("id")
      })
      .then(res => {
        var info = res.data;
        console.log(info);
        if (info !== false) {
          this.onSetFirstName(info.name.firstName);
          this.onSetLastName(info.name.lastName);
        }
      });
  }

  onSetFirstName(first_name) {
    this.props.onSetFirstName(first_name);
  }
  onSetLastName(last_name) {
    this.props.onSetLastName(last_name);
  }

  render() {
    return (
      <div className="container-fluid">
        <Sidebar />
        <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
          <h1>Welcome {this.props.user.first_name}!</h1>
          <hr />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md">
                <LoginCard />
              </div>
              <div className="col-md">
                <AttendanceHistoryCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  onSetFirstName: setFirstName,
  onSetLastName: setLastName
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Dashboard);
