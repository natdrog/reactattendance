import React, { Component } from "react";
import abtimg from "./resources/about-img.png";
import cdtlogo from "./resources/cdt-logo.svg";
import "./style.css";
import queryString from "query-string";

class Home extends Component {
  componentWillMount() {
    this.redirectLogin = this.redirectLogin.bind(this);
    this.redirectSignUp = this.redirectSignUp.bind(this);
    if (window.sessionStorage.getItem("redirect") === "dashboard") {
      this.props.history.push("/dashboard");
    } else if (window.sessionStorage.getItem("redirect") === "signup") {
      this.props.history.push("/ninjasignup");
    }
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      console.log(query.token);
      window.sessionStorage.setItem("id", query.token);
    }
  }
  redirectLogin() {
    window.sessionStorage.setItem("redirect", "dashboard");
  }
  redirectSignUp() {
    window.sessionStorage.setItem("redirect", "signup");
  }

  render() {
    return (
      <div>
        <div id="slider">
          <div className="row" id="header">
            <div className="col-md-1 offset-md-1 text-center">
              <p>Home</p>
            </div>
            <div className="col-md-1 offset-md-1 text-center">
              <p>About</p>
            </div>
            <div className="col-md-2 offset-md-1 text-center">
              <img alt="logo" src={cdtlogo} width="110%" />
            </div>
            <div className="col-md-1 offset-md-1 text-center">
              <p>FAQ</p>
            </div>
            <div className="col-md-1 offset-md-1 text-center">
              <a
                href="http://cdattendance.localtunnel.me/api/dashboard/auth"
                onClick={this.redirectLogin}
              >
                <p>Login</p>
              </a>
            </div>
            <div className="col-md-1" />
          </div>
        </div>
        <div id="about">
          <div className="row">
            <div className="col-md-6 offset-md-1">
              <h1 className="section-title">About</h1>
              <p>
                This is an attendance program built specifically for Coderdojo
                Toledo. A version was developed mainly by and Adam Kuhn and
                Nathan Rogers, with contributions by Eddie Rodriguez and Jack
                Thompson. This version has now been retired and this is the new
                and improved version created by Nathan Rogers.
              </p>
            </div>
            <div className="col-md-3 offset-md-1">
              <img id="abt-img" alt="contributions" src={abtimg} width="100%" />
            </div>
          </div>
        </div>
        <div id="faq">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h1 className="section-title text-center">FAQ</h1>
              <div id="questions">
                <div className="question">
                  <h5>Question?</h5>
                  <p>
                    Question answers are typically going to be longer than the
                    question.
                  </p>
                </div>
                <div className="question">
                  <h5>Question?</h5>
                  <p>
                    Question answers are typically going to be longer than the
                    question.
                  </p>
                </div>
                <div className="question">
                  <h5>Question?</h5>
                  <p>
                    Question answers are typically going to be longer than the
                    question.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="login">
          <div className="row">
            <div className="col-md-4 offset-md-4 text-center">
              <a href="http://cdattendance.localtunnel.me/api/dashboard/auth">
                <button
                  type="button"
                  className="btn btn-dark btn-lg btn-block"
                  onClick={this.redirectSignUp}
                >
                  Sign Up
                </button>
              </a>
            </div>
          </div>
        </div>
        <div id="footer">
          <div className="row" />
        </div>
      </div>
    );
  }
}

export default Home;
