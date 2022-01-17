import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import LinkItem from "../LinkItem";
import { makeShowTable } from "../../../../action";
import { SvgButton } from "../../../../components";
import { compareArray, getInObject } from "../../../../utils/PandaUtils";

class PadTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValues: [],
    };
  }

  onClick = (keyArray) => {
    const { mainPage, makeShowTable } = this.props;
    makeShowTable(mainPage.padTableLists, keyArray);
  };

  onCheck = (path) => {
    let index = -1;
    let { checkedValues } = this.state;
    let contained = false;
    for (let length = 1; length < path.length; length++) {
      for (let keys of checkedValues) {
        if (compareArray(keys, path.slice(0, length))) contained = true;
      }
    }
    if (!contained) {
      for (let [i, keys] of checkedValues.entries()) {
        if (compareArray(keys, path)) index = i;
      }
    }
    if (index === -1) {
      checkedValues.push(path);
    } else {
      checkedValues = checkedValues.filter(
        (element) => !compareArray(path, element.slice(0, path.length))
      );
    }
    this.setState({
      checkedValues,
    });
  };

  getSelectedItems = () => {
    const { padTableLists } = this.props.mainPage;
    const { checkedValues } = this.state;
    let result = [];
    for (const path of checkedValues) {
      result = result.concat(
        this.getListInObject(getInObject(padTableLists, path))
      );
    }
    return result;
  };

  getListInObject = (object) => {
    let array = object.child;
    let keys = Object.keys(object);
    for (let key of keys) {
      if (key !== "child") {
        array = array.concat(this.getListInObject(object[key]));
      }
    }
    return array;
  };

  render() {
    const { mainPage, modalFunction } = this.props;
    const { checkedValues } = this.state;
    const lists = Object.keys(mainPage.padTableLists).sort();
    return (
      <div className="pad-tab">
        <div className="dflex flex-end">
          <SvgButton
            onClick={() =>
              modalFunction("add-playlist", true, this.getSelectedItems())
            }
            color="white"
            icon="add-playlist"
            disabled={!checkedValues.length}
          />
          <SvgButton
            onClick={() =>
              modalFunction("add-time", true, this.getSelectedItems())
            }
            color="white"
            icon="add-time"
            disabled={!checkedValues.length}
          />
        </div>
        {lists.map((list, key) => (
          <LinkItem
            linkInfo={mainPage.padTableLists[list]}
            key={key}
            keyArray={[]}
            title={list}
            onClick={this.onClick}
            selected={mainPage.showTableKey}
            onCheck={this.onCheck}
            checkedValues={checkedValues}
            checkable
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ mainPage }) => ({
  mainPage,
});

export default withRouter(
  connect(mapStateToProps, {
    makeShowTable,
  })(PadTab)
);
