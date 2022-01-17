import React, { Component } from "react";

import themeColor from "../../constants/themeColor";

import "./style.scss";

class AppLayout extends Component {
  makeStyle = () => themeColor;

  render() {
    let { children } = this.props;
    return (
      <div className="app-layout" style={this.makeStyle()}>
        {children}
      </div>
    );
  }
}
export default AppLayout;
