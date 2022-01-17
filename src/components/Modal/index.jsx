import React, { Component } from "react";
import PropsTypes from "prop-types";

import "./style.scss";
import themeColor from "../../constants/themeColor";

/**
 * Modal Component
 * @augments {Component<Props, State>}
 */
class Modal extends Component {
  static propsTypes = {
    open: PropsTypes.bool,
    color: PropsTypes.string,
    textColor: PropsTypes.string,
    width: PropsTypes.string,
    fullWidth: PropsTypes.bool,
    closeOutClick: PropsTypes.bool,
    onClose: PropsTypes.func,
  };

  state = {
    open: false,
  };

  makeStyle = () => {
    const open = this.props.hasOwnProperty("open")
      ? this.props.open
      : this.state.open;
    const { width, fullWidth, color, textColor } = this.props;
    return {
      display: open ? "flex" : "none",
      "--panda-modal-width": fullWidth ? "90%" : width || "auto",
      "--panda-modal-background-color": color || "white",
      "--panda-modal-text-color":
        textColor || themeColor["--default-font-color"],
    };
  };
  onClose = () => {
    if (this.props.hasOwnProperty("open")) {
      this.props.hasOwnProperty("onClose") && this.props.onClose();
    } else {
      this.setState({ open: false });
    }
  };

  render() {
    const open = this.props.hasOwnProperty("open")
      ? this.props.open
      : this.state.open;
    const { children, closeOutClick, className, loading } = this.props;
    return (
      <div
        className={`panda-modal ${className}`}
        style={this.makeStyle()}
        onClick={closeOutClick && this.onClose}
      >
        <div className="modal-content">
          {loading && <div className="loading-overlay"></div>}
          {open && children}
          <div className="close-action" onClick={this.onClose}>
            <i className="fa fa-close" />
          </div>
        </div>
      </div>
    );
  }
}
export default Modal;
