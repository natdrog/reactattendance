import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../resources/cdt-logo.png";

import permissions from "../permissions";

class Sidebar extends Component {
  render() {
    console.log(this.props.active);
    return (
      <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="CoderDojo Toledo" width="40%" />
        </a>
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <NavLink
              className={
                this.props.active === "dashboard"
                  ? "nav-link active"
                  : "nav-link side"
              }
              to="/dashboard"
            >
              Dashboard
              {this.props.active === "dashboard" ? (
                <span className="sr-only">(current)</span>
              ) : null}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={
                this.props.active === "profile"
                  ? "nav-link active"
                  : "nav-link side"
              }
              to={{
                pathname: "/profile",
                state: {
                  id: this.props.user.userID
                }
              }}
            >
              Profile
              {this.props.active === "profile" ? (
                <span className="sr-only">(current)</span>
              ) : null}
            </NavLink>
          </li>

          {permissions.canSeeMyNinjas.includes(this.props.user.rank) ? (
            <li className="nav-item">
              <NavLink
                className={
                  this.props.active === "myninjas"
                    ? "nav-link active"
                    : "nav-link side"
                }
                to="/myninjas"
              >
                My Ninjas
                {this.props.active === "myninjas" ? (
                  <span className="sr-only">(current)</span>
                ) : null}
              </NavLink>
            </li>
          ) : null}

          {permissions.canSeeNinjaProfile.includes(this.props.user.rank) ? (
            <li className="nav-item">
              <NavLink
                className={
                  this.props.active === "ninjas"
                    ? "nav-link active"
                    : "nav-link side"
                }
                to="/ninjas"
              >
                Ninjas
                {this.props.active === "ninjas" ? (
                  <span className="sr-only">(current)</span>
                ) : null}
              </NavLink>
            </li>
          ) : null}

          {permissions.canSeeGuardianProfile.includes(this.props.user.rank) ? (
            <li className="nav-item">
              <NavLink
                className={
                  this.props.active === "guardians"
                    ? "nav-link active"
                    : "nav-link side"
                }
                to="/guardians"
              >
                Guardians
                {this.props.active === "guardians" ? (
                  <span className="sr-only">(current)</span>
                ) : null}
              </NavLink>
            </li>
          ) : null}

          {permissions.canSeeMentorProfile.includes(this.props.user.rank) ? (
            <li className="nav-item">
              <NavLink
                className={
                  this.props.active === "mentors"
                    ? "nav-link active"
                    : "nav-link side"
                }
                to="/mentors"
              >
                Mentors
                {this.props.active === "mentors" ? (
                  <span className="sr-only">(current)</span>
                ) : null}
              </NavLink>
            </li>
          ) : null}

          {permissions.canSeeAnalytics.includes(this.props.user.rank) ? (
            <li className="nav-item">
              <NavLink
                className={
                  this.props.active === "analytics"
                    ? "nav-link active"
                    : "nav-link side"
                }
                to="/analytics"
              >
                Analytics
                {this.props.active === "analytics" ? (
                  <span className="sr-only">(current)</span>
                ) : null}
              </NavLink>
            </li>
          ) : null}
          <li className="nav-item">
            <NavLink
              className={
                this.props.active === "settings"
                  ? "nav-link active"
                  : "nav-link side"
              }
              to="/settings"
            >
              Settings
              {this.props.active === "settings" ? (
                <span className="sr-only">(current)</span>
              ) : null}
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Sidebar);
