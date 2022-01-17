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
        <path d="M858.82,515.94,596.54,364.51c-23.13-13.35-52,3.34-52,30.05V697.41c0,26.71,28.91,43.4,52,30.05L858.82,576C882,562.68,882,529.29,858.82,515.94Z" transform="translate(-489 -313)" />
        <line x1="366.75" y1="381" x2="497.75" y2="381" />
        <line x1="432.25" y1="316" x2="432.25" y2="446" />
      </svg>
    )
  }
}
