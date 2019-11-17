import React, { Component } from "react";
import "../resources/signup.css";
import axios from "axios";

class NinjaSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      primaryDojoId: "1",
      birthday: "",
      err: false,
      errtxt: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  UNSAFE_componentWillMount() {
    window.sessionStorage.removeItem("redirect");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/signup/createUser", {
        user: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          rank: "1",
          email: this.state.email,
          primary_dojo: "1",
          birthday: this.state.birthday,
          position: "ninja"
        },
        token: sessionStorage.getItem("id")
      })
      .then(res => {
        res = res.data;
        if (res.success === "false") {
          this.setState({ err: true });
        }
      });
  }

  render() {
    return (
      <div className="container-fluid body">
        <div className="row">
          <div className="col-md-4 offset-md-4 sgbox">
            <h1 className="title display-4">Ninja Sign Up</h1>
            <form onSubmit={this.onSubmit} className="p-3">
              <div className="form-group">
                <label htmlFor="first_name">
                  {/* eslint-disable-next-line*/}
                  First Name<a className="asterisk">*</a>
                </label>
                <input
                  type="firstName"
                  name="firstName"
                  className="form-control"
                  id="first-name-input"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">
                  {/* eslint-disable-next-line*/}
                  Last Name<a className="asterisk">*</a>
                </label>
                <input
                  type="lastName"
                  name="lastName"
                  className="form-control"
                  id="last-name-input"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  {/* eslint-disable-next-line*/}
                  Email<a className="asterisk">*</a>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email-input"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="primary_dojo">
                  {/* eslint-disable-next-line*/}
                  Primary Dojo<a className="asterisk">*</a>
                </label>
                <select
                  name="primary_dojo"
                  className="form-control"
                  value={this.state.primaryDojoId}
                  onChange={this.onChange}
                  id="primary_dojo"
                >
                  <option value="1">Toledo</option>
                  <option value="2">Example Dojo</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="birthday">
                  {/* eslint-disable-next-line*/}
                  Birthday<a className="asterisk">*</a>
                </label>
                <input
                  type="date"
                  name="birthday"
                  className="form-control"
                  id="birthday-input"
                  value={this.state.birthday}
                  onChange={this.onChange}
                />
              </div>
              {this.state.err ? (
                <div className="error">
                  <div className="alert alert-danger" role="alert">
                    Example test
                  </div>
                </div>
              ) : (
                <div />
              )}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <p className="note font-weight-light font-italic">
              {/* eslint-disable-next-line*/}
              <a className="asterisk">*</a>denotes required field
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NinjaSignup;
