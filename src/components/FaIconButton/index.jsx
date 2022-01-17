import React, { Component } from "react";
import PropsTypes from "prop-types";

import themeColor from "../../constants/themeColor";
import { themeColorArray } from "../consts";

import "./style.scss";
/**
 * Font awesome icon button Component
 * @augments {Component<Props, State>}
 */

export default class FaIconButton extends Component {
  static propsTypes = {
    icon: PropsTypes.string,
    color: PropsTypes.string,
    size: PropsTypes.string,
    onClick: PropsTypes.func,
    badge: PropsTypes.number,
  };

  makeStyle = () => {
    const { color, size } = this.props;
    return {
      "--panda-fa-icon-button-color":
        themeColorArray[color] || color || themeColor["--primary-color"],
      "--panda-fa-icon-button-size": size || "1rem",
    };
  };

  render() {
    const { icon, onClick, badge, selected, vod, arrowAble } = this.props;
    return (
      <div
        className="panda-fa-icon-button"
        onClick={onClick}
        style={this.makeStyle()}
      >
        {selected && arrowAble ? (
          vod ? (
            <i className="fa fa-arrow-right" style={{ color: "red" }}></i>
          ) : (
            <i className="fa fa-arrow-right" style={{ color: "green" }}></i>
          )
        ) : (
          <i className={`fa ${icon}`} />
        )}

        {badge && <div className="badge">{badge}</div>}
      </div>
    );
  }
}
