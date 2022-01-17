import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";

import {
  Button,
  InputField,
  Loading,
  DataTable,
  VideoPreview,
  Select,
  SvgButton,
  AddPlayListOutline,
  RemoveIcon,
} from "../../../components";
import ActionButton from "./ActionButton";
import ActionButtonSvg from "./ActionButtonSvg";
import DetailModal from "./DetailModal";
import CheckBox from "../../../components/Checkbox";
import ExpandRow from "./ExpandRow";
import {
  setChannel,
  getCurrentItem,
  setMainPageTable,
  openAlert,
  getViewChanels,
  logout,
} from "../../../action";
import { removePlayList } from "../../../api";
import {
  getSubStringFromFirst,
  makeTimeDuration,
  getNameFromPathName,
  convertByteToMB,
  getTodayDate,
} from "../../../utils/PandaUtils";

class MiddleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      openDetailModal: false,
      detail: {},
      selectAll: false,
      selectedLists: [],
      showDetailItems: [],
      search: "",
      selectID: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.mainPage.tableName !== prevProps.mainPage.tableName) {
      this.setState({
        selectedIndex: 0,
        selectAll: false,
        selectedLists: [],
      });
    }
    if (
      this.props.mainPage.showTableData !== prevProps.mainPage.showTableData
    ) {
      this.setState({
        selectAll: false,
      });
    }
  }

  activeList = (index, item) => {
    this.setState({ selectedIndex: index });
    if (this.props.mainPage.tableName === "pad") {
      this.props.getCurrentItem(index, item.name);
    }
  };

  getPlayList = () => {
    const { tableName, programTableLists, padTableLists } = this.props.mainPage;
    const { selectedIndex } = this.state;
    switch (tableName) {
      case "program":
        return (
          programTableLists &&
          programTableLists[selectedIndex] &&
          this.changeSpace(programTableLists[selectedIndex].item)
        );
      case "pad":
        return (
          padTableLists &&
          padTableLists[selectedIndex] &&
          this.changeSpace(padTableLists[selectedIndex].name)
        );
      default:
        return "";
    }
  };

  changeChannel = (evt) => {
    this.props.setChannel(evt.target.value);
  };

  changeDetailModal = (openDetailModal, detail = {}) => {
    this.setState({ openDetailModal, detail });
  };

  selectAll = (evt) => {
    const { selectedLists } = this.state;

    if (evt.target.checked) {
      this.props.mainPage.showTableData.forEach((item) => {
        if (selectedLists.indexOf(item) === -1) {
          selectedLists.push(item);
        }
      });
      this.setState({
        selectAll: true,
        selectedLists,
      });
    } else {
      this.props.mainPage.showTableData.forEach((item) => {
        let index = selectedLists.indexOf(item);
        if (index !== -1) {
          selectedLists.splice(index, 1);
        }
      });
      this.setState({ selectedLists, selectAll: false });
    }
  };

  selectedList = (item) => (evt) => {
    let { selectedLists } = this.state;
    if (evt.target.checked) {
      selectedLists.push(item);
    } else {
      let index = selectedLists.indexOf(item);
      if (index !== -1) {
        selectedLists.splice(index, 1);
      }
    }
    this.setState({
      selectedLists,
    });
  };

  getSelectedItems = () => {
    let { selectedLists } = this.state;
    // const { showTableData } = this.props.mainPage;
    // return selectAll
    //   ? showTableData
    //   : selectedLists.map((element) => showTableData[element]);
    return selectedLists;
  };

  changeSearch = (evt) => this.setState({ search: evt.target.value });

  removeItem = (item) => async (evt) => {
    this.props.openAlert(
      "ACAS",
      "Are you sure you want to delete?",
      async () => {
        await removePlayList(item.id, item.items || []);
        await this.props.setMainPageTable("program");
      }
    );
  };

  removeSubItem = async (id, items) => {
    this.props.openAlert(
      "ACAS",
      "Are you sure you want to delete?",
      async () => {
        await removePlayList(id, items);
        await this.props.setMainPageTable("program");
      }
    );
  };

  logout = () => {
    this.props.history.push("/login");
    this.props.logout();
  };

  showProgramTable = (
    list,
    index,
    currentDate,
    endDate,
    currentPlaylistId,
    currentPlaylistVod,
    todayMiliSeconds
  ) => {
    if (
      index === 0 ||
      (list.startTime > currentDate &&
        list.startTime < endDate &&
        list.title.toLowerCase().includes(this.state.search.toLowerCase()) &&
        list.items.length > 0)
    ) {
      return (
        <ExpandRow
          list={list}
          key={index}
          type={index === 0 ? "Default" : "Common"}
          selected={list.id === currentPlaylistId}
          arrowAble={
            currentDate === todayMiliSeconds && currentPlaylistId === list.id
          }
          vod={currentPlaylistVod}
          onClick={() => this.activeList(index)}
          expandiconcolor={
            index === this.state.selectedIndex ? "white" : "primary"
          }
          className={index === this.state.selectedIndex ? "active" : ""}
          row={
            <React.Fragment>
              <td className="center">
                <CheckBox
                  color={index === this.state.selectedIndex ? "white" : ""}
                  checked={
                    this.state.selectAll ||
                    this.state.selectedLists.includes(list)
                  }
                  onChange={this.selectedList(list)}
                />
              </td>
              <td className="center desktop">
                {makeTimeDuration(list.startTime)}
              </td>
              <td className="center desktop">
                {makeTimeDuration(list.stopTime)}
              </td>
              <td className="center">
                <div className="wrap-content">{list.title}</div>
              </td>
              <td className="center desktop">
                {makeTimeDuration(list.stopTime - list.startTime)}
              </td>
              <td className="center">
                <div className="actions">
                  <ActionButton
                    icon="cut"
                    onClick={() =>
                      index !== 0
                        ? list.items[0].vod
                          ? this.props.modalFunction(
                              "add-time",
                              true,
                              list.items,
                              list.id
                            )
                          : this.props.modalFunction(
                              "add-live-modal",
                              true,
                              list.items,
                              list.id
                            )
                        : null
                    }
                  />
                  <ActionButtonSvg
                    onClick={index !== 0 ? this.removeItem(list) : null}
                  >
                    <RemoveIcon />
                  </ActionButtonSvg>
                </div>
              </td>
            </React.Fragment>
          }
          detail={
            <React.Fragment>
              <DetailModal
                items={list.items}
                removeItem={(item) => this.removeSubItem(list.id, [item])}
                dropId={list.id}
                title={list.title}
                shuffle={list.shuffle}
                dragDisabled={
                  index === 0 ||
                  list.items.filter((item) => item.vod === false).length > 0
                }
                startTime={list.startTime}
              />
            </React.Fragment>
          }
          counts={list.items && list.items.length}
        />
      );
    }
  };

  render() {
    const { mainPage, modalFunction, authUser } = this.props;
    const {
      loadData,
      currentDate,
      programTableLists,
      channels,
      liveStreamStatus,
      tableName,
      liveContent,
      defaultChannelData,
      showTableData,
      selectedLive,
    } = mainPage;

    const endDate = moment(currentDate).add(1, "days").valueOf();
    const todayMiliSeconds = getTodayDate();

    const { selectedIndex, selectAll, selectedLists, search } = this.state;

    let currentPlaylistId;
    let currentPlaylistVod;
    if (channels.schedulePlaylist) {
      currentPlaylistId = channels.schedulePlaylist.id;
      currentPlaylistVod = channels.scheduleItem.vod;
    }

    const padHeaders = [
      { name: "", width: "50px", align: "center" },
      {
        name: <CheckBox onChange={this.selectAll} checked={selectAll} />,
        width: "50px",
        align: "center",
      },
      { name: "Title", align: "center" },
      { name: "Size", width: "", align: "center", class: "desktop" },
      { name: "Created", align: "center", class: "desktop" },
      { name: "Duration", align: "center", class: "desktop" },
      { name: "Actions", align: "center" },
    ];
    const programsHeaders = [
      { name: "", width: "50px", align: "center" },
      {
        name: <CheckBox onChange={this.selectAll} checked={selectAll} />,
        width: "50px",
        align: "center",
      },
      { name: "Start", width: "100px", align: "center", class: "desktop" },
      { name: "End", width: "100px", align: "center" },
      { name: "Program", width: "", align: "center" },
      { name: "Duration", width: "100px", align: "center", class: "desktop" },
      { name: "Actions", width: "100px", align: "center" },
    ];

    const { livepreview } = authUser.user;
    let livePlayerSource;
    if (defaultChannelData.status === "success") {
      livePlayerSource =
        selectedLive !== ""
          ? `${livepreview}${defaultChannelData.contentStreams[0].appName}/${selectedLive}/playlist.m3u8`
          : `${livepreview}${defaultChannelData.contentStreams[0].appName}/playlist.m3u8`;
    }
    return (
      <React.Fragment>
        {defaultChannelData.status === "success" && (
          <div className="middle-component">
            <div className="header">
              <div className="input-form">
                <Select
                  value={defaultChannelData.contentStreams[0].name}
                  onChange={this.changeChannel}
                >
                  {defaultChannelData.contentStreams &&
                    defaultChannelData.contentStreams.map((element) => (
                      <option value={element.name} key={element.name}>
                        {element.name}
                      </option>
                    ))}
                </Select>
              </div>
              <div className="actions">
                <Button textColor="white" onClick={this.logout}>
                  LogOut
                </Button>
              </div>
            </div>
            <div className="search">
              <InputField
                appened={<i className="fa fa-search text-grey"></i>}
                placeholder="Search"
                value={search}
                onChange={this.changeSearch}
              />
            </div>
            <div className="card-items">
              <div className="card">
                {channels.hasOwnProperty("schedulePlaylist")
                  ? makeTimeDuration(channels.schedulePlaylist.startTime)
                  : "00:00"}
              </div>
              <div className="card">
                {channels.hasOwnProperty("schedulePlaylist")
                  ? makeTimeDuration(channels.schedulePlaylist.stopTime)
                  : "00:00"}
              </div>
              <div className="card subject">
                <div>
                  {channels.hasOwnProperty("schedulePlaylist")
                    ? channels.schedulePlaylist.title
                    : "Default Playlist"}
                </div>
                <div>
                  {channels.hasOwnProperty("scheduleItem")
                    ? `${channels.scheduleItem.title} - ${
                        //   channels.scheduleItem.duration /
                        //   6000 /
                        //   60
                        // ).toFixed(2)}min
                        makeTimeDuration(channels.scheduleItem.duration)
                      }
                      `
                    : "Playlist - 00:00"}
                </div>
              </div>
            </div>
            <div className="datatable">
              <Loading loading={loadData}>
                {tableName === "program" && (
                  <DataTable
                    header={programsHeaders}
                    selected={selectedIndex}
                    config={{
                      headerColor: "black",
                      headerTextColor: "white",
                    }}
                  >
                    {programTableLists.length > 0 &&
                      programTableLists.map((list, index) => {
                        return this.showProgramTable(
                          list,
                          index,
                          currentDate,
                          endDate,
                          currentPlaylistId,
                          currentPlaylistVod,
                          todayMiliSeconds
                        );
                      })}
                  </DataTable>
                )}

                {tableName === "pad" && (
                  <React.Fragment>
                    <div className="dflex flex-end">
                      <SvgButton
                        color="white"
                        disabled={
                          selectAll ? false : selectedLists.length === 0
                        }
                        icon="add-playlist"
                        onClick={() =>
                          modalFunction(
                            "add-playlist",
                            true,
                            this.getSelectedItems()
                          )
                        }
                      ></SvgButton>
                      <SvgButton
                        color="white"
                        disabled={
                          selectAll ? false : selectedLists.length === 0
                        }
                        icon="add-time"
                        onClick={() =>
                          modalFunction(
                            "add-time",
                            true,
                            this.getSelectedItems()
                          )
                        }
                      ></SvgButton>
                    </div>
                    <DataTable
                      header={padHeaders}
                      config={{
                        headerColor: "black",
                        headerTextColor: "white",
                      }}
                    >
                      {showTableData.length ? (
                        showTableData.map(
                          (list, index) =>
                            index < 50 &&
                            getSubStringFromFirst(
                              getNameFromPathName(list.name)
                            )
                              .toLowerCase()
                              .includes(search.toLowerCase()) && (
                              <ExpandRow
                                key={index}
                                onClick={() => this.activeList(index, list)}
                                expandiconcolor={
                                  index === selectedIndex ? "white" : "primary"
                                }
                                className={
                                  index === selectedIndex ? "active" : ""
                                }
                                row={
                                  <React.Fragment>
                                    <td className="center">
                                      <CheckBox
                                        color={
                                          index === selectedIndex ? "white" : ""
                                        }
                                        checked={selectedLists.includes(list)}
                                        onChange={this.selectedList(list)}
                                      />
                                    </td>
                                    <td className="left">
                                      <div className="wrap-content">
                                        <img
                                          src={require("../../../assets/image/box.png")}
                                          alt=""
                                        />
                                        {getSubStringFromFirst(
                                          getNameFromPathName(list.name)
                                        )}
                                      </div>
                                    </td>
                                    <td className="center desktop">{`${convertByteToMB(
                                      list.size
                                    )}MB`}</td>
                                    <td className="center desktop">
                                      {moment(Number(list.modified)).format(
                                        "DD MMMM YYYY"
                                      )}
                                    </td>
                                    <td className=" center desktop">
                                      {makeTimeDuration(list.duration)}
                                    </td>
                                    <td className="center">
                                      <div className="actions">
                                        <ActionButton
                                          icon="pen"
                                          onClick={() =>
                                            modalFunction(
                                              "add-playlist",
                                              true,
                                              [list]
                                            )
                                          }
                                        />
                                        <ActionButton
                                          icon="cut"
                                          onClick={() =>
                                            modalFunction("add-time", true, [
                                              list,
                                            ])
                                          }
                                        />
                                        <ActionButton icon="page" />
                                        <ActionButton icon="upload" />
                                        <ActionButton icon="cross" />
                                      </div>
                                    </td>
                                  </React.Fragment>
                                }
                                detail={
                                  <React.Fragment>
                                    {list.items && (
                                      <DetailModal items={list.items} />
                                    )}
                                  </React.Fragment>
                                }
                                counts={list.items && list.items.length}
                              />
                            )
                        )
                      ) : (
                        <tbody>
                          <tr>
                            <td className="empty-data" colSpan="8">
                              There is no video file in this folder..
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </DataTable>
                  </React.Fragment>
                )}

                {tableName === "live" && (
                  <div className="live-component">
                    <div className="preview">
                      {liveContent.length ? (
                        <VideoPreview source={livePlayerSource} />
                      ) : (
                        <div className="no-preview">
                          There is no live contents.
                        </div>
                      )}
                    </div>
                    <div className="detail">
                      <div className="live-stream">
                        <span>
                          <img
                            src={require("../../../assets/image/asd.png")}
                            alt=""
                          />
                        </span>
                        Live Stream
                      </div>
                      <div className="content">
                        <ul className="live_ul">
                          <li>
                            Status :{" "}
                            <span>{liveStreamStatus.status || ""}</span>
                          </li>
                          <li>
                            Video codec :{" "}
                            <span>{liveStreamStatus.video_codec || ""}</span>
                          </li>
                          <li>
                            Bandwidth(kbps) :{" "}
                            <span>{liveStreamStatus.bandwidth || ""}</span>
                          </li>
                          <li>
                            Publish time(ms) :{" "}
                            <span>{liveStreamStatus.publish_time || ""}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="live_ul">
                          <li>
                            Protocol :{" "}
                            <span>{liveStreamStatus.protocol || ""}</span>
                          </li>
                          <li>
                            Audio codec :{" "}
                            <span>{liveStreamStatus.audio_codec || ""}</span>
                          </li>
                          <li>
                            Resolution :{" "}
                            <span>{liveStreamStatus.resolution || ""}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="actions">
                        <div
                          className={`live-button ${
                            liveContent.length ? "" : "disabled"
                          }`}
                          onClick={() => modalFunction("add-live-modal", true)}
                        >
                          <AddPlayListOutline fill="white" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Loading>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ mainPage, authUser }) => ({
  mainPage,
  authUser,
});

export default withRouter(
  connect(mapStateToProps, {
    setChannel,
    getCurrentItem,
    setMainPageTable,
    openAlert,
    getViewChanels,
    logout,
  })(MiddleComponent)
);
