import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../components/misc/loading";
import Sidebar from "../components/sidebar";
import axios from "axios";

class Guardians extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      guardians: []
    };
    if (window.performance) {
      if (performance.navigation.type === 1 && this.props.user.userID === "") {
        this.props.history.push("/dashboard");
      }
    }
    this.getGuardians = this.getGuardians.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getGuardians();
  }
  componentWillUnmount() {
    this._isMounted = false;
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
          guardians.users.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
          this.setState({ ...this.state, guardians: guardians.users });
        }
      });
  }
  redirect(id) {
    this.props.history.push(`/user/${id}`);
  }

  render() {
    if (!this.state.guardians.length) {
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
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Guardians);
