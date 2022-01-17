import React, { Component } from "react";

import "./style.scss";
export default class PlayButton extends Component {
  render() {
    const { playing } = this.props;
    // const status = playing === true;
    return (
      <div
        className={`panda-play-button${playing ? " playing" : ""}`}
        onClick={this.props.onClick}
      >
        {playing ? (
          <i className="fa fa-stop-circle" />
        ) : (
          <i className="fa fa-play-circle" />
        )}
      </div>
    );
  }
}
