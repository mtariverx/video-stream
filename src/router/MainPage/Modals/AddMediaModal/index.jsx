import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { CustomScrollContainer } from "../../../../container";
import { addPlaylists } from "../../../../action";
import {
  Modal,
  Button,
  CheckBox,
  Radio,
  DateInput,
  InputField,
  CustomSelect,
} from "../../../../components";
import themeColor from "../../../../constants/themeColor";

import "./style.scss";

class AddMediaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      repeat: "everyday",
      title:
        props.itemId > 0
          ? props.mainPage.programTableLists.filter(
              (playlist) => playlist.id === props.itemId
            )[0].title
          : "My Playlist",
      toRepeat: false,
      position: "right",
      positionDate:
        props.itemId > 0
          ? props.mainPage.programTableLists.filter(
              (playlist) => playlist.id === props.itemId
            )[0].startTime
          : moment().valueOf(),
      repeatUntil: moment().valueOf(),
      days: [],
      shuffle:
        props.itemId > 0
          ? props.mainPage.programTableLists.filter(
              (playlist) => playlist.id === props.itemId
            )[0].shuffle
          : false,
      priority:
        props.itemId > 0
          ? props.mainPage.programTableLists.filter(
              (playlist) => playlist.id === props.itemId
            )[0].priority
          : 1,
    };
  }

  changeRepeat = (type) => (evt) => {
    if (evt.target.checked) {
      this.setState({ repeat: type });
    }
  };

  selectDays = (day) => {
    let { days } = this.state;
    if (days.includes(day)) {
      days.splice(days.indexOf(day), 1);
    } else {
      days.push(day);
    }
    this.setState({ days });
  };

  changePositionDate = (positionDate) => {
    // console.log(moment(positionDate).hours());
    this.setState((prevState) => ({
      positionDate,
      repeatUntil:
        positionDate > prevState.repeatUntil
          ? positionDate
          : prevState.repeatUntil,
    }));
  };

  changeRepeatUntil = (repeatUntil) => {
    if (repeatUntil > this.state.positionDate) this.setState({ repeatUntil });
  };

  changeToRepeat = () => {
    this.setState({ toRepeat: !this.state.toRepeat });
  };

  makeRequestData = async () => {
    this.setState({ loading: true });
    const {
      repeat,
      positionDate,
      repeatUntil,
      days,
      toRepeat,
      title,
      shuffle,
      priority,
    } = this.state;
    const repeatDays = [];
    if (toRepeat) {
      let startDate = moment(positionDate);
      let endDate = moment(repeatUntil);
      while (startDate.valueOf() <= endDate.valueOf()) {
        if (repeat === "everyday") {
          repeatDays.push(startDate.valueOf());
        } else if (days.includes(startDate.day())) {
          repeatDays.push(startDate.valueOf());
        }
        startDate.add(1, "day");
      }
    } else {
      repeatDays.push(positionDate);
    }
    let sumDuration = 0;
    for (let item of this.props.items) {
      sumDuration += parseInt(item.duration);
    }
    await this.props.addPlaylists(
      this.props.items,
      title,
      sumDuration,
      repeatDays,
      this.props.itemId,
      shuffle,
      priority
    );
    await this.clear();
  };

  clear = async () => {
    this.setState({
      loading: false,
      repeat: "everyday",
      title: "My Playlist",
      toRepeat: false,
      position: "right",
      positionDate: moment().valueOf(),
      repeatUntil: moment().valueOf(),
      days: [],
    });
    await this.props.onClose();
  };

  changeTitle = (evt) => this.setState({ title: evt.target.value });

  render() {
    const { open } = this.props;
    const {
      repeat,
      positionDate,
      repeatUntil,
      days,
      toRepeat,
      loading,
      title,
      shuffle,
      priority,
    } = this.state;
    const disabledDays = repeat !== "every";
    let priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <Modal
        className="add-media-modal"
        open={open}
        onClose={this.clear}
        color={themeColor["--primary-color"]}
        textColor="white"
        loading={loading}
      >
        <div className="subject">Add</div>
        <div className="content">
          <CustomScrollContainer color="white">
            <InputField
              label="Title"
              value={title}
              onChange={this.changeTitle}
              color="white"
              textColor="white"
            />
            <div className="sub-title">Time</div>
            <Radio color="white" name="position" checked>
              <DateInput
                color="white"
                value={positionDate}
                onChange={this.changePositionDate}
              />
            </Radio>
            <CheckBox
              color="white"
              checked={!!toRepeat}
              onChange={this.changeToRepeat}
            >
              TO REPEAT
            </CheckBox>
            {toRepeat && (
              <div className="m-l-20">
                <div className="sub-title">REPEAT</div>
                <Radio
                  color="white"
                  name="repeat"
                  checked={repeat === "everyday"}
                  onChange={this.changeRepeat("everyday")}
                >
                  Everyday
                </Radio>
                <Radio
                  color="white"
                  name="repeat"
                  checked={repeat === "every"}
                  onChange={this.changeRepeat("every")}
                >
                  Every
                </Radio>
                <div className="select-day">
                  <div>
                    <CheckBox
                      color="white"
                      disabled={disabledDays}
                      checked={days.includes(1)}
                      onChange={() => this.selectDays(1)}
                    >
                      Monday
                    </CheckBox>
                    <CheckBox
                      color="white"
                      disabled={disabledDays}
                      checked={days.includes(2)}
                      onChange={() => this.selectDays(2)}
                    >
                      Tuesday
                    </CheckBox>
                    <CheckBox
                      color="white"
                      disabled={disabledDays}
                      checked={days.includes(3)}
                      onChange={() => this.selectDays(3)}
                    >
                      Wednesday
                    </CheckBox>
                    <CheckBox
                      color="white"
                      disabled={disabledDays}
                      checked={days.includes(4)}
                      onChange={() => this.selectDays(4)}
                    >
                      Thursday
                    </CheckBox>
                  </div>
                  <div>
                    <CheckBox
                      color="white"
                      disabled={disabledDays}
                      checked={days.includes(5)}
                      onChange={() => this.selectDays(5)}
                    >
                      Friday
                    </CheckBox>
                    <CheckBox
                      color="white"
                      disabled={disabledDays}
                      checked={days.includes(6)}
                      onChange={() => this.selectDays(6)}
                    >
                      Saturday
                    </CheckBox>
                    <CheckBox
                      color="white"
                      disabled={disabledDays}
                      checked={days.includes(0)}
                      onChange={() => this.selectDays(0)}
                    >
                      Sunday
                    </CheckBox>
                  </div>
                </div>
                <div className="sub-title">REPEAT UNTIL</div>
                <Radio color="white" name="repeat-until" checked={true}>
                  <DateInput
                    color="white"
                    hideTime
                    value={repeatUntil}
                    onChange={this.changeRepeatUntil}
                    upDirection
                  />
                </Radio>
              </div>
            )}
            <CheckBox
              color="white"
              checked={shuffle}
              onChange={(evt) => this.setState({ shuffle: evt.target.checked })}
            >
              Shuffle
            </CheckBox>

            <div className="sub-title">Priority</div>
            <CustomSelect
              color="white"
              textColor="white"
              items={priorities}
              value={priority}
              width="20%"
              onChange={(value) => this.setState({ priority: value })}
            />
          </CustomScrollContainer>
        </div>
        <div className="actions">
          <Button color="white" onClick={this.makeRequestData}>
            Add
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ authUser, mainPage }) => ({
  authUser,
  mainPage,
});

export default connect(mapStateToProps, {
  addPlaylists,
})(AddMediaModal);
