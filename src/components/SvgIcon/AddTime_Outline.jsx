import React, { Component } from 'react'

export default class SvgIcon extends Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke={this.props.fill || 'var(--primary-color)'}
        strokeMiterlimit="10"
        className={this.props.class}
        width="100%"
        height="100%"
        viewBox="0 0 576.4 524"
        strokeWidth="20"

      >
        <line x1="366.75" y1="381" x2="497.75" y2="381" />
        <line x1="432.25" y1="316" x2="432.25" y2="446" />
        <circle cx="199.5" cy="227.5" r="188.5" />
        <line x1="200" y1="226" x2="383" y2="226" />
        <line x1="200" y1="39" x2="200" y2="230" />
      </svg>
    )
  }
}
