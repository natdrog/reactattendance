import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../components/misc/loading";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

import { addUser } from "../../actions/users-actions";

class Guardians extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    if (window.performance) {
      if (performance.navigation.type === 1 && this.props.user === 0) {
        this.props.history.push("/dashboard");
      }
    }
    this.getGuardians = this.getGuardians.bind(this);
    console.log(this.props.users);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getGuardians();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onAddUser(user) {
    this.props.onAddUser(user);
  }

  getGuardians() {
    axios
      .post("/api/dashboard/getList", {
        token: sessionStorage.getItem("id"),
        position: "guardian"
      })
      .then(res => {
        var guardians = res.data;
        if (guardians.success === true && this._isMounted === true) {
          guardians.users.map(val => {
            this.onAddUser({ [val.id]: val });
            return null;
          });
          this.setState({
            ...this.state,
            loading: false
          });
        }
      });
  }
  redirect(id) {
    this.props.history.push(`/user/${id}`);
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
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
                    <th scope="col">Name</th>
                    <th scope="col">Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(this.props.users).map(user => {
                    if (user[1].position === "guardian") {
                      return (
                        <tr key={user[1].id}>
                          <th scope="row">{user[1].id}</th>
                          <td>{`${user[1].firstName} ${user[1].lastName}`}</td>
                          <td>
                            <Link
                              to={
                                user[1].id === this.props.user
                                  ? "/profile"
                                  : `/user/${user[1].id}`
                              }
                            >
                              <button>View Profile</button>
                            </Link>
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  onAddUser: addUser
};
export default connect(mapStateToProps, mapActionsToProps)(Guardians);
