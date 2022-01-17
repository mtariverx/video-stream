import React, { Component } from "react";
import PropsTypes from "prop-types";
// import { DragDropContext } from "react-beautiful-dnd";

import themeColor from "../../constants/themeColor";

import "./style.scss";
/**
 * Data table Component
 * @augments {Component<Props, State>}
 */

export default class DataTable extends Component {
  static propsTypes = {
    headerColor: PropsTypes.string,
    class: PropsTypes.string,
    selected: PropsTypes.number,
    header: PropsTypes.array.isRequired,
    lists: PropsTypes.array.isRequired,
    config: PropsTypes.object,
  };

  makeStyle = () => {
    const { config } = this.props;
    return {
      "--panda-data-table-header-color":
        config.headerColor || themeColor["--primary-color"],
      "--panda-data-table-header-text-color":
        config.headerTextColor || themeColor["--default-font-color"],
    };
  };

  // dragulaDecorator = (componentBackingInstance) => {
  //   if (componentBackingInstance && this.props.dragable) {
  //     let options = {};
  //     var dragula = Dragula([componentBackingInstance], options);
  //     dragula.on("drop", (el, target, source, sibling) => {
  //       let sourceid = el.id;
  //       let targetid = sibling.id;
  //       let sid = sourceid.substring(5);
  //       let tid = targetid.substring(5);
  //       if (sid < tid) {
  //         tid--;
  //         targetid = "times" + tid;
  //       }
  //       this.props.updateContent &&
  //         this.props.updateContent(sourceid, targetid);
  //       // dragula.cancel(true)
  //     });
  //   }
  // };

  renderHeader = () => {
    const { header } = this.props;
    return (
      <tr>
        {header.map((element, key) => (
          <th
            style={{
              textAlign: element.align || "center",
              width: element.width || "auto",
              verticalAlign: "center",
            }}
            key={key}
            className={element.class}
          >
            {element.name}
          </th>
        ))}
      </tr>
    );
  };

  onDragEnd = (result) => {
    console.log(result);
  };

  render() {
    const { children } = this.props;

    return (
      <div className="panda-data-table" style={this.makeStyle()}>
        <table>
          <thead>{this.renderHeader()}</thead>
          {children}
        </table>
      </div>
    );
  }
}
