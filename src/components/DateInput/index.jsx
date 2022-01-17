import React, { Component } from "react";
import PropsTypes from "prop-types";
import moment from "moment";
import { Menu } from "@material-ui/core";

import themeColor from "../../constants/themeColor";
import { themeColorArray } from "../consts";
import { SpinInput, CustomSelect } from "..";

import "./style.scss";

export default class DurationInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(props.value),
      anchorEl: null,
    };
  }

  openTime = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  makeStyle = () => {
    const { color } = this.props;
    return {
      "--panda-date-input-color":
        themeColorArray[color] || color || themeColor["--primary-color"],
      "--panda-date-text-color":
        themeColorArray[color] || color || themeColor["--default-font-color"],
    };
  };

  onChange = (type) => (value) => {
    let { currentDate } = this.state;
    switch (type) {
      case "hours":
        currentDate.hour(value);
        break;
      case "minutes":
        currentDate.minute(value);
        break;
      case "seconds":
        currentDate.second(value);
        break;
      default:
        break;
    }
    this.setState({ currentDate }, this.onChangeProps);
  };

  onChangeDate = (type, value) => {
    let { currentDate } = this.state;

    switch (type) {
      case "year":
        this.setState({ currentDate: currentDate.year(value) });
        break;
      case "month":
        this.setState({ currentDate: currentDate.month(value || 0) });
        break;
      case "date":
        this.setState({ currentDate: currentDate.date(value) });
        break;
      default:
        break;
    }
    this.onChangeProps();
  };

  onChangeProps = () => {
    let { currentDate } = this.state;
    this.props.onChange && this.props.onChange(currentDate.valueOf());
  };

  getDates = (currentDate) => {
    let current = currentDate.clone();
    current.date(1);
    let result = [];
    while (current.month() === currentDate.month()) {
      result.push(current.date());
      current.add(1, "day");
    }
    return result;
  };

  render() {
    const { color, hideDate, hideTime, upDirection, className } = this.props;
    const { currentDate } = this.state;
    const year = currentDate.format("YYYY");
    const month = currentDate.month();
    const date = currentDate.date();
    const dates = this.getDates(currentDate);
    const hours = currentDate.format("HH");
    const minutes = currentDate.format("mm");
    const seconds = currentDate.format("ss");
    const years = new Array(50).fill("years");
    const { anchorEl } = this.state;
    return (
      <div className={`panda-date-input ${className}`} style={this.makeStyle()}>
        {!hideDate && (
          <>
            <CustomSelect
              color={color}
              textColor={color}
              items={years.map(
                (element, index) => `${currentDate.year() - 25 + index}`
              )}
              value={year}
              upDirection={upDirection}
              onChange={(value) => this.onChangeDate("year", value)}
            />
            <CustomSelect
              color={color}
              textColor={color}
              items={moment
                .months()
                .map((month, index) => ({ label: month, value: index }))}
              value={month}
              upDirection={upDirection}
              onChange={(value) => this.onChangeDate("month", value)}
            />
            <CustomSelect
              color={color}
              textColor={color}
              items={dates}
              value={date}
              upDirection={upDirection}
              onChange={(value) => this.onChangeDate("date", value)}
            />
          </>
        )}

        {!hideTime && (
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
        )}
      </div>
    );
  }
}

DurationInput.propTypes = {
  color: PropsTypes.string,
  textColor: PropsTypes.string,
  className: PropsTypes.string,
  disabled: PropsTypes.bool,
  upDirection: PropsTypes.bool,
  onChange: PropsTypes.func,
};
