import React, { Component } from "react";
import PropsTypes from "prop-types";
import { compareArray } from "../../../../utils/PandaUtils";
import { CheckBox } from "../../../../components";

/**
 * Video Preview Component
 * @augments {Component<Props, State>}
 */
export default class LinkItem extends Component {
  static propsTypes = {
    linkInfo: PropsTypes.object.isRequired,
    selected: PropsTypes.array,
  };

  state = {
    open: false,
  };

  onClick = (keyArray) => {
    this.setState({
      open: !this.state.open,
    });
    this.props.onClick && this.props.onClick(keyArray);
  };
  checked = () => {
    const { keyArray, title, checkedValues } = this.props;
    const newKeyArray = keyArray.concat([title]);
    while (newKeyArray.length) {
      for (let keys of checkedValues) {
        if (compareArray(newKeyArray, keys)) return true;
      }
      newKeyArray.pop();
    }
    return false;
  };

  render() {
    const { open } = this.state;
    const {
      linkInfo,
      selected,
      keyArray,
      title,
      onClick,
      checkable,
      onCheck,
      checkedValues,
    } = this.props;
    const newKeyArray = keyArray.concat([title]);
    const active = compareArray(newKeyArray, selected);
    // const active = false;
    let keys = Object.keys(linkInfo);
    return (
      <div className={`link-item`}>
        <div
          className={`label${active ? " selected" : ""}`}
          onClick={() => this.onClick(newKeyArray)}
        >
          {checkable && (
            <CheckBox
              color={active ? "white" : "primary"}
              onChange={() => onCheck(newKeyArray)}
              checked={this.checked()}
            />
          )}
          <div>{title}</div>

          {keys.length > 1 && (
            <div className="appened-fix">
              <i className={`fa fa-caret-${open ? "down" : "right"}`} />
            </div>
          )}
        </div>
        {keys.length && open && (
          <div className="sub-link-items">
            {keys.map(
              (element, key) =>
                element !== "child" && (
                  <LinkItem
                    title={element}
                    keyArray={newKeyArray}
                    linkInfo={linkInfo[element]}
                    key={key}
                    onClick={onClick}
                    selected={selected}
                    checkable={checkable}
                    onCheck={onCheck}
                    checkedValues={checkedValues}
                  />
                )
            )}
          </div>
        )}
      </div>
    );
  }
}
