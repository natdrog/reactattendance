import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../components/misc/loading";
import Sidebar from "../components/sidebar";
import axios from "axios";

class Mentors extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      mentors: []
    };
    if (window.performance) {
      if (performance.navigation.type === 1 && this.props.user.userID === "") {
        this.props.history.push("/dashboard");
      }
    }
    this.getMentors = this.getMentors.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getMentors();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  getMentors() {
    axios
      .post("/api/dashboard/getList", {
        token: sessionStorage.getItem("id"),
        position: "mentor"
      })
      .then(res => {
        var mentors = res.data;
        if (mentors.success === true && this._isMounted === true) {
          mentors.users.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
          this.setState({ ...this.state, mentors: mentors.users });
        }
      });
  }
  redirect(id) {
    this.props.history.push(`/user/${id}`);
  }

  render() {
    if (!this.state.mentors.length) {
      return <Loading />;
    } else {
      return (
        <div className="container-fluid">
          <Sidebar active="mentors" />
          <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
            <h1>Mentors:</h1>
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
                  {this.state.mentors.map(mentor => (
                    <tr
                      onClick={() =>
                        this.props.history.push(`/user/${mentor.id}`)
                      }
                      key={mentor.id}
                    >
                      <th scope="row">{mentor.id}</th>
                      <td>{mentor.firstName}</td>
                      <td>{mentor.lastName}</td>
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
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Mentors);
