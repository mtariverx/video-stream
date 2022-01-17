import React, { Component } from 'react'
import { Menu } from '@material-ui/core';
import { SketchPicker } from 'react-color'

import './style.scss';

export default class ColorPicker extends Component {
  state = {
    color: "#000",
    anchorEl: null
  }
  makeStyle = () => {
    const { color } = this.state;
    return {
      '--panda-selected-color': color
    }
  }
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }
  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }
  handleChangeComplete = evt => {
    this.setState({
      color: evt.hex
    }, this.onChange);

  }
  onChange = () => {
    this.props.onChange && this.props.onChange(this.state.color);
  }
  render() {
    let { color, anchorEl } = this.state;
    if (this.props.color) color = this.props.color
    return (
      <div style={this.makeStyle()} className="panda-color-picker">
        <div
          onClick={this.handleClick}
          className="color-button"
          aria-controls="panda-color-picker-menu"
          aria-haspopup="true"
        >
          <div className="show-color"></div>
          <div>{color}</div>
        </div>
        <Menu id="panda-color-picker-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <SketchPicker
            color={color}
            onChangeComplete={this.handleChangeComplete} />
        </Menu>
      </div>
    )
  }
}
