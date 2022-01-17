import React, { Component } from "react";

import { FaIconButton } from "../../../../components";

import "./style.scss";

export default class ExpandRow extends Component {
  state = {
    open: false,
  };

  setOpen = (open) => this.setState({ open });

  render() {
    const { open } = this.state;
    const {
      row,
      detail,
      counts,
      list,
      type,
      selected,
      vod,
      arrowAble,
      className,
      onClick,
      expandiconcolor,
    } = this.props;
    const tdCount = row && row.props.children.length;

    let bColor;
    if (type === "Default") {
      bColor = "#FFC107";
    } else {
      const redList =
        list === undefined
          ? []
          : list.items.filter((item) => item.vod === false);
      if (redList.length > 0) bColor = "red";
    }
    return (
      <tbody>
        <tr
          className={className}
          selected={selected}
          onClick={onClick}
          style={{
            backgroundColor: bColor,
          }}
        >
          {counts > 0 ? (
            <td onClick={() => this.setOpen(!open)}>
              <FaIconButton
                icon={`fa-angle-${open ? "down" : "right"}`}
                color={expandiconcolor}
                badge={counts}
                selected={selected}
                vod={vod}
                arrowAble={arrowAble}
              />
            </td>
          ) : (
            <td></td>
          )}
          {row}
        </tr>
        {open && (
          <tr>
            <td></td>
            <td colSpan={tdCount}>{detail}</td>
          </tr>
        )}
      </tbody>
    );
  }
}
