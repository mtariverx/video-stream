import React, { Component } from "react";
import { connect } from "react-redux";

import { addItems } from "../../../../action";

import { Modal, Button, Radio, DurationInput } from "../../../../components";
import themeColor from "../../../../constants/themeColor";

import "./style.scss";

class AddPlaylistModal extends Component {
  state = {
    position: "current",
    loading: false,
    startFrom: 0,
    duration: 0,
    durationType: "full",
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.items.length === 1) {
      this.setState({
        startFrom: 0,
        duration: Number(nextProps.items[0].duration),
      });
    }
  }

  setPosition = (position) => {
    this.setState({ position });
  };

  addPlaylist = async () => {
    const { addItems, items } = this.props;
    const { position, duration, startFrom } = this.state;
    this.setState({
      loading: true,
    });
    await addItems(position, startFrom, duration, items);
    this.clear();
  };

  clear = () => {
    this.setState({
      position: "current",
      loading: false,
      startFrom: 0,
      duration: 0,
      durationType: "full",
    });
    this.props.onClose();
  };

  changeStartFrom = (startFrom) => {
    const { duration } = this.state;
    if (duration > startFrom) {
      this.setState({ startFrom });
    }
  };

  changeDurationType = (durationType) => this.setState({ durationType });

  render() {
    const { open, items } = this.props;
    const { position, loading, startFrom, duration, durationType } = this.state;
    return (
      <Modal
        className="add-playlist-modal"
        open={open}
        onClose={this.clear}
        color={themeColor["--primary-color"]}
        textColor="white"
        loading={loading}
      >
        <div className="subject">Add</div>
        <div className="content">
          <div className="sub-title">POSITION</div>
          <Radio
            color="white"
            name="position"
            onChange={() => this.setPosition("current")}
            checked={position === "current"}
          >
            Right now
          </Radio>
          <Radio
            color="white"
            name="position"
            onChange={() => this.setPosition("afterCurrent")}
            checked={position === "afterCurrent"}
          >
            Next
          </Radio>
          <Radio
            color="white"
            name="position"
            onChange={() => this.setPosition("last")}
            checked={position === "last"}
          >
            Last
          </Radio>
          <div className="sub-title">DURATION</div>
          {items.length === 1 && (
            <Radio
              color="white"
              name="repeat"
              checked={durationType === "startFrom"}
              onChange={() => this.changeDurationType("startFrom")}
            >
              <div className="dflex">
                <DurationInput
                  hideDate
                  color="white"
                  value={startFrom}
                  onChange={this.changeStartFrom}
                />
                {"-"}
                <DurationInput hideDate color="white" value={duration} />
              </div>
            </Radio>
          )}
          <Radio
            color="white"
            name="repeat"
            checked={durationType === "full"}
            onChange={() => this.changeDurationType("full")}
          >
            Full
          </Radio>
        </div>
        <div className="actions">
          <Button color="white" onClick={this.addPlaylist}>
            Add
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({
  authUser,
});

export default connect(mapStateToProps, {
  addItems,
})(AddPlaylistModal);
