import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "./components/sidebar";
import UserAttend from "./components/cards/user-attend";
import placeholder from "./resources/profile.svg";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      user: [],
      relationships: []
    };
    this.getUser = this.getUser.bind(this);
    this.getUser();
    this.calculateAge = this.calculateAge.bind(this);
  }

  redirect(id) {
    this.props.history.push(`/user/${id}`);
  }

  getUser() {
    axios
      .post("/api/dashboard/getUser", {
        token: sessionStorage.getItem("id"),
        id: this.props.match.params.id,
        relationships: true
      })
      .then(res => {
        var user = res.data;
        if (user.success === true) {
          this.setState({
            ...this.state,
            user: user.user
          });
          user.relationships.sort(
            (a, b) => parseFloat(a.id) - parseFloat(b.id)
          );
          this.setState({
            ...this.state,
            relationships: user.relationships
          });
        }
      });
  }
  calculateAge(dob) {
    if (dob !== undefined) {
      var diff_ms = Date.now() - new Date(dob).getTime();
      var age_dt = new Date(diff_ms);
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="container-fluid">
        {this.props.user.id === this.state.info.id ? (
          <Sidebar active="profile" />
        ) : (
          <Sidebar active="ninjas" />
        )}
        <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
          <h1>Profile:</h1>
          <hr />
          <div className="container">
            <div className="row">
              <img alt="" src={placeholder} />
              <div>
                <h3>{`${this.state.user.firstName} ${
                  this.state.user.lastName
                }`}</h3>
                <h4>Age: {this.calculateAge(this.state.user.birthday)}</h4>
              </div>
            </div>
            <hr />
            <h2>Relationships:</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Relationship</th>
                </tr>
              </thead>
              <tbody>
                {this.state.relationships.map(rel => (
                  <tr
                    onClick={() => this.redirect(rel.person2.id)}
                    key={rel.person2.id}
                  >
                    <th scope="row">{rel.person2.id}</th>
                    <td>{`${rel.person2.firstName} ${
                      rel.person2.lastName
                    }`}</td>
                    <td>{rel.relationTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <UserAttend id={this.props.match.params.id} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Profile);
