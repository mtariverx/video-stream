import {
  SET_PLAY_FLAGS,
  SET_PLAY_SIGNALING_URL,
  SET_PLAY_APPLICATION_NAME,
  SET_PLAY_STREAM_NAME,
} from "../types";

export const startPlay = () => {
  return {
    type: SET_PLAY_FLAGS,
    playStart: true,
  };
};

export const stopPlay = () => {
  return {
    type: SET_PLAY_FLAGS,
    playStop: true,
  };
};

export const setPlaySignalingURL = (url) => {
  return {
    type: SET_PLAY_SIGNALING_URL,
    signalingURL: url,
  };
};

export const setPlayApplicationName = (app_name) => {
  return {
    type: SET_PLAY_APPLICATION_NAME,
    applicationName: app_name,
  };
};

export const setPlayStreamName = (stream_name) => {
  return {
    type: SET_PLAY_STREAM_NAME,
    streamName: stream_name,
  };
};
