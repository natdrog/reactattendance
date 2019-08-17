import React, { Component } from "react";
import axios from "axios";

class UserAttend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attends: []
    };
    this.getAttendance = this.getAttendance.bind(this);
    this.getAttendance();
  }
  getAttendance() {
    axios
      .post("/api/attendance/getAttends", {
        token: sessionStorage.getItem("id"),
        id: this.props.id
      })
      .then(res => {
        var attends = res.data;
        if (attends.success === true) {
          console.log(attends);
          attends.attends.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
          this.setState({
            ...this.state,
            attends: attends.attends
          });
        }
      });
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h3>Attendance History:</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Dojo</th>
              </tr>
            </thead>
            <tbody>
              {this.state.attends.map(attend => (
                <tr key={attend.id}>
                  <th scope="row">{attend.date}</th>
                  <td>{attend.locationId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserAttend;
