import React, { Component } from "react";
import "../resources/signup.css";
import axios from "axios";

class NinjaSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      primary_dojo: "toledo",
      birthday: "",
      err: false,
      errtxt: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    window.sessionStorage.removeItem("redirect");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("/api/signup/createUser", {
        user: {
          name: {
            firstName: this.state.first_name,
            lastName: this.state.last_name
          },
          rank: "1",
          email: this.state.email,
          primary_dojo: "5bb8ea267f5a39d31927fd56",
          birthday: this.state.birthday
        },
        token: sessionStorage.getItem("id")
      })
      .then(res => {
        res = res.data;
        console.log(res);
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
                  First Name<a className="asterisk">*</a>
                </label>
                <input
                  type="first_name"
                  name="first_name"
                  className="form-control"
                  id="first-name-input"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">
                  Last Name<a className="asterisk">*</a>
                </label>
                <input
                  type="last_name"
                  name="last_name"
                  className="form-control"
                  id="last-name-input"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
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
                  Primary Dojo<a className="asterisk">*</a>
                </label>
                <select
                  name="primary_dojo"
                  className="form-control"
                  value={this.state.primary_dojo}
                  onChange={this.onChange}
                  id="primary_dojo"
                >
                  <option value="toledo">Toledo</option>
                  <option value="example">Example Dojo</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="birthday">
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
                    <a href="/dashboard" className="alert-link">
                      an example link
                    </a>
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
              <a className="asterisk">*</a>denotes required field
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NinjaSignup;
