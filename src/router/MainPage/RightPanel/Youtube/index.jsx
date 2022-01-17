import React, { Component } from "react";
import { connect } from "react-redux";
import { InputField } from "../../../../components";
import {
  getYoutubeLive,
  startYoutubeLive,
  stopYoutubeLive,
} from "../../../../action";
import "./style.scss";
import PlayButton from "../PlayButton";
import { YouTube } from "@material-ui/icons";

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamKey: "",
      playing: this.props.youtubeLive.status,
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.props.getYoutubeLive();
      if (this.props.youtubeLive.status !== this.state.playing) {
        this.setState({ playing: this.props.youtubeLive.status });
      }
    }, 120000);
  }

  changeStreamKey = (evt) => this.setState({ streamKey: evt.target.value });

  onClick = async () => {
    const { streamKey, playing } = this.state;
    const status = playing ? "stop" : "start";
    if (status === "start") {
      await this.props.startYoutubeLive(streamKey);
    } else {
      await this.props.stopYoutubeLive();
    }
    if (playing !== this.props.youtubeLive.status) {
      this.setState({ playing: this.props.youtubeLive.status });
    }
  };
  render() {
    const { playing, streamKey } = this.state;

    return (
      <div className="youtube-live">
        <div className="title">
          <div className="icon">
            <YouTube />
          </div>
          YouTube Live
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

const mapStateToProps = ({ youtubeLive }) => ({
  youtubeLive,
});

export default connect(mapStateToProps, {
  getYoutubeLive,
  startYoutubeLive,
  stopYoutubeLive,
})(Youtube);
