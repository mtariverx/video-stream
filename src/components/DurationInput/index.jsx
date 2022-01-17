import React, { Component } from "react";
import PropsTypes from "prop-types";
import themeColor from "../../constants/themeColor";
import { themeColorArray } from "../consts";
import { Menu } from "@material-ui/core";
import { SpinInput } from "..";

import "./style.scss";

/**
 * Time input Component
 * @augments {Component<Props, State>}
 */

export default class DurationInput extends Component {
  static propTypes = {
    value: PropsTypes.number,
    color: PropsTypes.string,
    className: PropsTypes.string,
    disabled: PropsTypes.bool,
    onChange: PropsTypes.func,
  };
  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    duration: 0,
    anchorEl: null,
  };

  makeStyle = () => {
    const { color } = this.props;
    return {
      "--panda-time-input-color":
        themeColorArray[color] || color || themeColor["--primary-color"],
    };
  };

  openTime = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onChange = (type) => (value) => {
    let { hours, minutes, seconds, duration } = this.state;
    switch (type) {
      case "hours":
        hours = value;
        break;
      case "minutes":
        minutes = value;
        break;
      case "seconds":
        seconds = value;
        break;
      default:
        break;
    }
    duration = this.caculateDuration(hours, minutes, seconds);
    this.setState({ hours, minutes, seconds, duration });
    this.props.onChange && this.props.onChange(duration);
  };
  caculateDuration = (hours, minutes, seconds) => {
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
  };
  getHours = (duration) => {
    return Math.floor(duration / 60 / 60 / 1000);
  };
  getMinutes = (duration) => {
    return Math.floor((duration % (60 * 60 * 1000)) / 60 / 1000);
  };
  getSeconds = (duration) => {
    return Math.floor((duration % (60 * 1000)) / 1000);
  };
  formatNumber = (number) => {
    if (number.toString().length !== 2) {
      number = `0${number}`;
    }
    return number;
  };
  render() {
    const duration = this.props.hasOwnProperty("value")
      ? this.props.value
      : this.state.duration;
    const hours = this.formatNumber(this.getHours(duration));
    const minutes = this.formatNumber(this.getMinutes(duration));
    const seconds = this.formatNumber(this.getSeconds(duration));
    const { anchorEl } = this.state;
    return (
      <>
        <div
          className="time"
          aria-controls="panda-date-input-time"
          aria-haspopup="true"
          onClick={this.openTime}
        >
          <span className="time-item">{hours}</span>
          <span>:</span>
          <span className="time-item">{minutes}</span>
          <span>:</span>
          <span className="time-item">{seconds}</span>
        </div>
        <Menu
          id="panda-date-input-time"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <div className="panda-date-input-time">
            <SpinInput
              min={0}
              max={23}
              value={hours}
              onChange={this.onChange("hours")}
            />
            <div>:</div>
            <SpinInput
              min={0}
              max={59}
              value={minutes}
              onChange={this.onChange("minutes")}
            />
            <div>:</div>
            <SpinInput
              min={0}
              max={59}
              value={seconds}
              onChange={this.onChange("seconds")}
            />
          </div>
        </Menu>
      </>
    );
  }
}
