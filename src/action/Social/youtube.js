import {
  START_YOUTUBE_LIVE,
  STOP_YOUTUBE_LIVE,
  GET_YOUTUBE_LIVE,
} from "../types";

import { setYoutubeStatus } from "../../api";

export const getYoutubeLive = () => async (dispatch, getState) => {
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
    let result = await setYoutubeStatus(requestData);
    // console.log("Result Get Youtube:", result);
    dispatch({
      type: GET_YOUTUBE_LIVE,
      payload: result.data.success === "true",
    });
  } catch (error) {
    dispatch({
      type: GET_YOUTUBE_LIVE,
      payload: false,
    });
  }
};

export const startYoutubeLive = (streamKey) => async (dispatch, getState) => {
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
    let result = await setYoutubeStatus(requestData);
    // console.log("Result Start Youtube:", result);
    dispatch({
      type: START_YOUTUBE_LIVE,
      payload: result.data.success,
    });
  } catch (error) {
    dispatch({
      type: START_YOUTUBE_LIVE,
      payload: false,
    });
  }
};

export const stopYoutubeLive = () => async (dispatch, getState) => {
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

    let result = await setYoutubeStatus(requestData);
    // console.log("Result Stop Youtube:", result);
    dispatch({
      type: STOP_YOUTUBE_LIVE,
      payload: !result.data.success,
    });
  } catch (error) {
    dispatch({
      type: STOP_YOUTUBE_LIVE,
      payload: false,
    });
  }
};
