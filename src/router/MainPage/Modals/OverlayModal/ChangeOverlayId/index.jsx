import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, InputField, Button } from '../../../../../components'
import { addOverlay, getOverlayLists } from '../../../../../action'
import moment from 'moment'

class ChangeOverlayIdModal extends Component {
  state = {
    id: '',
    error: false,
    loading: false
  }

  setId = evt => this.setState({ id: evt.target.value });

  addOverlay = async () => {
    const { overlay } = this.props;
    if (this.checkId()) {
      this.setState({ loading: true });
      overlay.id = this.state.id;
      overlay.end = moment().format('YYYY.MM.DD HH:mm:ss[.SSS]');
      await this.props.addOverlay(overlay);
      await this.props.getOverlayLists('active');
      await this.props.getOverlayLists('waiting');
      this.setState({ loading: false });
      this.props.onClose && this.props.onClose();
      this.props.openOverlayFunction && this.props.openOverlayFunction();
    }
  }

  checkId = () => {
    const { id } = this.state;
    if (id) {
      const { overlayStore } = this.props;
      for (const overlay of overlayStore.overlayActiveList) {
        if (id === overlay.id) {
          this.setState({ error: 'Duplicate Id, Please reenter correctly id..' });
          return false;
        }
      }
    } else {
      this.setState({ error: 'Duplicate Id, Please reenter correctly id..' });
      return false;
    }
    return true;
  }
  render() {
    const { id, error, loading } = this.state;
    return (
      <Modal {...this.props} className="overlay-modal" loading={loading}>
        <div className="subject">Please enter new overlay id</div>
        <div className="content flex flex-col">
          <InputField label="Id" value={id} onChange={this.setId} />
          <div className="error">{error}</div>
        </div>
        <div className="actions">
          <Button onClick={this.addOverlay}>Add Overlay</Button>
          <Button onClick={this.props.onClose}>Close</Button>
        </div>
      </Modal>
    )
  }
}
const mapStateToProps = ({ overlayStore }) => ({
  overlayStore,
});
export default connect(mapStateToProps, {
  addOverlay, getOverlayLists
})(ChangeOverlayIdModal);