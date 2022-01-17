import {
  getOverlayListsApi,
  addOverlayApi,
  removeOverlayApi,
  updateOverlayApi,
} from "../../api/MainPageApis";
import {
  OVERLAYS_ACTIVE,
  OVERLAYS_WAITING,
  SET_OVERLAY,
  INIT_OVERLAY,
  OPEN_EDIT_MODAL,
} from "../types";

export const getOverlayLists = (type) => async (dispatch, getState) => {
  try {
    const state = getState();
    let channel =
      state.mainPage.channel === ""
        ? state.mainPage.defaultChannelData.contentStreams[0].name
        : state.mainPage.channel;
    await getOverlayListsApi(type, channel).then((response) => {
      if (type === "active") {
        dispatch({
          type: OVERLAYS_ACTIVE,
          payload: response,
        });
      } else {
        dispatch({
          type: OVERLAYS_WAITING,
          payload: response,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const addOverlay = (payload) => async (dispatch, getState) => {
  try {
    const state = getState();
    let channel =
      state.mainPage.channel === ""
        ? state.mainPage.defaultChannelData.contentStreams[0].name
        : state.mainPage.channel;
    await addOverlayApi(payload, channel);
    await dispatch(
      initOverlay({
        start: "now+0",
        end: "now+150",
        position: {
          x: 0.1,
          y: 0.1,
          z: 2,
        },
        style: {
          font: "Verdana",
          size: 30,
          style: "bold",
          color: "#000000",
        },
        transitionIn: {
          type: "fade",
          speed: 1,
        },
        type: "overlay",
        text: "Please enter your text here",
      })
    );
    await dispatch(getOverlayLists("active"));
    await dispatch(getOverlayLists("waiting"));
  } catch (error) {
    console.log(error);
  }
};

export const updateOverlay = (payload) => async (dispatch, getState) => {
  try {
    const state = getState();
    let channel =
      state.mainPage.channel === ""
        ? state.mainPage.defaultChannelData.contentStreams[0].name
        : state.mainPage.channel;
    await updateOverlayApi(payload, channel);
    await dispatch(getOverlayLists("active"));
    await dispatch(getOverlayLists("waiting"));
  } catch (error) {
    console.log(error);
  }
};

export const removeOverlay = (payload) => async (dispatch, getState) => {
  try {
    const state = getState();
    let channel =
      state.mainPage.channel === ""
        ? state.mainPage.defaultChannelData.contentStreams[0].name
        : state.mainPage.channel;
    await removeOverlayApi(payload, channel);
    await dispatch(getOverlayLists("active"));
    await dispatch(getOverlayLists("waiting"));
  } catch (error) {
    console.log(error);
  }
};

export const editOverlay = (payload) => (dispatch) => {
  dispatch({
    type: SET_OVERLAY,
    payload,
  });
};

export const initOverlay = (payload) => (dispatch) => {
  dispatch({
    type: INIT_OVERLAY,
    payload,
  });
};

export const openEditModal = (payload) => (dispatch) => {
  dispatch({
    type: OPEN_EDIT_MODAL,
    payload,
  });
};
