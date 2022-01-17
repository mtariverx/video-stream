/**************************
 * App Redux Action types *
 **************************/

//Auth action types---------------------------------------
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";
export const SIGNUP_USER = "SIGNUP_USER";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_FAILURE = "SIGNUP_USER_FAILURE";
//---------------------------------------------------------

//Alert action types
export const OPEN_ALERT = "OPEN_ALERT";
export const CLOSE_ALERT = "CLOSE_ALERT";

//Dashboard action types-----------------------
export const OPEN_DASHBOARD = "OPEN_DASHBOARD";
export const DOCK_DASHBOARD = "DOCK_DASHBOARD";
//---------------------------------------------

//Main page action types
export const MAIN_PAGE_SHOW_TABLE = "MAIN_PAGE_SHOW_TABLE";
export const SET_PROGRAM_TABLE_LISTS = "SET_PROGRAM_TABLE_LISTS";
export const SET_PAD_TABLE_LISTS = "SET_PAD_TABLE_LISTS";
export const SET_CHANNEL = "SET_CHANNEL";
export const SET_CURRENT_DATE = "SET_CURRENT_DATE";
export const SHOW_TABLE_MAKE = "SHOW_TABLE_MAKE";
export const LIVE_CONTENT = "LIVE_CONTENT";
export const LIVE_STREAM_STATUS = "LIVE_STREAM_STATUS";
export const CURRENT_ITEM = "CURRENT_ITEM";
export const CHANNELS_DATA = "CHANNELS_DATA";
export const OVERLAYS_ACTIVE = "OVERLAYS_ACTIVE";
export const OVERLAYS_WAITING = "OVERLAYS_WAITING";
export const SET_OVERLAY = "SET_OVERLAY";
export const INIT_OVERLAY = "INIT_OVERLAY";
export const OPEN_EDIT_MODAL = "OPEN_EDIT_MODAL";
export const DEFAULT_CHANNEL_DATA = "DEFAULT_CHANNEL_DATA";

export const STOP_FACEBOOK_LIVE = "STOP_FACEBOOK_LIVE";
export const START_FACEBOOK_LIVE = "START_FACEBOOK_LIVE";
export const GET_FACEBOOK_LIVE = "GET_FACEBOOK_LIVE";
export const STOP_YOUTUBE_LIVE = "STOP_YOUTUBE_LIVE";
export const START_YOUTUBE_LIVE = "START_YOUTUBE_LIVE";
export const GET_YOUTUBE_LIVE = "GET_YOUTUBE_LIVE";

// WebRTC
export const SET_PLAY_SIGNALING_URL = "SET_PLAY_SIGNALING_URL";
export const SET_PLAY_APPLICATION_NAME = "SET_PLAY_APPLICATION_NAME";
export const SET_PLAY_STREAM_NAME = "SET_PLAY_STREAM_NAME";
export const SET_PLAY_FLAGS = "SET_PLAY_FLAGS";
export const SET_WEBRTC_PLAY_WEBSOCKET = "SET_WEBRTC_PLAY_WEBSOCKET";
export const SET_WEBRTC_PLAY_PEERCONNECTION = "SET_WEBRTC_PLAY_PEERCONNECTION";
export const SET_WEBRTC_PLAY_CONNECTED = "SET_WEBRTC_PLAY_CONNECTED";
export const SET_WEBRTC_PLAY_AUDIO_TRACK = "SET_WEBRTC_PLAY_AUDIO_TRACK";
export const SET_WEBRTC_PLAY_VIDEO_TRACK = "SET_WEBRTC_PLAY_VIDEO_TRACK";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const HIDE_ERROR_PANEL = "HIDE_ERROR_PANEL";
