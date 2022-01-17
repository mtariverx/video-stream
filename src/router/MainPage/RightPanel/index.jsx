import React, { Component } from "react";
import { connect } from "react-redux";
import { VideoPreview, Button } from "../../../components";
import { getOverlaySetting } from "../../../utils/PandaUtils";
import { openEditModal, editOverlay } from "../../../action";
import Facebook from "./Facebook";
import Youtube from "./Youtube";
import { NotificationManager } from "react-notifications";

class RightPanel extends Component {
  openChangeIdModal = async (type) => {
    this.props.editOverlay(getOverlaySetting(type));
  };
  openOverlay = async (key) => {
    const warningExist = this.warningMsg();
    if (warningExist) {
      return false;
    }

    this.props.modalFunction && this.props.modalFunction(key, true);
  };
  warningMsg = () => {
    if (this.props.authUser && !this.props.authUser.user.overlay) {
      NotificationManager.warning(
        "You don't have the option to add Overlay",
        "Warning",
        3000
      );
      return true;
    }
    return false;
  };
  render() {
    const { vodpreview } = this.props.authUser.user;
    const { previewItem } = this.props.mainPage;
    let rightPlayerSource = "";
    if (previewItem === "") {
      rightPlayerSource = `${vodpreview}MusicSN/item-6.mp4/playlist.m3u8`;
    } else {
      rightPlayerSource = previewItem;
    }
    return (
      <div className="right-panel">
        <VideoPreview source={rightPlayerSource} size={{ height: 150 }} />
        <div className="subject">Overlay</div>
        <Button
          textColor="white"
          onClick={() => this.openOverlay("overlay-modal")}
        >
          <i className="fa fa-camera" />
          Overlay Lists
        </Button>
        <Button
          textColor="white"
          onClick={() => this.openOverlay("add-new-overlay-drawer")}
        >
          <i className="fa fa-plus-circle" />
          Add an Overlay
        </Button>
        {/* <ListButton
          onClick={() => this.openChangeIdModal('add-text')}
          icon={<Clamp />}
        >Add Text</ListButton>
        <ListButton
          onClick={() => this.openChangeIdModal('news-bar')}
          icon={<Clamp />}
        >Add News Bar</ListButton>
        <ListButton
          onClick={() => this.openChangeIdModal('clock')}
          icon={<TimeIcon />}
        >Add Clock</ListButton>
        <ListButton
          onClick={() => this.openChangeIdModal('add-image')}
          icon={<ImageIcon />}
        >Add Image</ListButton>
        <ListButton
          onClick={this.openChangeIdModal}
          icon={<Clamp />}
        >Add Countdown</ListButton>
        */}
        <div className="subject">Live Social Network</div>
        <Facebook />
        <Youtube />
        <div className="subject">PUBLISH/SHARE</div>
        <Button>EMBED CODE</Button>
        <Button>FACEBOOK</Button>
        <Button>EMAIL</Button>
      </div>
    );
  }
}

const mapStateToProps = ({ mainPage, authUser }) => ({
  mainPage,
  authUser,
});

export default connect(mapStateToProps, {
  editOverlay,
  openEditModal,
})(RightPanel);
