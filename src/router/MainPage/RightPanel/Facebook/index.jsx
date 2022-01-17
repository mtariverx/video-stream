import React, { Component } from "react";
import { connect } from "react-redux";
import { InputField } from "../../../../components";
import {
  getFacebookLive,
  startFacebookLive,
  stopFacebookLive,
} from "../../../../action";
import "./style.scss";
import PlayButton from "../PlayButton";
class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamKey: "",
      playing: this.props.facebookLive.status,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.props.getFacebookLive();
      if (this.props.facebookLive.status !== this.state.playing) {
        this.setState({ playing: this.props.facebookLive.status });
      }
    }, 120000);
  }

  changeStreamKey = (evt) => this.setState({ streamKey: evt.target.value });

  onClick = async () => {
    const { streamKey, playing } = this.state;
    const status = playing ? "stop" : "start";
    if (status === "start") {
      await this.props.startFacebookLive(streamKey);
    } else {
      await this.props.stopFacebookLive();
    }
    if (playing !== this.props.facebookLive.status) {
      this.setState({ playing: this.props.facebookLive.status });
    }
  };

  render() {
    const { streamKey, playing } = this.state;
    return (
      <div className="face-book-live">
        <div className="title">
          <div className="icon">
            <i className="fa fa-facebook"></i>
          </div>
          Facebook Live
        </div>
        <div className="content">
          <InputField
            label="Streamkey"
            value={streamKey}
            textColor="white"
            onChange={this.changeStreamKey}
          />
        </div>
        <div className="actions">
          <PlayButton onClick={this.onClick} playing={playing} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ facebookLive }) => ({
  facebookLive,
});

export default connect(mapStateToProps, {
  getFacebookLive,
  startFacebookLive,
  stopFacebookLive,
})(Facebook);
