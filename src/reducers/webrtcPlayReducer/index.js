import {
  SET_WEBRTC_PLAY_WEBSOCKET,
  SET_WEBRTC_PLAY_PEERCONNECTION,
  SET_WEBRTC_PLAY_AUDIO_TRACK,
  SET_WEBRTC_PLAY_VIDEO_TRACK,
  SET_WEBRTC_PLAY_CONNECTED,
} from "../../action/types";

const initialState = {
  websocket: undefined,
  peerConnection: undefined,
  audioTrack: undefined,
  videoTrack: undefined,
  connected: false,
};

const webrtcPlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WEBRTC_PLAY_WEBSOCKET:
      return { ...state, websocket: action.websocket };
    case SET_WEBRTC_PLAY_PEERCONNECTION:
      return { ...state, peerConnection: action.peerConnection };
    case SET_WEBRTC_PLAY_AUDIO_TRACK:
      return { ...state, audioTrack: action.audioTrack };
    case SET_WEBRTC_PLAY_VIDEO_TRACK:
      return { ...state, videoTrack: action.videoTrack };
    case SET_WEBRTC_PLAY_CONNECTED:
      return { ...state, connected: action.connected };
    default:
      return state;
  }
};

export default webrtcPlayReducer;
