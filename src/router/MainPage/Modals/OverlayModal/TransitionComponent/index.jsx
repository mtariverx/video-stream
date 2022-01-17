import React, { Component } from "react";
import { connect } from "react-redux";
import { InputField, Select } from "../../../../../components";
import { editOverlay } from "../../../../../action";

import "./style.scss";

class TrasitionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionIn: {
        type: "fade",
        duration: 2,
        speed: 2,
        delay: 2,
      },
      transitionOut: {
        type: "fade",
        duration: 2,
        speed: 2,
        delay: 2,
      },
    };
  }

  UNSAFE_componentWillMount() {
    const { transitionIn, transitionOut } = this.props.overlayStore.overlay;
    this.setState({
      transitionIn: transitionIn || this.state.transitionIn,
      transitionOut: transitionOut || this.state.transitionOut,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      transitionIn: nextProps.overlayStore.overlay.transitionIn,
      transitionOut: nextProps.overlayStore.overlay.transitionOut,
    });
  }

  changeTransitionIn = (field) => (evt) => {
    const { transitionIn } = this.state;
    transitionIn[field] = evt.target.value;
    this.setState({ transitionIn }, this.onChange);
  };

  changeTransitionOut = (field) => (evt) => {
    const { transitionOut } = this.state;
    transitionOut[field] = evt.target.value;
    this.setState({ transitionOut }, this.onChange);
  };

  onChange = () => {
    this.props.editOverlay({
      ...this.props.overlayStore.overlay,
      ...this.state,
    });
  };
  render() {
    let { transitionIn, transitionOut } = this.state;
    const { overlayStore } = this.props;
    // transitionIn = this.props.overlayStore.overlay.transitionIn || transitionIn;
    // transitionOut = this.props.overlayStore.overlay.transitionOut || transitionOut;
    return (
      <div className="trasition-component">
        <div className="edit-panel">
          <div className="items">
            <div className="sub-title">Trasition In</div>
            <Select
              disabled={
                overlayStore.overlay.type === "news-bar" ||
                transitionIn.type === "ticker-rtl"
              }
              width="150px"
              label="Type"
              value={
                overlayStore.overlay.type === "news-bar"
                  ? "tricker"
                  : transitionIn.type
              }
              onChange={this.changeTransitionIn("type")}
            >
              <option value="fade">fade</option>
              <option value="none">none</option>
            </Select>
            <InputField
              width="150px"
              type="number"
              label="Speed"
              value={transitionIn.speed.toString()}
              onChange={this.changeTransitionIn("speed")}
            />
          </div>
          <div className="items">
            <div className="sub-title">Trasition Out</div>
            <Select
              disabled={
                overlayStore.overlay.type === "news-bar" ||
                transitionOut.type === "ticker"
              }
              width="150px"
              label="Type"
              value={
                overlayStore.overlay.type === "news-bar"
                  ? "tricker"
                  : transitionOut.type
              }
              onChange={this.changeTransitionOut("type")}
            >
              <option value="fade">fade</option>
              <option value="none">none</option>
            </Select>
            <InputField
              width="150px"
              type="number"
              label="Speed"
              value={transitionOut.speed.toString()}
              onChange={this.changeTransitionOut("speed")}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ overlayStore }) => ({
  overlayStore,
});

export default connect(mapStateToProps, {
  editOverlay,
})(TrasitionComponent);
