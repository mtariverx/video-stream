import React, { Component } from "react";
import { connect } from "react-redux";
import { Slider } from "@material-ui/core";

import { Radio, InputField, Select } from "../../../../../components";
import { editOverlay } from "../../../../../action";

import "./style.scss";

class PositionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.overlayStore.overlay.position.x || 0.05,
      y: props.overlayStore.overlay.position.y || 0.05,
      z: props.overlayStore.overlay.position.z || 1,
      h_unit: "pixel",
      v_unit: "pixel",
      anchor: props.overlayStore.overlay.position.anchor || "top-left",
      preset_position: "Select One",
    };
  }

  // componentDidMount() {
  //   if (this.props.overlayStore.overlay.position) {
  //     const { x, y, z, anchor } = this.props.overlayStore.overlay.position;
  //     this.setState({ x, y, z, anchor });
  //   }
  // }

  changeType = (field, value) => {
    if (field === "h_unit") this.setState({ x: value }, this.onChange);
    else this.setState({ y: value }, this.onChange);
  };

  changeValue = (field) => (evt) => {
    this.setState({ [field]: evt.target.value }, this.onChange);
  };

  changePercent = (type) => (_, value) => {
    this.setState({ [type]: value }, this.onChange);
  };

  onPresetPosition = (overlay_type) => (event) => {
    if (overlay_type === "image") {
      switch (event.target.value) {
        case "logo-top-left":
          this.setState(
            {
              x: 0.05,
              y: 0.05,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
        case "logo-top-right":
          this.setState(
            {
              x: 0.8,
              y: 0.05,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
        case "logo-bottom-left":
          this.setState(
            {
              x: 0.05,
              y: 0.8,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
        case "logo-bottom-right":
          this.setState(
            {
              x: 0.8,
              y: 0.8,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break; 
		case "title-background":
          this.setState(
            {
              x: 0.8,
              y: 0.01,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
		case "watermark":
          this.setState(
            {
              x: 0.5,
              y: 0.5,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
        default:
          console.log(event.target.value);
      }
    }

    if (overlay_type === "default") {
      switch (event.target.value) {
        case "top-left":
          this.setState(
            {
              x: 0.05,
              y: 0.05,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
        case "top-right":
          this.setState(
            {
              x: 0.8,
              y: 0.05,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
        case "top-center":
          this.setState(
            {
              x: 0.5,
              y: 0.05,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;

        case "bottom-left":
          this.setState(
            {
              x: 0.05,
              y: 0.8,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
        case "bottom-right":
          this.setState(
            {
              x: 0.8,
              y: 0.8,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
		 case "titling":
          this.setState(
            {
              x: 0.8,
              y: 0.03,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
		 case "newsbar-1":
          this.setState(
            {
              x: 0.05,
              y: 0.9,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
		 case "newsbar-2":
          this.setState(
            {
              x: 0.05,
              y: 0.85,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
		 case "watermark":
          this.setState(
            {
              x: 0.5,
              y: 0.5,
              preset_position: event.target.value,
            },
            this.onChange
          );
          break;
        default:
          console.log(event.target.value);
      }
    }
  };

  onChange = () => {
    const { x, y, z, anchor } = this.state;
    this.props.editOverlay({
      ...this.props.overlayStore.overlay,
      position: { x, y, z, anchor },
    });
  };

  render() {
    let { x, y, z, anchor, preset_position } = this.state;
    const valuetext = (value) => `${value}px`;
    return (
      <div className="position-component">
        <div className="title">
          Set position relative from the top left center of the video.
        </div>
        <div style={{ display: "flex", fontSize: "1.2rem", fontWeight: 600 }}>
          Presets
        </div>
        {this.props.overlayStore.overlay.image ? (
          <Select
            width="200px"
            onChange={this.onPresetPosition("image")}
            value={preset_position}
          >
            <option value="select-one">Select One</option>
            <option value="logo-top-left">Logo Top Left</option>
            <option value="logo-top-right">Logo Top Right</option>
            <option value="top-center">Top Center</option>
            <option value="logo-bottom-left">Logo Bottom Left</option>
            <option value="logo-bottom-right">Logo Bottom Right</option>
            <option value="title-background">Title Background</option>
            <option value="watermark">Watermark</option>
          </Select>
        ) : (
          <Select
            width="200px"
            onChange={this.onPresetPosition("default")}
            value={preset_position}
          >
            <option value="select-one">Select One</option>
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
            <option value="top-center">Top Center</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="titling">Titling</option>
            <option value="newsbar-1">News Bar 1</option>
            <option value="newsbar-2">News Bar 2</option>
            <option value="watermark">Watermark</option>
          </Select>
        )}
        <div className="edit-panel">
          <div className="items">
            <div className="sub-title">Horizontal</div>
            <Radio
              checked={x >= 1}
              onChange={() => this.changeType("h_unit", 10)}
            >
              In Pixels
            </Radio>
            <Radio
              checked={x < 1}
              onChange={() => this.changeType("h_unit", 0.1)}
            >
              Percentage
            </Radio>
            {x > 1 && (
              <InputField
                width="150px"
                type="number"
                label="Pixels"
                value={x}
                onChange={this.changeValue("x")}
              />
            )}
            <Slider
              min={0}
              max={1}
              step={0.01}
              valueLabelDisplay="on"
              value={x}
              className="m-t-50"
              onChange={this.changePercent("x")}
            />
          </div>
          <div className="items">
            <div className="sub-title">Vertical</div>
            <Radio
              checked={y >= 1}
              onChange={() => this.changeType("v_unit", 10)}
            >
              In Pixels
            </Radio>
            <Radio
              checked={y < 1}
              onChange={() => this.changeType("v_unit", 0.1)}
            >
              Percentage
            </Radio>
            {y > 1 && (
              <InputField
                width="150px"
                type="number"
                label="Pixels"
                value={y}
                onChange={this.changeValue("y")}
              />
            )}
            <Slider
              min={0}
              max={1}
              step={0.01}
              valueLabelDisplay="on"
              getAriaValueText={valuetext}
              value={y}
              className="m-t-50"
              onChange={this.changePercent("y")}
            />
          </div>
        </div>
        <div className="edit-panel">
          <div className="items">
            <div className="sub-title">Anchor</div>
            <Select
              width="150px"
              value={anchor}
              onChange={this.changeValue("anchor")}
            >
              <option value="top-left">top-left</option>
              <option value="top-right">top-right</option>
              <option value="top-center">top-center</option>
              <option value="bottom-left">bottom-left</option>
              <option value="bottom-right">bottom-right</option>
              <option value="bottom-center">bottom-center</option>
              <option value="center=center">center=center</option>
            </Select>
          </div>
          <div className="items">
            <div className="sub-title">Z-Index</div>
            <InputField
              width="150px"
              type="number"
              label="z-index"
              value={z.toString()}
              onChange={this.changeValue("z")}
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
})(PositionComponent);
