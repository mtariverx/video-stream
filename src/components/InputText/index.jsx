import React, { Component } from "react";
import PropsTypes from "prop-types";

import "./style.scss";
import { themeColorArray } from "../consts";
import themeColor from "../../constants/themeColor";
/**
 * Video Preview Component
 * @augments {Component<Props, State>}
 */
export default class InputField extends Component {
  static propTypes = {
    label: PropsTypes.string,
    value: PropsTypes.string,
    placeholder: PropsTypes.string,
    color: PropsTypes.string,
    textColor: PropsTypes.string,
    align: PropsTypes.oneOf(["", "left", "right", "center"]),
    appened: PropsTypes.any,
    onChange: PropsTypes.func,
    width: PropsTypes.string,
    type: PropsTypes.oneOf(["text", "password", "number"]),
  };
  state = {
    stateValue: "",
    inputValueError: false,
  };

  onChange = (evt) => {
    let value = evt.target.value;
    if (this.props.label === "URL") {
      if (value.startsWith("http") || value.startsWith("https")) {
        if (
          value.endsWith(".png") ||
          value.endsWith(".jpeg") ||
          value.endsWith("jpg") ||
          value.endsWith(".gif")
        ) {
          this.setState({ stateValue: value, inputValueError: false });
          if (this.props.onChange) {
            this.props.onChange(evt);
          }
        } else {
          this.setState({ stateValue: value, inputValueError: true });
        }
      } else {
        this.setState({ stateValue: value, inputValueError: true });
      }
    } else {
      this.setState({ stateValue: value });
      if (this.props.onChange) {
        this.props.onChange(evt);
      }
    }
  };
  makeStyle = () => {
    const { width, textColor, color } = this.props;
    return {
      "--panda-input-field-color":
        themeColorArray[color] || color || themeColor["--primary-color"],
      "--panda-input-field-width": width || "100%",
      "--panda-input-field-text-color":
        themeColorArray[textColor] ||
        textColor ||
        themeColor["--default-font-color"],
    };
  };
  render() {
    const stateValue = this.props.hasOwnProperty("value")
      ? this.props.value
      : this.state.stateValue;
    const { type, label, appened, placeholder } = this.props;

    return (
      <div className="panda-input-field" style={this.makeStyle()}>
        {label && <div className="label">{label}</div>}
        <div className="edit-field-part">
          <div className="input-field">
            <input
              type={type || "text"}
              value={stateValue}
              onChange={this.onChange}
              placeholder={placeholder}
            />
          </div>
          {appened && <div className="appened">{appened}</div>}
        </div>
        {this.state.inputValueError && (
          <small style={{ color: "red" }}>
            This value has to start with http and end with .png/.jpeg/.jpg/.gif
          </small>
        )}
      </div>
    );
  }
}
