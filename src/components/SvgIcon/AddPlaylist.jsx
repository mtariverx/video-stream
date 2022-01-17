import React, { Component } from 'react'

export default class SvgIcon extends Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill={this.props.fill || 'var(--primary-color)'} className={this.props.class} width="100%" height="100%" viewBox="0 0 250 250">
        <path d="M204.011,96L-0.011,0V192L204.011,96" />
        <path d="M211.542,250.014h-22.06v-38.48H151.015V189.467h38.467v-38.48h22.06v38.48H250v22.067H211.542v38.48Z" />
      </svg>
    )
  }
}
