import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Modal,
  ListButton,
  ImageIcon,
  Clamp,
  TimeIcon,
  FaIconButton,
} from "../../../../components";

import "./style.scss";
import {
  addOverlay,
  removeOverlay,
  updateOverlay,
  editOverlay,
  openEditModal,
  getOverlayLists,
} from "../../../../action";

import { CustomScrollContainer } from "../../../../container";

class OverlayModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      type: "text",
      loading: true,
      fetchLoading: true,
      overlayIndex: undefined,
      // overlayStore: props.overlayStore,
    };
  }

  componentDidMount = async () => {
    await this.props.getOverlayLists("active");
    await this.props.getOverlayLists("waiting");
    this.setState({ loading: false, fetchLoading: false });
  };

  // componentDidUpdate(prevProps) {
  //   if (this.props.overlayStore !== prevProps.overlayStore) {
  //     console.log("Changed");
  //     this.setState({ overlayStore: this.props.overlayStore });
  //   }
  // }

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
    this.setState({ loading: false });
  };

  removeOverlay = async () => {
    this.setState({ loading: true });
    await this.props.removeOverlay(this.state.overlay.id);
    this.setState({ loading: false });
  };

  setOverlay = (overlay, index) => {
    this.setState({
      overlayIndex: index,
    });
    this.props.editOverlay(overlay);
    this.props.openEditModal(true);
  };

  clear = () => {
    this.setState({
      overlayIndex: undefined,
    });
    this.props.onClose();
  };

  openEditOverlayModal = (openEditOverlay = false) =>
    this.setState({ openEditOverlay });

  onOpenAddItem = () =>
    this.props.modalFunction("add-new-overlay-drawer", true);

  render() {
    const { loading, overlayIndex, fetchLoading } = this.state;
    const { overlayStore, authUser } = this.props;
    return (
      <Modal
        {...this.props}
        className="overlay-modal"
        loading={loading}
        width="80vw"
        onClose={this.clear}
      >
        <div className="content">
          {!fetchLoading && (
            <>
              <CustomScrollContainer>
                <div className="lists-container">
                  <div className="lists">
                    <div className="sheduled">On Air</div>
                    {Array.isArray(overlayStore.overlayActiveList) &&
                      overlayStore.overlayActiveList.map((element, index) => (
                        <div key={index}>
                          <ListButton
                            selected={
                              overlayStore.overlay.hasOwnProperty("id") &&
                              overlayIndex === index
                                ? overlayStore.overlay.id === element.id
                                : null
                            }
                            key={element.id}
                            icon={
                              element.clock ? (
                                <TimeIcon />
                              ) : element.image ? (
                                <ImageIcon />
                              ) : (
                                <Clamp />
                              )
                            }
                            onClick={() => this.setOverlay(element, index)}
                          >
                            {element.clock || element.text || (
                              <img
                                src={element.image}
                                alt="Base64Img"
                                style={{
                                  width: "20%",
                                  height: "auto",
                                }}
                              />
                            )}
                          </ListButton>
                        </div>
                      ))}
                  </div>
                  <div className="lists">
                    <div className="sheduled">Upcoming</div>
                    {Array.isArray(overlayStore.overlayWaitingList) &&
                      overlayStore.overlayWaitingList.map((element, index) => (
                        <ListButton
                          selected={
                            overlayStore.overlay.id === element.id &&
                            overlayIndex === index
                          }
                          key={element.id}
                          icon={
                            element.clock ? (
                              <TimeIcon />
                            ) : element.image ? (
                              <ImageIcon />
                            ) : (
                              <Clamp />
                            )
                          }
                          onClick={() => this.setOverlay(element, index)}
                        >
                          {element.image || element.clock || element.text}
                        </ListButton>
                      ))}
                  </div>
                </div>
              </CustomScrollContainer>
              <div className="notify">
                <p>{`${
                  overlayStore.overlayActiveList.length +
                  overlayStore.overlayWaitingList.length
                } overlays used in ${authUser.user.overlay_count}. Left: ${
                  authUser.user.overlay_count -
                  overlayStore.overlayActiveList.length -
                  overlayStore.overlayWaitingList.length
                }.`}</p>
              </div>
              <div className="actions">
                <FaIconButton
                  icon="fa-plus-circle"
                  size="2rem"
                  onClick={this.onOpenAddItem}
                />
              </div>
            </>
          )}
        </div>

        {/* <div className="actions">
          <FaIconButton
            icon="fa-plus-circle"
            size="2rem"
            onClick={this.onOpenAddItem}
          />
        </div> */}
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
  getOverlayLists,
})(OverlayModal);
