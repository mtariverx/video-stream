import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getViewChanels,
  getViewCurrentItem,
  setMainPageTable,
  getOverlayLists,
} from "../../action";
import LeftPanel from "./LeftPanel";
import MiddleComponent from "./MiddlePanel";
import RightPanel from "./RightPanel";
import { AddMediaModal, AddPlaylistModal, AddLiveModal } from "./Modals";
import OverlayModal from "./Modals/OverlayModal";
import ChangeOverlayIdModal from "./Modals/OverlayModal/ChangeOverlayId";
import EditOverlay from "./Modals/OverlayModal/EditOverlay";
import { CustomScrollContainer } from "../../container";
import AddNewItemsDrawer from "./Modals/OverlayModal/AddNewItemsDrawer";

import "./style.scss";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      dockPanel: "",
      loading: true,
      openAddMediaModel: false,
      openAddPlaylistModal: false,
      openOverlayModal: false,
      openChangeOverlayIdModal: false,
      openAddLiveModal: false,
      openAddItmes: false,
      items: [],
      overlay: {},
      itemId: 0,
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    if (this._isMounted) return;
    const { authUser, history } = this.props;
    if (authUser.user) {
      await this.props.getViewChanels();
      await this.props.getViewCurrentItem();
      await this.props.setMainPageTable("program");
      setInterval(async () => {
        await this.props.getViewCurrentItem();
      }, 60000);
      this._isMounted = true;

      this.setState({
        loading: false,
      });
    } else {
      history.push("/login");
    }
  };

  setDockPanel = (dockPanel) => {
    this.setState({ dockPanel });
  };

  changeModalStatus = (modalName, status = false, items = [], itemId = 0) => {
    // console.log(modalName, status, items, itemId);
    switch (modalName) {
      case "add-playlist":
        this.setState({
          items,
          openAddPlaylistModal: status,
        });
        break;
      case "add-time":
        this.setState({
          items,
          openAddMediaModel: status,
          itemId,
        });
        break;
      case "overlay-modal":
        this.setState({
          openOverlayModal: status,
        });
        break;
      case "change-overlay-id-modal":
        this.setState({
          overlay: items,
          openChangeOverlayIdModal: status,
        });
        break;
      case "add-new-overlay-drawer":
        this.setState({
          openAddItmes: status,
        });
        break;
      case "add-live-modal":
        this.setState({
          items,
          itemId,
          openAddLiveModal: status,
        });
        break;
      default:
    }
  };

  changeOverlay = (overlay) => {
    this.setState({ overlay });
  };

  render() {
    const { overlayStore } = this.props;
    const {
      dockPanel,
      loading,
      openAddMediaModel,
      openAddPlaylistModal,
      items,
      itemId,
      openOverlayModal,
      overlay,
      openChangeOverlayIdModal,
      openAddItmes,
      openAddLiveModal,
    } = this.state;

    if (loading && !this._isMounted)
      return <div className="before-loading-overlay"></div>;
    if (!loading && this._isMounted) {
      return (
        <div className="main-page">
          <CustomScrollContainer>
            <div className="dflex">
              <div
                className={`overlay${dockPanel ? " active" : ""}`}
                onClick={() => this.setDockPanel("")}
              ></div>
              <div
                className={`left-box${dockPanel === "left" ? " active" : ""}`}
              >
                <LeftPanel modalFunction={this.changeModalStatus}></LeftPanel>
              </div>
              <div className="center-box">
                <MiddleComponent modalFunction={this.changeModalStatus} />
              </div>
              <div
                className={`right-box${dockPanel === "right" ? " active" : ""}`}
              >
                <RightPanel modalFunction={this.changeModalStatus} />
              </div>
              <div
                className="left-touch"
                onClick={() => this.setDockPanel("left")}
              >
                <i className="fa fa-align-justify"></i>
              </div>
              <div
                className="right-touch"
                onClick={() => this.setDockPanel("right")}
              >
                <i className="fa fa-align-justify"></i>
              </div>
              {/* <LoginModal open={!authUser.user} /> */}
              {openAddMediaModel && (
                <AddMediaModal
                  open={openAddMediaModel}
                  items={items}
                  itemId={this.state.itemId}
                  onClose={() => this.changeModalStatus("add-time")}
                />
              )}

              <AddPlaylistModal
                open={openAddPlaylistModal}
                items={items}
                onClose={() => this.changeModalStatus("add-playlist")}
              />
              {/* {this.props.mainPage.selectedLive && ( */}
              {openAddLiveModal && (
                <AddLiveModal
                  open={openAddLiveModal}
                  items={items}
                  itemId={itemId}
                  title={
                    this.props.mainPage.liveContent.length
                      ? `My Live ${this.props.mainPage.selectedLive}`
                      : items[0].title
                  }
                  onClose={() => this.changeModalStatus("add-live-modal")}
                  selectedLiveItem={this.props.mainPage.selectedLive}
                />
              )}

              {openOverlayModal && (
                <OverlayModal
                  open={openOverlayModal}
                  onClose={() => this.changeModalStatus("overlay-modal")}
                  overlay={overlay}
                  onChange={this.changeOverlay}
                  modalFunction={this.changeModalStatus}
                />
              )}
              <EditOverlay
                open={overlayStore.openEditModal}
                onClose={() => {}}
              />

              <ChangeOverlayIdModal
                open={openChangeOverlayIdModal}
                onClose={() =>
                  this.changeModalStatus("change-overlay-id-modal")
                }
                overlay={overlay}
                openOverlayFunction={() =>
                  this.changeModalStatus("overlay-modal", true)
                }
              />
            </div>
          </CustomScrollContainer>
          <AddNewItemsDrawer
            open={openAddItmes}
            onClose={() => this.changeModalStatus("add-new-overlay-drawer")}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = ({ authUser, overlayStore, mainPage }) => ({
  authUser,
  overlayStore,
  mainPage,
});

export default withRouter(
  connect(mapStateToProps, {
    setMainPageTable,
    getViewChanels,
    getOverlayLists,
    getViewCurrentItem,
  })(MainPage)
);
