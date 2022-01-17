import React, { Component } from "react";
import PropTypes from "prop-types";

import themeColor from "../../constants/themeColor";

import "./style.scss";
import { CustomScrollContainer } from "../../container";
/**
 * adding button widget
 * @augments {Component<Props, State>}
 */
class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      value: "",
      label: "",
      items: "",
      width: "100%",
    };
  }
  static propTypes = {
    value: PropTypes.any,
    label: PropTypes.string,
    color: PropTypes.string,
    textColor: PropTypes.string,
    items: PropTypes.array,
    onChange: PropTypes.func,
    upDirection: PropTypes.bool,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      value,
      label,
      items,
      onChange,
      width,
      color,
      textColor,
      upDirection,
    } = nextProps;
    if (onChange) {
      return { value, label, items, width, color, textColor, upDirection };
    } else {
      return { label, items, width, color, textColor, upDirection };
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  UNSAFE_componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };
  showMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showMenu: false });
    }
  };
  onChange = (value) => {
    this.setState({ value, showMenu: false }, () => {
      this.props.onChange && this.props.onChange(value);
    });
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.refs.selected) {
      const node = this.refs.selected;
      node.parentElement.scrollTop = node.offsetTop;
    }
  }

  makeStyle = () => {
    const { color, textColor, align, fullWidth, width } = this.props;
    let result = {
      "--panda-select-border-color": color || themeColor["--primary-color"],
      "--panda-select-text-color":
        textColor || themeColor["--default-font-color"],
      "--panda-select-width": fullWidth ? "100%" : width || "100%",
      "--panda-select-align": align || "left",
    };
    return result;
  };
  render() {
    const { value, items, label, upDirection, width } = this.state;
    const { showLabel } = this.props;
    const { showMenu } = this.state;
    const selectedItem = Array.isArray(items)
      ? items.find((item) => item.value === value || item === value) || ""
      : "";
    const selectedItemIndex = Array.isArray(items)
      ? items.findIndex((item) => item.value === value || item === value) || ""
      : "";
    return (
      <div
        className="panda-select-component"
        ref={this.setWrapperRef}
        style={this.makeStyle()}
      >
        {label ? <p>{label}</p> : null}
        <div className="label" onClick={this.showMenu}>
          <div className="panda-custom-select">
            {showLabel
              ? showLabel(selectedItem)
              : selectedItem.label || selectedItem}
          </div>
          <div className="icon">
            <i className="fa fa-caret-down"></i>
          </div>
        </div>
        <div
          className={`items${showMenu ? " active" : ""}${
            upDirection ? " up" : ""
          }`}
          style={{
            height: items.length > 5 ? "200px" : `${items.length * 34}px`,
            width: width,
          }}
        >
          <CustomScrollContainer>
            {Array.isArray(items) &&
              items.map((item, index) => (
                <div
                  className={`item${
                    item.value === value || item === value ? " selected" : ""
                  }`}
                  key={`${item.value}-${index}`}
                  ref={selectedItemIndex === index ? "selected" : ""}
                  onClick={() =>
                    this.onChange(item.value === 0 ? 0 : item.value || item)
                  }
                >
                  {item.label || item}
                </div>
              ))}
          </CustomScrollContainer>
        </div>
      </div>
    );
  }
}

export default CustomSelect;
