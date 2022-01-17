import React, { Component } from "react";
import PropsTypes from "prop-types";
import Clappr from "clappr";

import "./style.scss";
/**
 * Video Preview Component
 * @augments {Component<Props, State>}
 */
export default class VideoPreview extends Component {
  static propsTypes = {
    source: PropsTypes.string,
    size: PropsTypes.object,
  };

  shouldComponentUpdate(nextProps, nextState) {
    let changed = nextProps.source !== this.props.source;
    this.props = nextProps;
    this.setState(nextState);
    if (changed) {
      this.change(nextProps.source);
    }
    return false;
  }

  componentDidMount() {
    this.change(this.props.source);
  }

  componentWillUnmount() {
    this.destroyPlayer();
  }

  destroyPlayer() {
    if (this.player) {
      this.player.destroy();
    }
    this.player = null;
  }

  change(source) {
    if (this.player) {
      this.destroyPlayer();
    }
    let width = "100%",
      height = 360;
    if (this.props.size) {
      width = this.props.size.width || width;
      height = this.props.size.height || height;
    }
    this.player = new Clappr.Player({
      parent: this.refs.player,
      source: source,
      poster: "liveprev.png",
      mediacontrol: { seekbar: "#ACD075", buttons: "#8EC044" },
      width: width || "100%",
      height: height || 360,
      hlsjsConfig: {
        enableWorker: true,
      },
    });
  }
  makeStyle = () => {
    const { size } = this.props;
    return {
      "--panda-video-preview-size": size || "100%",
    };
  };
  render() {
    return (
      <div className="panda-video-preview-component" style={this.makeStyle()}>
        <div className="player" ref="player"></div>
      </div>
    );
  }
}
