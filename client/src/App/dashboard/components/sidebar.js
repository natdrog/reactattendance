import React from "react";
import logo from "../resources/cdt-logo.png";

const Sidebar = () => (
  <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
    <a className="navbar-brand" href="#">
      <img src={logo} alt="CoderDojo Toledo" width="40%" />
    </a>
    <ul className="nav nav-pills flex-column">
      <li className="nav-item">
        <a className="nav-link active" href="#">
          Dashboard
          <span className="sr-only">(current)</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link side" href="/ninjas">
          Ninjas
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link side" href="/mentors">
          Mentors
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link side" href="#">
          Analytics
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link side" href="#">
          Settings
        </a>
      </li>
    </ul>
  </nav>
);

export default Sidebar;
