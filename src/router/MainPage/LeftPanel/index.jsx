import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";

import {
  setMainPageTable,
  setPlaySignalingURL,
  setPlayApplicationName,
  setPlayStreamName,
  startPlay,
} from "../../../action";

import { VideoPreview } from "../../../components/";
import WebRTCPlayer from "../../../components/WebRTC";
import ProgramsComponent from "./Programs";
import PadTab from "./Pad";
import LiveTab from "./LiveTab";

class LeftPanel extends Component {
  onSelect = async (key) => {
    await this.props.setMainPageTable(key);
    const { mainPage } = this.props;
    if (key === "pad" && Array.isArray(mainPage.padTableLists) === true) {
      await this.props.setMainPageTable(key);
    }
    // await this.props.getViewCurrentItem();
  };

  componentDidMount() {
    this.props.setPlaySignalingURL(this.props.authUser.user.SignalingURL);
    this.props.setPlayApplicationName(this.props.authUser.user.appName);
    const channel =
      this.props.mainPage.channel === ""
        ? this.props.mainPage.defaultChannelData.contentStreams[0].name
        : this.props.mainPage.channel;
    this.props.setPlayStreamName(`${channel}_output`);
    this.props.startPlay(`${channel}_output`);
  }

  render() {
    const { livepreview } = this.props.authUser.user;
    const channel =
      this.props.mainPage.channel === ""
        ? this.props.mainPage.defaultChannelData.contentStreams[0].name
        : this.props.mainPage.channel;
    const leftPlayerSource = `${livepreview}${this.props.mainPage.defaultChannelData.contentStreams[0].appName}/${channel}_output/playlist.m3u8`;
    const { mainPage } = this.props;
    return (
      <div className="left-panel">
        <VideoPreview source={leftPlayerSource} size={{ height: 200 }} />
        <div className="select-panel">
          <Tabs onSelect={this.onSelect}>
            <Tab
              eventKey="program"
              title={
                <>
                  <i className="fa fa-calendar" />
                  Programs
                </>
              }
            >
              <ProgramsComponent />
            </Tab>
            <Tab
              eventKey="pad"
              title={
                <>
                  <i className="fa fa-film" />
                  Pad
                </>
              }
            >
              <PadTab modalFunction={this.props.modalFunction} />
            </Tab>
            <Tab
              eventKey="live"
              title={
                <>
                  <i className="fa fa-podcast" />
                  Live
                </>
              }
            >
              <LiveTab />
            </Tab>
          </Tabs>
        </div>
        {mainPage.tableName === "program" && (
          <div
            style={{
              width: "100%",
              height: "300px",
              backgroundColor: "rgb(142 192 68)",
            }}
          >
            <WebRTCPlayer size={{ height: "100%", width: "100%" }} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, mainPage }) => ({
  authUser,
  mainPage,
});

const mapDispatchToProps = (dispatch) => ({
  setMainPageTable: (key) => dispatch(setMainPageTable(key)),
  setPlaySignalingURL: (url) => dispatch(setPlaySignalingURL(url)),
  setPlayApplicationName: (app_name) =>
    dispatch(setPlayApplicationName(app_name)),
  setPlayStreamName: (stream_name) => dispatch(setPlayStreamName(stream_name)),
  startPlay: () => dispatch(startPlay()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeftPanel)
);
