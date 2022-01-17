import React, { Component } from 'react'
import PropsTypes from 'prop-types';
import themeColor from '../../constants/themeColor'
import { themeColorArray } from '../consts'

import './style.scss';

/**
 * Radio Component
 * @augments {Component<Props, State>}
 */
export default class Radio extends Component {
  static propsTypes = {
    color: PropsTypes.string,
    textColor: PropsTypes.string,
    name: PropsTypes.string,
    disabled: PropsTypes.bool,
    align: PropsTypes.oneOf(['', 'left', 'right', 'center']),
    fullWidth: PropsTypes.bool,
    lastFix: PropsTypes.any,
    onClick: PropsTypes.func
  }
  state = {
    checked: false
  }

  makeStyle = () => {
    const { color } = this.props;
    return {
      '--panda-radio-color': themeColorArray[color] || color || themeColor["--primary-color"]
    };
  }

  onChange = evt => {
    this.setState({
      checked: evt.target.checked
    });
    this.props.onChange && this.props.onChange(evt);
  }
  render() {
    const { children, name, disabled } = this.props;
    const checked = this.props.hasOwnProperty('checked') ? this.props.checked : this.state.checked;
    return (
      <label className="panda-radio" style={this.makeStyle()}>
        <input type="radio" disabled={disabled} checked={checked} onChange={this.onChange} name={name}></input>
        <span className="check-mark" />
        <span>
          {children}
        </span>
      </label>
    )
  }
}
