import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const code = {
      code: this.state.code
    };

    console.log(code);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <form
            id="slackForm"
            className="col-6 text-center"
            onSubmit={this.onSubmit}
          >
            <h1>Login</h1>
            <p id="descnote">
              Note: you do not need to create an account before loggin in.
            </p>
            <div className="form-group">
              <input
                type="code"
                className="form-control"
                id="todayCode"
                placeholder="Today's Code"
                value={this.state.code}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" id="submitBtn">
              Submit
            </button>
            <h3>Or</h3>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
