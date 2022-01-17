import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "../Modal";
import { Button } from "..";
import { closeAlert } from "../../action";

class AlertModal extends Component {
  onAction = () => {
    this.props.alert.onAction && this.props.alert.onAction();
    this.props.closeAlert();
  };
  render() {
    const { closeAlert } = this.props;
    const { title, content, open, onAction } = this.props.alert;
    return (
      <Modal {...this.props} open={open}>
        <div className="subject">{title}</div>
        <div className="content">{content}</div>
        <div className="actions">
          <Button onClick={this.onAction}>{onAction ? "Yes" : "Ok"}</Button>
          {onAction && <Button onClick={closeAlert}>No</Button>}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ alert }) => ({
  alert,
});

export default connect(mapStateToProps, {
  closeAlert,
})(AlertModal);
