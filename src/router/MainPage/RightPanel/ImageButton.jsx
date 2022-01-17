import React, { Component } from 'react'

export default class ImageButton extends Component {
  render() {
    const { src, alt } = this.props;
    return (
      <div className="image-button">
        <img src={src} alt={alt} />
      </div>
    )
  }
}
