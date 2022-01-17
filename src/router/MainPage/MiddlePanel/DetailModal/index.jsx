import React, { Component } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import moment from "moment";

import { DataTable } from "../../../../components";
import DetailItem from "./DetailItem";
import { addPlaylists } from "../../../../action";

import "./style.scss";

const getListStyle = (isDraggingOver) => ({});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
    };
  }

  removeItem = (id) => {
    this.props.removeItem && this.props.removeItem(id);
  };

  onDragEnd = (result) => {
    // console.log(result);
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({ items });
  };

  onDragStart = (result) => {
    // console.log("Start: ", result);
  };

  saveReOrder = async () => {
    let repeatDays = [];
    // let positionDate = moment(new Date()).valueOf();
    repeatDays.push(this.props.startTime);
    let sumDuration = 0;
    for (let item of this.state.items) {
      sumDuration += item.duration;
    }
    await this.props.addPlaylists(
      this.state.items,
      this.props.title,
      sumDuration,
      repeatDays,
      this.props.dropId,
      this.props.shuffle
    );
  };

  render() {
    const { items } = this.state;
    const { channels } = this.props.mainPage;
    let headers = [
      { name: "ID", align: "center" },
      { name: "Path", align: "center" },
      { name: "Duration", align: "center" },
      { name: "Action", align: "center" },
    ];
    if (!this.props.dragDisabled) {
      headers = [
        {
          name: (
            <i
              className="fa fa-save"
              style={{ color: "white" }}
              onClick={this.saveReOrder}
            ></i>
          ),
          align: "center",
        },
      ].concat(headers);
    }
    return (
      <DataTable
        header={headers}
        config={{
          headerColor: "black",
          headerTextColor: "white",
        }}
        dragable
      >
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
        >
          <Droppable droppableId={`${this.props.dropId}`}>
            {(provided, snapshot) => (
              <tbody
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, inDex) => (
                  <DetailItem
                    dragDisabled={this.props.dragDisabled}
                    key={item.id}
                    index={inDex}
                    channels={channels}
                    item={item}
                    onRemove={this.removeItem}
                  />
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </DataTable>
    );
  }
}

const mapStateToProps = ({ mainPage }) => ({
  mainPage,
});

export default connect(mapStateToProps, { addPlaylists })(DetailModal);
