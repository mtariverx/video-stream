import React, { Component } from "react";
import PropsTypes from "prop-types";

import themeColor from "../../constants/themeColor";
import { themeColorArray, alignArray } from "../consts";

import "./style.scss";
/**
 * Video Preview Component
 * @augments {Component<Props, State>}
 */

export default class Button extends Component {
  static propsTypes = {
    color: PropsTypes.string,
    textColor: PropsTypes.string,
    align: PropsTypes.oneOf(["", "left", "right", "center"]),
    fullWidth: PropsTypes.bool,
    lastFix: PropsTypes.any,
    onClick: PropsTypes.func,
    disabled: PropsTypes.bool,
  };

  makeStyle = () => {
    const { color, align, fullWidth, textColor, disabled } = this.props;
    return {
      width: fullWidth ? "100%" : "auto",
      "--panda-button-text-color": disabled
        ? "gray"
        : textColor || themeColor["--default-font-color"],
      "--panda-button-background":
        themeColorArray[color] || color || themeColor["--primary-color"],
      "--panda-button-justify-content": alignArray[align] || "center",
    };
  };

  render() {
    const { lastFix, onClick, children, disabled } = this.props;
    return (
      <div
        className={`panda-button${disabled ? " disabled" : ""}`}
        style={this.makeStyle()}
        onClick={
          disabled
            ? () => {
                console.log("Please select some items");
              }
            : onClick
        }
      >
        <div className="label">{children || "Button"}</div>
        {lastFix && <div className="last-fix">{lastFix}</div>}
      </div>
    );
  }
}
