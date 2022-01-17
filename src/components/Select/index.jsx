import React, { Component } from "react";
import PropsTypes from "prop-types";
import themeColor from "../../constants/themeColor";

import "./style.scss";
// import { TextField, MenuItem } from '@material-ui/core';

/**
 * Select Component
 * @augments {Component<Props, State>}
 */
export default class Select extends Component {
  static propsTypes = {
    label: PropsTypes.string,
    color: PropsTypes.string,
    textColor: PropsTypes.string,
    disabled: PropsTypes.bool,
    align: PropsTypes.oneOf(["", "left", "right", "center"]),
    width: PropsTypes.string,
    fullWidth: PropsTypes.bool,
    lastFix: PropsTypes.any,
    onChange: PropsTypes.func,
  };
  state = {
    value: "",
  };
  makeStyle = () => {
    const { color, textColor, align, fullWidth, width } = this.props;
    let result = {
      "--panda-select-border-color": color || themeColor["--primary-color"],
      "--panda-select-text-color":
        textColor || themeColor["--default-font-color"],
      "--panda-select-width": fullWidth ? "100%" : width || "100%",
      "--panda-select-align": align || "left",
    };
    return result;
  };
  onChange = (evt) => {
    if (this.props.hasOwnProperty("value")) {
      this.props.onChange(evt);
    } else {
      this.setState({
        value: evt.target.value,
      });
    }
  };
  render() {
    let { children, value, label, disabled } = this.props;
    if (!this.props.hasOwnProperty("value")) value = this.state.value;
    return (
      <div className="panda-select" style={this.makeStyle()}>
        {/* <TextField select label={label} onChange={this.onChange} value={value}>
          {
            children.map(child => (
              <MenuItem key={child.props.value} value={child.props.value}>
                {child.props.children}
              </MenuItem>
            ))
          }

        </TextField> */}
        {label && <div className="label">{label}</div>}
        <div className="select-panel">
          <select value={value} disabled={disabled} onChange={this.onChange}>
            {children}
          </select>
          <div className="select-icon">
            <i className="fa fa-caret-down"></i>
          </div>
        </div>
      </div>
    );
  }
}
