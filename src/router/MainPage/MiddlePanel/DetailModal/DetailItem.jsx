import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { RemoveIcon } from "../../../../components";
import ActionButtonSvg from "../ActionButtonSvg";
import { makeTimeDuration } from "../../../../utils/PandaUtils";

const getItemStyle = (isDragging, draggableStyle, vod) => ({
  userSelect: "none",
  background: isDragging && (vod ? "white" : "red"),

  ...draggableStyle,
});

const getTDStyle = (isDragging, draggableStyle, name) => ({
  width: isDragging ? (name === "item" ? "780px" : "70px") : "auto",
  textAlign: "center",
});

class DetailItem extends React.Component {
  removeItem = (id) => {
    this.props.onRemove && this.props.onRemove(id);
  };

  render() {
    const { channels, item, index, dragDisabled } = this.props;

    return (
      <Draggable
        draggableId={`${item.id}`}
        index={index}
        key={item.id}
        isDragDisabled={dragDisabled}
      >
        {(provided, snapshot) => (
          <tr
            key={item.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
              item.vod
            )}
          >
            {!this.props.dragDisabled && <td></td>}
            <td
              className="center"
              style={getTDStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
                "id"
              )}
            >
              {item.id === channels.scheduleItem.id && (
                <i className="fa fa-arrow-right" style={{ color: "green" }}></i>
              )}{" "}
              {item.id}
            </td>
            <td
              className="center"
              style={getTDStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
                "item"
              )}
            >
              <div className="wrap-content">{item.item}</div>
            </td>
            <td
              className="center"
              style={getTDStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
                "duration"
              )}
            >
              {makeTimeDuration(item.duration)}
            </td>
            <td
              className="center"
              style={getTDStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
                "action"
              )}
            >
              <div className="actions">
                <ActionButtonSvg onClick={() => this.removeItem(item)}>
                  <RemoveIcon />
                </ActionButtonSvg>
              </div>
            </td>
          </tr>
        )}
      </Draggable>
    );
  }
}

export default DetailItem;
