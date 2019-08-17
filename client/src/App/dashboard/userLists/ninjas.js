import React, { Component } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";

class Ninjas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ninjas: []
    };
    this.getNinjas = this.getNinjas.bind(this);
    this.redirect = this.redirect.bind(this);
    this.getNinjas();
  }

  getNinjas() {
    axios
      .post("/api/dashboard/getList", {
        token: sessionStorage.getItem("id"),
        position: "ninja"
      })
      .then(res => {
        var ninjas = res.data;
        if (ninjas.success === true) {
          ninjas.users.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
          this.setState({ ...this.state, ninjas: ninjas.users });
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
        <Sidebar active="ninjas" />
        <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
          <h1>Ninjas:</h1>
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
                {this.state.ninjas.map(ninja => (
                  <tr
                    onClick={() => this.props.history.push(`/user/${ninja.id}`)}
                    key={ninja.id}
                  >
                    <th scope="row">{ninja.id}</th>
                    <td>{ninja.firstName}</td>
                    <td>{ninja.lastName}</td>
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

export default Ninjas;
