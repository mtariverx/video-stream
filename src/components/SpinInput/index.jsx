import React, { Component } from "react";

import { themeColorArray } from "../consts";
import themeColor from "../../constants/themeColor";

import "./style.scss";

export default class SpinInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      moving: "",
    };
  }

  makeStyle = () => {
    const { color, textColor } = this.props;
    return {
      "--panda-spin-input-color":
        themeColorArray[color] || color || themeColor["--primary-color"],
      "--panda-spin-input-text-color":
        themeColorArray[textColor] ||
        textColor ||
        themeColor["--default-font-color"],
    };
  };

  changeValue = (moving) => {
    // this.setState({ moving });
    setTimeout(() => {
      const { min = 0, max = 100 } = this.props;
      let newValue =
        moving === "up"
          ? parseInt(this.state.value) + 1
          : parseInt(this.state.value) - 1;
      // console.log("Date: ", newValue, this.state.value);
      if (newValue < min) newValue = max;
      if (newValue > max) newValue = min;
      this.setState(
        {
          value: newValue,
          moving: "",
        },
        this.onChange
      );
    }, 500);
  };

  onChange = () => {
    this.props.onChange && this.props.onChange(this.state.value);
  };

  render() {
    const { min = 0, max = 100, value = this.state.value || min } = this.props;
    const { moving } = this.state;
    const array = new Array(5).fill(0);
    return (
      <div className="panda-spin-input" style={this.makeStyle(min, max, value)}>
        <div className="action" onClick={() => this.changeValue("up")}>
          <i className="fa fa-chevron-up" />
        </div>
        <div className="edit-panel">
          <div className={`move-panel ${moving}`}>
            {array.map((_, index) => (
              <div className="item" key={index}>
                {value - 2 + index < min
                  ? max - 1 + index
                  : value - 2 + index > max
                  ? min - 3 + index
                  : value - 2 + index}
              </div>
            ))}
          </div>
        </div>
        <div className="action" onClick={() => this.changeValue("down")}>
          <i className="fa fa-chevron-down" />
        </div>
      </div>
    );
  }
}
