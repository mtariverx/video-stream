import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { addLive } from "../../../../action";
import {
  Modal,
  Button,
  Radio,
  InputField,
  DateInput,
} from "../../../../components";
import themeColor from "../../../../constants/themeColor";

import "./style.scss";

class AddLiveModal extends Component {
  constructor(props) {
    super(props);
    const startT =
      props.itemId > 0
        ? props.mainPage.programTableLists.filter(
            (playlist) => playlist.id === props.itemId
          )[0].startTime
        : moment().subtract(2, "minutes").valueOf();
    const stopT =
      props.itemId > 0
        ? props.mainPage.programTableLists.filter(
            (playlist) => playlist.id === props.itemId
          )[0].stopTime
        : moment().add(30, "minutes").valueOf();
    const durationValue = stopT - startT;
    this.state = {
      position: "current",
      loading: false,
      startFrom: 0,
      startTime: startT,
      stopTime: stopT,
      duration: durationValue,
      durationType: "full",
      title: props.title,
      error: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ title: `My Live ${nextProps.mainPage.selectedLive}` });
  }
  componentDidMount() {
    this.setState({
      startTime: moment().subtract(2, "minutes").valueOf(),
    });
  }

  setPosition = (position) => {
    this.setState({ position });
  };

  addLiveList = async () => {
    const { onClose } = this.props;
    const { title, startTime, stopTime } = this.state;
    if (stopTime - startTime > 0) {
      this.setState({
        loading: true,
      });
      await this.props.addLive(
        title,
        startTime,
        stopTime,
        stopTime - startTime,
        this.props.items,
        this.props.itemId
      );
      this.setState({
        loading: false,
      });
      onClose();
    } else {
      this.setState({ error: "Stop Time cannot be earlier than StartTime" });
      onClose();
    }
  };

  changeStartFrom = (startFrom) => {
    const { duration } = this.state;
    if (duration > startFrom) {
      this.setState({ startFrom });
    }
  };

  changeDurationType = (durationType) => this.setState({ durationType });

  changeStartTime = (value) => {
    if (this.state.stopTime - value > 0) {
      this.setState({ startTime: value, error: "" });
    } else {
      this.setState({
        startTime: value,
        error: "Stop Time cannot be earlier than StartTime",
      });
    }
  };

  changeStopTime = (value) => {
    if (value - this.state.startTime > 0) {
      this.setState({ stopTime: value, error: "" });
    } else {
      this.setState({
        stopTime: value,
        error: "Stop Time cannot be earlier than StartTime",
      });
    }
  };

  changeTitle = (evt) => this.setState({ title: evt.target.value });

  render() {
    const { open, onClose } = this.props;
    const { position, loading, stopTime, startTime, error, title } = this.state;
    return (
      <Modal
        className="add-live-modal"
        open={open}
        onClose={onClose}
        color={themeColor["--primary-color"]}
        textColor="white"
        loading={loading}
      >
        <div className="subject">Add a live</div>
        <div className="content">
          <div className="sub-title">Title</div>

          <InputField
            color="white"
            textColor="white"
            value={title}
            onChange={this.changeTitle}
          />
          <div className="sub-title">Position</div>
          <Radio
            color="white"
            name="position"
            onChange={() => this.setPosition("current")}
            checked={position === "current"}
          >
            Right Now
          </Radio>
          <Radio
            color="white"
            name="position"
            onChange={() => this.setPosition("afterCurrent")}
            checked={position === "afterCurrent"}
          >
            <div className="d-flex">
              <div className="m-r-5">Spacial time</div>
              <DateInput
                hideDate
                color="white"
                value={startTime}
                onChange={this.changeStartTime}
              />
            </div>
          </Radio>
          {/* <Radio color="white" name="position" onChange={() => this.setPosition('last')} checked={position === 'last'}>Last</Radio> */}
          <div className="sub-title">Stop Time</div>
          <Radio
            color="white"
            name="repeat"
            // checked={durationType === "startFrom"}
            checked
            onChange={() => this.changeDurationType("startFrom")}
          >
            <div className="dflex">
              <div className="m-r-5">To</div>
              <DateInput
                // hideDate
                color="white"
                value={stopTime}
                onChange={this.changeStopTime}
              />
            </div>
          </Radio>
          <p style={{ color: "red" }}>{error}</p>

          {/* <Radio color="white" name="repeat" checked={durationType === 'full'} onChange={() => this.changeDurationType('full')}>Full</Radio> */}
        </div>
        <div className="actions">
          <Button color="white" onClick={this.addLiveList}>
            Go Live
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ mainPage }) => ({
  mainPage,
});

export default connect(mapStateToProps, { addLive })(AddLiveModal);
