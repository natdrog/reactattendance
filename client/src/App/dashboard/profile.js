import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./components/misc/loading";
import Sidebar from "./components/sidebar";
import UserAttend from "./components/cards/user-attend";
import placeholder from "./resources/profile.svg";
import axios from "axios";
import { Link } from "react-router-dom";

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
    const id = this.props.location.state;
    this.getUser(id);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentWillMount() {
    this.getUser();
  }

  redirect(id) {
    this.props.history.push(`/user/${id}`);
  }

  getUser(id) {
    axios
      .post("/api/dashboard/getUser", {
        token: sessionStorage.getItem("id"),
        id,
        relationships: true
      })
      .then(res => {
        var user = res.data;
        if (user.success === true && this._isMounted === true) {
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
          console.log(this.state.relationships);
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
    if (this.state.user.id === undefined) {
      return <Loading />;
    } else {
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
                        <Link to={`/user/${rel.person2.id}`}>
                          <button>View Profile</button>
                        </Link>
                      </td>
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
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Profile);
