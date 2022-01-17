import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Radio, InputField, DateInput } from "../../../../../components";
import { editOverlay } from "../../../../../action";

import "./style.scss";

class TimingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: "",
      end: "",
      startType: "is",
      endType: "is",
    };
  }

  UNSAFE_componentWillMount() {
    this.checkProps(this.props);
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   this.checkProps(nextProps);
  // }

  checkProps(props) {
    let { start, end } = props.overlayStore.overlay;
    let startType = "is",
      endType = "is";
    if (start.startsWith("now+")) {
      start = Number(start.replace("now+", ""));
      startType = start ? "is" : "im";
    } else {
      start = moment(start, ["YYYY.MM.DD HH:mm:ss"]).valueOf();
      startType = "st";
    }

    if (end.startsWith("now+")) {
      end = Number(end.replace("now+", ""));
      endType = end ? "is" : "im";
    } else if (end.startsWith("2100")) {
      endType = "im";
    } else {
      end = moment(end, ["YYYY.MM.DD HH:mm:ss"]).valueOf();
      endType = "st";
    }
    this.setState({ start, end, startType, endType });
  }

  changeStartType = (type, value) => {
    const state = this.state;
    if (type === "startType") {
      state.startType = value;
      if (value === "is") {
        state.start = 10;
      } else if (value === "st") {
        state.start = moment().valueOf();
      } else {
        state.start = 0;
      }
    } else if (type === "endType") {
      state.endType = value;
      if (value === "is") {
        state.end = 150;
      } else if (value === "st") {
        state.end = moment().valueOf();
      } else {
        state.end = 0;
      }
    }
    this.setState({ ...state }, this.onChange);
  };

  changeStart = (evt) => {
    this.setState({ start: evt.target.value }, this.onChange);
  };

  changeStartTime = (start) => {
    this.setState({ start, startType: "st" }, this.onChange);
  };

  changeEnd = (evt) => {
    this.setState({ end: evt.target.value }, this.onChange);
  };

  changeEndTime = (end) => {
    this.setState({ end }, this.onChange);
  };

  onChange = () => {
    let { start, end, startType, endType } = this.state;
    if (startType === "st") {
      if (endType === "st" && start > end) {
        end = start;
      }
      start = moment(start).format("YYYY.MM.DD HH:mm:ss");
    } else {
      if (endType === "is" && start > end) {
        end = start;
      } else if (
        endType === "st" &&
        moment(Number(start) + Number(end)) < moment().valueOf()
      ) {
        end = moment().valueOf();
      }
      start = `now+${start}`;
    }
    if (endType === "st") {
      end = moment(end).format("YYYY.MM.DD HH:mm:ss");
    } else if (endType === "im") {
      end = "2100.12.31 00:00:00";
    } else {
      end = `now+${end}`;
    }
    const { overlay } = this.props.overlayStore;
    const newOverlay = {
      ...overlay,
      start,
      end,
    };
    this.props.editOverlay(newOverlay);
  };

  render() {
    let { start, end, startType, endType } = this.state;

    return (
      <div className="timing-component">
        <div className="start-time">
          <Radio
            name="start-time"
            checked={startType === "is"}
            onChange={() => this.changeStartType("startType", "is")}
          >
            In Seconds
          </Radio>
          <Radio
            name="start-time"
            checked={startType === "st"}
            onChange={() => this.changeStartType("startType", "st")}
          >
            Specific Time
          </Radio>
          <Radio
            name="start-time"
            checked={startType === "im"}
            onChange={() => this.changeStartType("startType", "im")}
          >
            Immediately
          </Radio>
          {startType === "is" && (
            <InputField
              label="Seconds"
              type="number"
              width="150px"
              value={start.toString()}
              onChange={this.changeStart}
            />
          )}
          {startType === "st" && (
            <DateInput
              label="Seconds"
              value={start}
              onChange={this.changeStartTime}
            />
          )}
        </div>
        <div className="end-time">
          <Radio
            name="end-time"
            checked={endType === "is"}
            onChange={() => this.changeStartType("endType", "is")}
          >
            In Seconds
          </Radio>
          <Radio
            name="end-time"
            checked={endType === "st"}
            onChange={() => this.changeStartType("endType", "st")}
          >
            Specific Time
          </Radio>
          <Radio
            name="end-time"
            checked={endType === "im"}
            onChange={() => this.changeStartType("endType", "im")}
          >
            Never
          </Radio>
          {endType === "is" && (
            <InputField
              label="Seconds"
              type="number"
              width="150px"
              value={end.toString()}
              onChange={this.changeEnd}
            />
          )}
          {endType === "st" && (
            <DateInput
              label="Seconds"
              value={end}
              onChange={this.changeEndTime}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ overlayStore }) => ({
  overlayStore,
});

export default connect(mapStateToProps, {
  editOverlay,
})(TimingComponent);
