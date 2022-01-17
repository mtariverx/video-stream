import React, { Component } from "react";

import Button from "../Button";
import { AddPlaylist, AddTime } from "../SvgIcon";
import { themeColorArray } from "../consts";

export default class SvgButton extends Component {
  render() {
    const { icon, textColor, disabled } = this.props;
    let svgColor = disabled
      ? "gray"
      : themeColorArray[textColor] || textColor || themeColorArray["primary"];
    return (
      <Button {...this.props}>
        <div className="icon" style={{ width: "1rem" }}>
          {icon === "add-playlist" && <AddPlaylist fill={svgColor} />}
          {icon === "add-time" && <AddTime fill={svgColor} />}
        </div>
        {this.props.children}
      </Button>
    );
  }
}
