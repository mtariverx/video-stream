import React, { Component } from "react";
import PropsTypes from "prop-types";

export default class ActionButton extends Component {
  static propsTypes = {
    icon: PropsTypes.string,
    onClick: PropsTypes.func,
  };

  onClick = (evt) => {
    this.props.onClick && this.props.onClick(evt);
  };

  render() {
    return (
      <div className="action-button" onClick={this.onClick}>
        <img
          src={require(`../../../assets/image/${this.props.icon}.png`)}
          alt=""
        />
      </div>
    );
  }
}
