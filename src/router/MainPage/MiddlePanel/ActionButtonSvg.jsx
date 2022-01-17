import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Svg button
 * @augments {Component<Props, State>}
 */
class ActionButtonSvg extends Component {
  static propTypes = {
    onClick: PropTypes.func
  }
  onClick = evt => {
    this.props.onClick && this.props.onClick(evt);
  }
  render() {
    return (
      <div className="svg-button" onClick={this.onClick}>
        {this.props.children}
      </div>
    )
  }
}

export default ActionButtonSvg