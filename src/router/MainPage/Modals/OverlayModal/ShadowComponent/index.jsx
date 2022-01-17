import React, { Component } from "react";
import { connect } from "react-redux";
import { CheckBox, InputField } from "../../../../../components";
import { Slider } from "@material-ui/core";
import { editOverlay } from "../../../../../action";

import "./style.scss";

class ShadowComponent extends Component {
  state = {
    dropdown: true,
    shadow: {
      offsetX: 0,
      offsetY: 0,
      opacity: 0.7,
      radius: 0,
    },
  };

  UNSAFE_componentWillMount() {
    const { shadow } = this.props.overlayStore.overlay;
    if (shadow) {
      this.setState({ shadow });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { shadow } = nextProps.overlayStore.overlay;
    if (shadow) {
      this.setState({ shadow });
    }
  }

  changeShadow = (field) => (evt) => {
    this.setState(
      { shadow: { ...this.state.shadow, [field]: evt.target.value } },
      this.onChange
    );
  };
  changeOpacity = (_, value) => {
    this.setState(
      { shadow: { ...this.state.shadow, opacity: value } },
      this.onChange
    );
  };
  changeDropdown = () => {
    this.setState({ dropdown: !this.state.dropdown }, this.onChange);
  };
  onChange = () => {
    const { shadow } = this.state;
    this.props.editOverlay({
      ...this.props.overlayStore.overlay,
      shadow,
    });
  };
  render() {
    const { shadow } = this.state;
    const { offsetX, offsetY, opacity, radius } = shadow;
    return (
      <div className="showdow-component">
        <div className="title">Shadow</div>
        <CheckBox checked={this.state.dropdown} onChange={this.changeDropdown}>
          Drop Shadow
        </CheckBox>
        {this.state.dropdown && (
          <div>
            <div>
              <InputField
                label="OffsetX"
                type="number"
                value={offsetX.toString()}
                onChange={this.changeShadow("offsetX")}
              />
              <InputField
                label="OffsetY"
                type="number"
                value={offsetY.toString()}
                onChange={this.changeShadow("offsetY")}
              />
            </div>
            <div>
              <InputField
                label="Radius"
                type="number"
                value={radius.toString()}
                onChange={this.changeShadow("radius")}
              />
            </div>
          </div>
        )}
        <div className="title">Opacity</div>
        <Slider
          min={0}
          max={1}
          step={0.1}
          valueLabelDisplay="on"
          value={opacity}
          className="m-t-50"
          onChange={this.changeOpacity}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ overlayStore }) => ({
  overlayStore,
});

export default connect(mapStateToProps, {
  editOverlay,
})(ShadowComponent);
