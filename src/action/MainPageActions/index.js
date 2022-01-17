import {
  MAIN_PAGE_SHOW_TABLE,
  SET_PROGRAM_TABLE_LISTS,
  SET_PAD_TABLE_LISTS,
  SET_CHANNEL,
  SET_CURRENT_DATE,
  SHOW_TABLE_MAKE,
  LIVE_CONTENT,
  LIVE_STREAM_STATUS,
  CURRENT_ITEM,
  CHANNELS_DATA,
  DEFAULT_CHANNEL_DATA,
} from "../types";

import { loginWithToken } from "../AuthActions";
import { getListsApi, addLiveApi } from "../../api";
import { removePlayList } from "../../api/MainPageApis";

import {
  convertArrayToJson,
  getInObject,
  getNameFromPathName,
} from "../../utils/PandaUtils";
import { openAlert } from "../AlertModal";
// import config from "../../config";

export const getViewChanels = () => async (dispatch, getState) => {
  const state = getState();
  try {
    const requestDefault = {
      action: "viewChannels",
      appName: state.authUser.user.appName,
    };
    await getListsApi(requestDefault).then((response) => {
      // console.log("viewChannels: ", response);
      if (
        response.error === "expired_token" ||
        response.error === "invalid_token"
      ) {
        dispatch(loginWithToken());
      }
      dispatch({
        type: DEFAULT_CHANNEL_DATA,
        payload: response,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const getViewCurrentItem = () => async (dispatch, getState) => {
  const state = getState();
  try {
    const requestData = {
      action: "viewCurrentItem",
      channel:
        state.mainPage.channel === ""
          ? state.mainPage.defaultChannelData.contentStreams[0].name
          : state.mainPage.channel,
    };
    await getListsApi(requestData).then((response) => {
      // console.log("viewCurrentItem: ", response);
      if (response.error === "expired_token") {
        dispatch(loginWithToken());
      }
      dispatch({
        type: CHANNELS_DATA,
        payload: response,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const setMainPageTable = (tableName) => async (dispatch) => {
  dispatch({
    type: MAIN_PAGE_SHOW_TABLE,
    payload: tableName,
  });
  switch (tableName) {
    case "program":
      await dispatch(getProgramTableData());
      break;
    case "pad":
      await dispatch(getPadTableData());
      break;
    case "live":
      await dispatch(loadLiveContent());
      break;
    default:
      break;
  }
};

// const fetPadDataAgain = () =>

// const fetchMainPageTable = (tabName, dispatch) => {
//   setMainPageTable(tabName, dispatch);
// };

export const getProgramTableData = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const requestData = {
      action: "viewPlaylists",
      channel:
        state.mainPage.channel === ""
          ? state.mainPage.defaultChannelData.contentStreams[0].name
          : state.mainPage.channel,
      selected_date: state.mainPage.currentDate,
    };
    await getListsApi(requestData).then((response) => {
      // console.log("viewPlaylists: ", response);
      if (response.error === "expired_token") {
        dispatch(loginWithToken());
      }
      dispatch({
        type: SET_PROGRAM_TABLE_LISTS,
        payload: response.schedulePlaylists,
      });
    });
  } catch (error) {
    dispatch({
      type: SET_PROGRAM_TABLE_LISTS,
      payload: [],
    });
  }
};

export const getPadTableData = () => async (dispatch, getState) => {
  try {
    const state = getState();
    if (state.mainPage.showTableData.length < 1) {
      const requestData = {
        action: "viewContent",
      };
      await getListsApi(requestData).then((response) => {
        if (response.error === "expired_token") {
          dispatch(loginWithToken());
        }
        if (response.hasOwnProperty("contentFiles")) {
          let tableObject = convertArrayToJson(response.contentFiles, "name");
          dispatch({
            type: SET_PAD_TABLE_LISTS,
            payload: tableObject,
          });
          Object.keys(tableObject) &&
            dispatch(makeShowTable(tableObject, [Object.keys(tableObject)[0]]));
        }
        // } else {
        //   fetchMainPageTable("pad", dispatch);
        // }
      });
    } else {
      dispatch({
        type: SET_PAD_TABLE_LISTS,
        payload: state.mainPage.padTableLists,
      });
      Object.keys(state.mainPage.padTableLists) &&
        dispatch(
          makeShowTable(state.mainPage.padTableLists, [
            Object.keys(state.mainPage.padTableLists)[0],
          ])
        );
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_PAD_TABLE_LISTS,
      payload: [],
    });
  }
};

export const loadLiveContent = () => async (dispatch) => {
  try {
    const requestData = {
      action: "viewLiveContent",
    };
    await getListsApi(requestData).then((response) => {
      if (response.error === "expired_token") {
        dispatch(loginWithToken());
      }
      dispatch({
        type: LIVE_CONTENT,
        payload: response.contentStreams,
      });

      if (response.contentStreams && response.contentStreams.length) {
        dispatch(loadLiveStatus(response.contentStreams[0].name));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const loadLiveStatus = (livename) => async (dispatch) => {
  const requestData = {
    action: "status",
    title: livename,
  };
  let result = await getListsApi(requestData);
  if (result.error === "expired_token") {
    dispatch(loginWithToken());
  }
  dispatch({
    type: LIVE_STREAM_STATUS,
    payload: {
      liveStreamStatus: result,
      selectedLive: livename,
    },
  });
};

export const getCurrentItem =
  (current_item_id, item) => async (dispatch, getState) => {
    try {
      const state = getState();
      const requestData = {
        action: "viewCurrentItem",
        channel:
          state.mainPage.channel === ""
            ? state.mainPage.defaultChannelData.contentStreams[0].name
            : state.mainPage.channel,
        current_item_id,
      };
      await getListsApi(requestData).then((response) => {
        if (response.error === "expired_token") {
          dispatch(loginWithToken());
        }
        let previewItem = "";
        if (state.authUser.user.vodFolder !== "") {
          // previewItem = `${config.videoServer}${state.authUser.user.vodFolder}/${item}/playlist.m3u8`;
          previewItem = `${state.authUser.user.vodpreview}${state.authUser.user.vodFolder}/${item}/playlist.m3u8`;
        } else {
          // previewItem = `${config.videoServer}${item}/playlist.m3u8`;
          previewItem = `${state.authUser.user.vodpreview}${item}/playlist.m3u8`;
        }
        dispatch({
          type: CURRENT_ITEM,
          payload: {
            currentItem: response,
            previewItem,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

export const setChannel = (channel) => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: SET_CHANNEL,
    payload: channel,
  });
  dispatch(setMainPageTable(state.mainPage.tableName));
};

export const setCurrentDate = (currentDate) => (dispatch, getState) => {
  // const state = getState();
  dispatch({
    type: SET_CURRENT_DATE,
    payload: currentDate,
  });
  // dispatch(setMainPageTable(state.mainPage.tableName))
};

export const makeShowTable = (tableObject, keys) => (dispatch) => {
  const data = getInObject(tableObject, keys);
  dispatch({
    type: SHOW_TABLE_MAKE,
    payload: { data: data.child, keys },
  });
};

export const addItems =
  (type, startfromm, stopTime, items) => async (dispatch, getState) => {
    try {
      const state = getState();
      const request = {
        action: "addItems",
        type,
        items: items.map((element) => ({
          title: getNameFromPathName(element.name),
          item: element.name,
          startfrom: startfromm,
          duration: items.length > 1 ? parseInt(element.duration) : stopTime,
          vod: true,
        })),
        channel:
          state.mainPage.channel === ""
            ? state.mainPage.defaultChannelData.contentStreams[0].name
            : state.mainPage.channel,
      };
      let result = await getListsApi(request);
      if (result.error === "expired_token") {
        dispatch(loginWithToken());
      }
      if (result.status === "success")
        dispatch(openAlert("Success", "Items successfully added"));
      else dispatch(openAlert("fail", "Failed to add the selected items"));
    } catch (error) {
      dispatch(openAlert("Fail", "Failed to add the selected items"));
    }
  };

export const addPlaylists =
  (items, title, duration, repeatDays, id, shuffle = false, priority = 1) =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      let result;
      for (const day of repeatDays) {
        // let todayDate = getTodayDate();
        // let minus = day - todayDate;
        // let plusDay = Math.floor(minus / 86400000);
        // let startTime = todayDate + plusDay * 86400000;
        let request = {
          action: "addPlaylistexacttime",
          title,
          channel:
            state.mainPage.channel === ""
              ? state.mainPage.defaultChannelData.contentStreams[0].name
              : state.mainPage.channel,
          schedulePlaylist: {
            items: items.map((element) => ({
              title: getNameFromPathName(
                element.name ? element.name : element.item
              ),
              item: element.name ? element.name : element.item,
              startfrom: 0,
              duration: -1,
              vod: true,
            })),
            channel:
              state.mainPage.channel === ""
                ? state.mainPage.defaultChannelData.contentStreams[0].name
                : state.mainPage.channel,
            title: title,
            // startTime: startTime,
            startTime: day,
            stopTime: day + duration,
            shuffle,
            priority,
          },
        };
        result = await getListsApi(request);
        if (result.error === "expired_token") {
          dispatch(loginWithToken());
        }
      }
      if (result.status === "success") {
        if (id > 0) {
          await removePlayList(id, items || []);
          await dispatch(getViewCurrentItem());
          await dispatch(setMainPageTable("program"));
        } else {
          dispatch(
            openAlert("Success", "The program is successfully scheduled")
          );
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(
        openAlert(
          "Fail",
          "Failed to add the program. Please double check the values."
        )
      );
    }
  };

export const addLive =
  (title, startTime, stopTime, duration, items, id) =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      let request;
      if (items.length > 0) {
        request = {
          action: "addLiveStream",
          schedulePlaylist: {
            items: [
              {
                title: title,
                item: items[0].item,
                startfrom: -2,
                duration: duration,
                vod: false,
              },
            ],
            startTime: startTime,
            stopTime: stopTime,
            channel:
              state.mainPage.channel === ""
                ? state.mainPage.defaultChannelData.contentStreams[0].name
                : state.mainPage.channel,
            title: title,
            shuffle: false,
            priority: 100,
          },
        };
      } else {
        request = {
          action: "addLiveStream",
          schedulePlaylist: {
            items: [
              {
                title: title,
                item: state.mainPage.selectedLive,
                startfrom: -2,
                duration: duration,
                vod: false,
              },
            ],
            startTime: startTime,
            stopTime: stopTime,
            channel:
              state.mainPage.channel === ""
                ? state.mainPage.defaultChannelData.contentStreams[0].name
                : state.mainPage.channel,
            title: title,
            shuffle: false,
            priority: 100,
          },
        };
      }
      let result = await addLiveApi(request);
      if (result.error === "expired_token") {
        dispatch(loginWithToken());
      }
      if (result.status === "success") {
        if (items.length > 0) {
          await removePlayList(id, items || []);
          await dispatch(getViewCurrentItem());
          await dispatch(setMainPageTable("program"));
        } else {
          dispatch(
            openAlert(
              "Success",
              "Live Ingest successfully added. Please check it in Programs Tab."
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(openAlert("Fail", "Failed add item"));
    }
  };
