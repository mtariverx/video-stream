import React, { Component } from 'react'
import { Radio } from '../../../../../components'
import { connect } from 'react-redux'
import { editOverlay } from '../../../../../action'

class FormatComponent extends Component {
  state = {
    value: 'HH:mm'
  }
  changeValue = value => {
    this.setState({ value }, this.onChange)
  }
  onChange = () => {
    this.props.editOverlay({
      ...this.props.overlayStore.overlay,
      clock: this.state.value
    });
  }
  render() {
    const value = this.props.value || this.state.value;
    return (
      <div>
        {/* <Radio onChange={() => this.changeValue('YYYY.MM.DD HH:mm:ss')} checked={value === 'YYYY.MM.DD HH:mm:ss'}>YYYY.MM.DD HH:mm:ss</Radio>
        <Radio onChange={() => this.changeValue('EEE.MMM.DD.YY')} checked={value === 'EEE.MMM.DD.YY'}>EEE.MMM.DD.YY</Radio> */}
        <Radio onChange={() => this.changeValue('HH:mm')} checked={value === 'HH:mm'}>HH:mm</Radio>
        <Radio onChange={() => this.changeValue('HH:mm:ss')} checked={value === 'HH:mm:ss'}>HH:mm:ss</Radio>
        {/* <Radio onChange={() => this.changeValue('YYYY.MMMMM:DD GGG hh:mm')} checked={value === 'YYYY.MMMMM:DD GGG hh:mm'}>YYYY.MMMMM:DD GGG hh:mm</Radio>
        <Radio onChange={() => this.changeValue('yyyy-mm-ddTHH-mm-ss')} checked={value === 'yyyy-mm-ddTHH-mm-ss'}>yyyy-mm-ddTHH-mm-ss</Radio> */}
      </div>
    )
  }
}
const mapStateToProps = ({ overlayStore }) => ({
  overlayStore,
});
export default connect(mapStateToProps, {
  editOverlay
})(FormatComponent);