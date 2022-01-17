import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@material-ui/core";
import { NotificationManager } from "react-notifications";

import {
  Modal,
  ImageIcon,
  Clamp,
  TimeIcon,
  InputField,
  Button,
} from "../../../../../components";
import TimingComponent from "../TimingComponent";
import PositionComponent from "../PositionComponent";
import FontComponent from "../FontComponent";
import TrasitionComponent from "../TransitionComponent";
import FormatComponent from "../FormatComponent";
import InputComponent from "../InputComponent";
import ShadowComponent from "../ShadowComponent";
import { CustomScrollContainer } from "../../../../../container";

import {
  addOverlay,
  removeOverlay,
  updateOverlay,
  editOverlay,
  openEditModal,
} from "../../../../../action";

import "./style.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const INITIAL_STATE = {
  value: 0,
  type: "text",
  loading: false,
  openAddItmes: false,
  inputComponentValue: null,
};

class OverlayModal extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  handleChange = (_, value) => {
    this.setState({ value });
  };

  addOverlay = async (overlay) => {
    this.setState({ loading: true });
    await this.props.addOverlay(overlay);
    this.setState({ loading: false, ...INITIAL_STATE });
    this.props.openEditModal(false);
  };

  updateOverlay = async (overlay) => {
    this.setState({ loading: true });
    await this.props.updateOverlay(overlay);
    this.setState({ loading: false, ...INITIAL_STATE });
    this.props.openEditModal(false);
  };

  submit = () => {
    const { overlay } = this.props.overlayStore;
    if (
      this.props.overlayStore.overlayActiveList.length >=
      this.props.authUser.user.overlay_count
    ) {
      NotificationManager.warning(
        "You already used all your available overlay slots." +
          " Please remove some overlay before adding a new one",
        "Warning",
        3000
      );
      return false;
    }
    if (overlay.hasOwnProperty("image")) {
      if (this.state.inputComponentValue !== null) {
        overlay.image = this.state.inputComponentValue;
      }
    }
    overlay.id ? this.updateOverlay(overlay) : this.addOverlay(overlay);
  };

  changeText = (evt) => {
    const { overlay } = this.props.overlayStore;
    if (!overlay.clock) {
      if (overlay.image) {
        this.props.editOverlay({
          ...overlay,
          image: evt.target.value,
        });
      } else {
        this.props.editOverlay({
          ...overlay,
          text: evt.target.value,
        });
      }
    }
  };

  onChangeInputComponent = (value) => {
    this.setState({ inputComponentValue: value });
  };

  removeOverlay = async () => {
    this.setState({ loading: true });
    const { overlay } = this.props.overlayStore;
    await this.props.removeOverlay(overlay.id);
    this.props.openEditModal(false);
    this.setState({ loading: false });
  };

  render() {
    const { type, loading } = this.state;
    const { overlay } = this.props.overlayStore;
    let { value } = this.state;
    if (value === 0 && !overlay.image) value++;
    if (value === 1 && !overlay.clock) value++;
    let imageValue = "tmp/logo.png";
    if (overlay.image) {
      if (overlay.image !== imageValue) {
        imageValue = overlay.image;
      }
    }
    let title;
    if (overlay.hasOwnProperty("clock")) {
      title = overlay.clock;
    } else if (overlay.hasOwnProperty("image")) {
      title = overlay.image;
    } else {
      title = overlay.text;
    }
    return (
      <Modal
        {...this.props}
        className="edit-overlay-modal"
        loading={loading}
        onClose={() => this.props.openEditModal(false)}
      >
        <div className="subject">
          <div className="icon">
            {overlay.image ? (
              <ImageIcon />
            ) : overlay.clock ? (
              <TimeIcon />
            ) : (
              <Clamp />
            )}
          </div>
          <div className="title">
            {overlay.id ? "Edit Overlay" : "Add New Overlay"}
          </div>
        </div>
        <div className="content">
          <CustomScrollContainer>
            <div className="edit-content">
              <div className="subject">
                <div className="icon">
                  {type === "text" && <Clamp />}
                  {type === "image" && <ImageIcon />}
                  {type === "time" && <TimeIcon />}
                </div>
                <InputField
                  size="1.3rem"
                  value={title}
                  onChange={this.changeText}
                />
              </div>
              <div style={{ maxWidth: "80vw" }}>
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="full width tabs example"
                  scrollButtons="auto"
                  variant="scrollable"
                >
                  <Tab
                    label="Input"
                    {...this.a11yProps(0)}
                    disabled={!overlay.image ? true : false}
                  />
                  <Tab
                    label="Format"
                    {...this.a11yProps(1)}
                    disabled={!overlay.clock || overlay.image ? true : false}
                  />
                  <Tab label="Timing" {...this.a11yProps(2)} />
                  <Tab label="Position" {...this.a11yProps(3)} />
                  <Tab
                    label="Font"
                    {...this.a11yProps(4)}
                    disabled={!overlay.style || overlay.image ? true : false}
                  />
                  <Tab label="Transition" {...this.a11yProps(5)} />
                  <Tab label="Shadow" {...this.a11yProps(6)} />
                </Tabs>
              </div>
              <TabPanel value={value} index={0}>
                {overlay.image && (
                  <InputComponent
                    overlay={overlay}
                    onChange={this.onChangeInputComponent}
                  />
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {overlay.clock && <FormatComponent />}
              </TabPanel>
              <TabPanel value={value} index={2}>
                <TimingComponent />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <PositionComponent />
              </TabPanel>
              <TabPanel value={value} index={4}>
                {overlay.style && <FontComponent />}
              </TabPanel>
              <TabPanel value={value} index={5}>
                <TrasitionComponent />
              </TabPanel>
              <TabPanel value={value} index={6}>
                <ShadowComponent />
              </TabPanel>
            </div>
          </CustomScrollContainer>
        </div>
        <div className="actions">
          <Button onClick={this.submit}>
            {overlay.id ? "Update overlay" : "Add overlay"}
          </Button>
          {overlay.id && (
            <Button onClick={this.removeOverlay}>Remove Overlay</Button>
          )}
          <Button
            onClick={() => {
              this.setState({ loading: false, ...INITIAL_STATE });
              this.props.openEditModal(false);
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ overlayStore, authUser }) => ({
  overlayStore,
  authUser,
});

export default connect(mapStateToProps, {
  addOverlay,
  removeOverlay,
  updateOverlay,
  editOverlay,
  openEditModal,
})(OverlayModal);
