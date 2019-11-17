import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./components/misc/loading";
import Sidebar from "./components/sidebar";
import UserAttend from "./components/cards/user-attend";
import placeholder from "./resources/profile.svg";
import axios from "axios";
import { Link } from "react-router-dom";

import permissions from "./permissions";

class Profile extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      info: [],
      user: [],
      relationships: []
    };
    if (window.performance) {
      if (performance.navigation.type === 1 && this.props.user.userID === "") {
        this.props.history.push("/dashboard");
      }
    }
    this.getUser = this.getUser.bind(this);
    this.calculateAge = this.calculateAge.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({ ...this.state, user: this.props.location.state.user });
    }
    this.getUser();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.user !== this.props.location.state.user) {
      if (this._isMounted) {
        this.setState({
          ...this.state,
          user: this.props.location.state.user,
          info: [],
          relationships: []
        });
      }
      this.getUser();
    }
  }

  getUser() {
    axios
      .post("/api/dashboard/getRels", {
        token: sessionStorage.getItem("id"),
        id: this.props.location.state.user.id
      })
      .then(res => {
        var user = res.data;
        console.log(user);
        if (user.success === true && this._isMounted === true) {
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
    console.log(this.state);
    if (this.state.user.id === undefined) {
      return <Loading />;
    } else {
      console.log(this.state.relationships);
      return (
        <div className="container-fluid">
          {this.props.user.userID === this.state.user.id ? (
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
                  <h3>{`${this.state.user.firstName} ${this.state.user.lastName}`}</h3>
                  <h4>Age: {this.calculateAge(this.state.user.birthday)}</h4>
                </div>
              </div>
              <hr />
              {permissions.canSeeNinjaProfile.includes(this.props.user.rank) ? (
                <>
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
                        <tr key={rel.person2.id}>
                          <th scope="row">{rel.person2.id}</th>
                          <td>{`${rel.person2.firstName} ${rel.person2.lastName}`}</td>
                          <td>{rel.relationTo}</td>
                          <td>
                            <Link
                              to={{
                                pathname: "/userview",
                                state: {
                                  user: rel.person2
                                }
                              }}
                            >
                              <button>View Profile</button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <></>
              )}
            </div>
            {true ? <UserAttend id={this.props.location.state.user.id} />: <UserAttend id={this.props.location.state.user.id} /> }
          </main>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Profile);
