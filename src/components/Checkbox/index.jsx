import React, { Component } from "react";
import PropsTypes from "prop-types";
import themeColor from "../../constants/themeColor";
import { themeColorArray } from "../consts";

import "./style.scss";

/**
 * Checkbox Component
 * @augments {Component<Props, State>}
 */
export default class CheckBox extends Component {
  static propsTypes = {
    color: PropsTypes.string,
    textColor: PropsTypes.string,
    disabled: PropsTypes.bool,
    align: PropsTypes.oneOf(["", "left", "right", "center"]),
    fullWidth: PropsTypes.bool,
    lastFix: PropsTypes.any,
    onClick: PropsTypes.func,
  };
  state = {
    checked: false,
  };

  makeStyle = () => {
    const { color } = this.props;
    return {
      "--panda-checkbox-color":
        themeColorArray[color] || color || themeColor["--primary-color"],
    };
  };

  onChange = (evt) => {
    if (this.props.hasOwnProperty("onChange")) {
      this.props.onChange(evt);
    }
    this.setState({
      checked: evt.target.checked,
    });
  };

  render() {
    const { children, disabled } = this.props;
    const checked = this.props.hasOwnProperty("checked")
      ? this.props.checked
      : this.state.checked;

    return (
      <label className="panda-checkbox" style={this.makeStyle()}>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={this.onChange}
        ></input>
        <span className="check-mark" />
        <span>{children}</span>
      </label>
    );
  }
}
