import React, { Component } from "react";

class AttendanceCode extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Attendance Code</h5>
          <p className="card-text">
            This is today's code! Give this out to ninjas at dojo and use it
            yourself!
          </p>
          <p className="card-text text-center font-weight-bold">
            {this.props.code}
          </p>
        </div>
      </div>
    );
  }
}

export default AttendanceCode;
