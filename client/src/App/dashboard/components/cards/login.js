import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekCode: "",
      success: "",
      submitted: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ ...this.state, submitted: true });
    axios
      .post("/api/attendance/attend", {
        weekCode: this.state.weekCode,
        token: sessionStorage.getItem("id")
      })
      .then(res => {
        res = res.data;
        if (res.success === true) {
          console.log("success");
          this.setState({ ...this.state, success: true });
          console.log(this.state);
        }
      });
  }

  render() {
    if (this.state.success === true) {
      return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Success!</h5>
          </div>
        </div>
      );
    }
    if (this.state.submitted === true && this.state.success !== true) {
      return (
        <div className="card">
          <div className="card-body">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Sign In!</h5>
          <p className="card-text">
            If you're at dojo today, enter the code your mentor has here!
          </p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                name="weekCode"
                className="form-control"
                id="inputweekCode"
                aria-describedby="codeInput"
                value={this.state.weekCode}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
