import React, { Component } from "react";
import "./style.scss";
export default class ListButton extends Component {
  render() {
    const { onClick, icon, children, selected } = this.props;
    return (
      <>
        <div
          className={`list-button${selected ? " selected" : ""}`}
          onClick={onClick}
        >
          <div className="icon">{icon}</div>
          {typeof children === "string" ? (
            <div className="label">{children.substr(0, 120)}</div>
          ) : (
            children
          )}
        </div>
      </>
    );
  }
}
