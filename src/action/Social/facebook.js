import {
  START_FACEBOOK_LIVE,
  STOP_FACEBOOK_LIVE,
  GET_FACEBOOK_LIVE,
} from "../types";

import { setFacebookStatus } from "../../api";

export const getFacebookLive = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const requestData = {
      action: "status",
      streamKey: "",
      channel:
        state.mainPage.channel === ""
          ? state.mainPage.defaultChannelData.contentStreams[0].name
          : state.mainPage.channel,
    };
    let result = await setFacebookStatus(requestData);
    // console.log("Result Get Facebook:", result);

    dispatch({
      type: GET_FACEBOOK_LIVE,
      payload: result.data.success === "true",
    });
  } catch (error) {
    dispatch({
      type: GET_FACEBOOK_LIVE,
      payload: false,
    });
  }
};

export const startFacebookLive = (streamKey) => async (dispatch, getState) => {
  try {
    const state = getState();
    const requestData = {
      action: "start",
      channel:
        state.mainPage.channel === ""
          ? state.mainPage.defaultChannelData.contentStreams[0].name
          : state.mainPage.channel,
      streamKey: streamKey,
    };
    let result = await setFacebookStatus(requestData);
    // console.log("Result Start Facebook:", result);
    dispatch({
      type: START_FACEBOOK_LIVE,
      payload: result.data.success,
    });
  } catch (error) {
    dispatch({
      type: START_FACEBOOK_LIVE,
      payload: false,
    });
  }
};

export const stopFacebookLive = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const requestData = {
      action: "stop",
      channel:
        state.mainPage.channel === ""
          ? state.mainPage.defaultChannelData.contentStreams[0].name
          : state.mainPage.channel,
      streamKey: "",
    };

    let result = await setFacebookStatus(requestData);
    // console.log("Result Stop Facebook:", result);
    dispatch({
      type: STOP_FACEBOOK_LIVE,
      payload: !result.data.success,
    });
  } catch (error) {
    dispatch({
      type: STOP_FACEBOOK_LIVE,
      payload: false,
    });
  }
};
