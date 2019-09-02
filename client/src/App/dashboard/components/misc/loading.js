import React, { Component } from "react";
import dojologo from "../../resources/cdt-yin-yang.svg";
import "../../resources/loading.css";

class Loading extends Component {
  render() {
    return (
      <div>
        <img
          className="centered"
          alt="loading"
          id="cdt-loading"
          src={dojologo}
        />
      </div>
    );
  }
}

export default Loading;
