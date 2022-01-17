import React, { Component } from 'react'
import PropsTypes from 'prop-types';
import './style.scss';
/**
 * Data table Component
 * @augments {Component<Props, State>}
 */
export default class Loading extends Component {
  static propsTypes = {
    loading: PropsTypes.bool,
  }
  state = {
    loading: true
  }
  render() {
    const { loading, children, style } = this.props;
    return loading ? <div className="panda-loading-overlay" style={style}></div> : children
  }
}
