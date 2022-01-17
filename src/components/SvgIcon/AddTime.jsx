import React, { Component } from 'react'

export default class AddTime extends Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill={this.props.fill || 'var(--primary-color)'} className={this.props.class} width="100%" height="100%" viewBox="0 0 250 250">
        <path d="M211.542,250.014h-22.06v-38.48H151.015V189.467h38.467v-38.48h22.06v38.48H250v22.067H211.542v38.48Z" />
        <path d="M96,0A96,96,0,1,1,0,96,96,96,0,0,1,96,0ZM84,107h82V82H109V25H84v82Z" />
      </svg>
    )
  }
}
