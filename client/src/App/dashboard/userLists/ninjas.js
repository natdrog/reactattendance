import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../components/misc/loading";
import Sidebar from "../components/sidebar";
import axios from "axios";

class Ninjas extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      ninjas: []
    };
    if (window.performance) {
      if (performance.navigation.type === 1 && this.props.user.userID === "") {
        this.props.history.push("/dashboard");
      }
    }
    this.getNinjas = this.getNinjas.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getNinjas();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  getNinjas() {
    axios
      .post("/api/dashboard/getList", {
        token: sessionStorage.getItem("id"),
        position: "ninja"
      })
      .then(res => {
        var ninjas = res.data;
        if (ninjas.success === true && this._isMounted === true) {
          ninjas.users.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
          this.setState({ ...this.state, ninjas: ninjas.users });
        }
      });
  }
  redirect(id) {
    this.props.history.push(`/user/${id}`);
  }

  render() {
    if (!this.state.ninjas.length) {
      return <Loading />;
    } else {
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
                      onClick={() =>
                        this.props.history.push({
                          pathname: "/userview",
                          state: { state: ninja }
                        })
                      }
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
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Ninjas);
