import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./components/misc/loading";
import Sidebar from "./components/sidebar";
import UserAttend from "./components/cards/user-attend";
import placeholder from "./resources/profile.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { addUser } from "../actions/users-actions";
import { addRel } from "../actions/relationships-actions";

class Profile extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      user: parseInt(this.props.match.params.id),
      loading: true
    };
    if (window.performance) {
      if (performance.navigation.type === 1 && this.props.user === 0) {
        this.props.history.push("/dashboard");
      }
    }
    this.getUser = this.getUser.bind(this);
    this.calculateAge = this.calculateAge.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    if (this.state.user !== undefined) {
      this.getUser(this.state.user);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  redirect(id) {
    this.props.history.push(`/user/${id}`);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({
        user: parseInt(this.props.match.params.id),
        loading: true
      });
      this.getUser(parseInt(this.props.match.params.id));
    }
  }

  checkLoad() {
    var found = false;
    for (var i = 0; i < this.props.rel.length; i++) {
      if (this.props.rel[i].person1Id === this.state.user) {
        found = true;
        break;
      }
    }
    return found;
  }

  getUser(id) {
    if (!this.checkLoad()) {
      axios
        .post("/api/dashboard/getRels", {
          token: sessionStorage.getItem("id"),
          id,
          relationships: true
        })
        .then(res => {
          var user = res.data;
          if (user.success === true && this._isMounted === true) {
            user.relationships.map(val => {
              this.onAddRel({
                person1Id: val.person1Id,
                person2Id: val.person2Id,
                relationTo: val.relationTo
              });
              this.onAddUser({ [val.person2.id]: val.person2 });
              return null;
            });
            this.setState({
              user: id,
              loading: false
            });
          }
        });
    } else {
      this.setState({
        user: id,
        loading: false
      });
    }
  }
  calculateAge(dob) {
    if (dob !== undefined) {
      var diff_ms = Date.now() - new Date(dob).getTime();
      var age_dt = new Date(diff_ms);
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
  }
  onAddUser(user) {
    this.props.onAddUser(user);
  }
  onAddRel(rel) {
    this.props.onAddRel(rel);
  }

  render() {
    if (this.state.loading === true) {
      return <Loading />;
    } else {
      return (
        <div className="container-fluid">
          {this.props.user.userID === this.state.user ? (
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
                  <h3>{`${this.props.users[this.state.user].firstName} ${
                    this.props.users[this.state.user].lastName
                  }`}</h3>
                  <h4>
                    Age:{" "}
                    {this.calculateAge(
                      this.props.users[this.state.user].birthday
                    )}
                  </h4>
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
                  {this.props.rel.map(rel => {
                    if (rel.person1Id === this.state.user) {
                      return (
                        <tr key={rel.person2Id}>
                          <th scope="row">{rel.person2Id}</th>
                          <td>{`${this.props.users[rel.person2Id].firstName} ${
                            this.props.users[rel.person2Id].lastName
                          }`}</td>
                          <td>{rel.relationTo}</td>
                          <td>
                            <Link
                              to={
                                rel.person2Id === this.props.user
                                  ? "/profile"
                                  : `/user/${rel.person2Id}`
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
            <UserAttend id={this.state.user} />
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
  onAddUser: addUser,
  onAddRel: addRel
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Profile));
