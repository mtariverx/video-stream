import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Slider } from '@material-ui/core'
import { Select, CheckBox, ColorPicker } from '../../../../../components'
import { editOverlay } from '../../../../../action'

import './style.scss'

class FontComponent extends Component {
  state = {
    font: 'SansSerif',
    color: '#000000',
    style: [],
    size: 20
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { overlay } = nextProps.overlayStore;
    if (overlay.style) {
      let { font, color, style, size } = overlay.style;
      style = style.split(' ');
      this.setState({ font, color, style, size });
    }
  }

  UNSAFE_componentWillMount() {
    const { overlay } = this.props.overlayStore;
    if (overlay.style) {
      let { font, color, style, size } = overlay.style;
      style = style.split(' ');
      this.setState({ font, color, style, size });
    }
  }

  colorChange = color => {
    this.setState({ color }, this.onChange);
  }
  changeFont = evt => {
    this.setState({ font: evt.target.value }, this.onChange);
  }
  changeStyle = type => {
    let { style } = this.state;
    if (style.includes(type)) {
      style.splice(style.indexOf(type), 1);
    } else {
      style.push(type);
    }
    this.setState({ style }, this.onChange);
  }
  changeFontSize = (_, value) => {
    this.setState({ size: value }, this.onChange);
  }
  onChange = () => {
    const { font, color, style, size } = this.state;
    this.props.editOverlay({
      ...this.props.overlayStore.overlay,
      style: { font, color, size, style: style.join(' ') }
    })
  }
  makeSampleStyle = (font, size, color, style) => {
    // const { font, size, color, style } = this.state;
    return {
      color,
      fontSize: `${size}px`,
      fontFamily: font,
      fontWeight: style.includes('bold') ? 800 : 100,
      fontStyle: style.includes('italic') ? 'italic' : 'normal'
    }
  }
  render() {
    let { font, color, style, size } = this.state;
    return (
      <div className="font-component">
        <div className="edit-panel">
          <div className="items">
            <div className="sub-title">Font Type</div>
            <Select width="150px" label="Family" value={font} onChange={this.changeFont}>
              <option value="Sans">SansSerif</option>
              <option value="Sans">SansSerif</option>
              <option value="Sans">SansSerif</option>
              <option value="Sans">SansSerif</option>
              <option value="Sans">SansSerif</option>
            </Select>
          </div>
          <div className="items">
            <div className="sub-title">Font Style</div>
            <CheckBox checked={style.includes('bold')} onChange={() => this.changeStyle('bold')}>B</CheckBox>
            <CheckBox checked={style.includes('italic')} onChange={() => this.changeStyle('italic')}>I</CheckBox>
          </div>
        </div>
        <div className="edit-panel">
          <div className="items">
            <div className="sub-title">Font Size</div>
            <Slider color="secondary" min={10} max={100} value={size} onChange={this.changeFontSize} valueLabelDisplay="on" className="m-t-50" />
          </div>
          <div className="items">
            <div className="sub-title">Color</div>
            <ColorPicker onChange={this.colorChange} color={color} />
          </div>
        </div>
        <div className="edit-panel">
          <div className="items">
            <div className="sub-title" style={this.makeSampleStyle(font, size, color, style)}>Sample</div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ overlayStore }) => ({
  overlayStore,
});
export default connect(mapStateToProps, {
  editOverlay
})(FontComponent);