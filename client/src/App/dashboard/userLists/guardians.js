import React, { Component } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";

class Guardians extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guardians: []
    };
    this.getGuardians = this.getGuardians.bind(this);
    this.redirect = this.redirect.bind(this);
    this.getGuardians();
  }

  getGuardians() {
    console.log("getting ninjas");
    axios
      .post("/api/dashboard/getList", {
        token: sessionStorage.getItem("id"),
        position: "guardian"
      })
      .then(res => {
        var guardians = res.data;
        if (guardians.success === true) {
          guardians.users.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
          this.setState({ ...this.state, guardians: guardians.users });
        }
        console.log(this.state);
      });
  }
  redirect(id) {
    this.props.history.push(`/user/${id}`);
  }

  render() {
    return (
      <div className="container-fluid">
        <Sidebar active="guardians" />
        <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
          <h1>Guardians:</h1>
          <hr />
          <div className="container-fluid">
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.guardians.map(guardian => (
                  <tr
                    onClick={() =>
                      this.props.history.push(`/user/${guardian.id}`)
                    }
                    key={guardian.id}
                  >
                    <th scope="row">{guardian.id}</th>
                    <td>{guardian.firstName}</td>
                    <td>{guardian.lastName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  }
}

export default Guardians;
