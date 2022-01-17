import React, { Component } from "react";
import { connect } from "react-redux";
import { Drawer } from "@material-ui/core";
import {
  ListButton,
  Clamp,
  TimeIcon,
  ImageIcon,
} from "../../../../../components";
import { getOverlaySetting } from "../../../../../utils/PandaUtils";
import { editOverlay } from "../../../../../action";

class AddNewItemsDrawer extends Component {
  openChangeIdModal = async (type) => {
    this.props.onClose();
    await this.props.editOverlay(getOverlaySetting(type));
    // this.props.modalFunction && this.props.modalFunction('overlay-modal', true, getOverlaySetting(type));
  };
  render() {
    return (
      <Drawer
        anchor="bottom"
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <ListButton
          onClick={() => this.openChangeIdModal("add-text")}
          icon={<Clamp />}
        >
          Add Text
        </ListButton>
        <ListButton
          onClick={() => this.openChangeIdModal("news-bar")}
          icon={<Clamp />}
        >
          Add News Bar
        </ListButton>
        <ListButton
          onClick={() => this.openChangeIdModal("clock")}
          icon={<TimeIcon />}
        >
          Add Clock
        </ListButton>
        <ListButton
          onClick={() => this.openChangeIdModal("add-image")}
          icon={<ImageIcon />}
        >
          Add Image
        </ListButton>
        <ListButton onClick={this.openChangeIdModal} icon={<Clamp />}>
          Add Countdown
        </ListButton>
      </Drawer>
    );
  }
}

const mapStateToProps = ({ overlayStore }) => ({
  overlayStore,
});

export default connect(mapStateToProps, {
  editOverlay,
})(AddNewItemsDrawer);
