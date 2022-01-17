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
} from "../../action/types";

import { getTodayDate } from "../../utils";

//initialize dashboard state-
const INIT_STATE = {
  tableName: "program",
  loadData: false,
  channel: "",
  defaultChannelData: {},
  currentDate: getTodayDate(),
  programTableLists: [],
  padTableLists: [],
  showTableData: [],
  showTableKey: [],
  liveContent: [],
  selectedLive: "",
  liveStreamStatus: {},
  currentItem: {},
  previewItem: "",
  channels: [],
};
//---------------------------

/**********************
 * Auth user reducers *
 **********************/
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case MAIN_PAGE_SHOW_TABLE:
      return { ...state, loadData: true, tableName: action.payload };

    case SET_PROGRAM_TABLE_LISTS:
      return { ...state, programTableLists: action.payload, loadData: false };

    case SET_PAD_TABLE_LISTS:
      return { ...state, padTableLists: action.payload, loadData: false };

    case SET_CHANNEL:
      return { ...state, channel: action.payload };

    case SET_CURRENT_DATE:
      return { ...state, currentDate: action.payload };

    case SHOW_TABLE_MAKE:
      return {
        ...state,
        showTableData: action.payload.data,
        showTableKey: action.payload.keys,
      };

    case LIVE_CONTENT:
      return { ...state, liveContent: action.payload, loadData: false };

    case LIVE_STREAM_STATUS:
      return {
        ...state,
        liveStreamStatus: action.payload.liveStreamStatus,
        loadData: false,
        selectedLive: action.payload.selectedLive,
      };

    case CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload.currentItem,
        previewItem: action.payload.previewItem,
        loadData: false,
      };

    case CHANNELS_DATA:
      // return { ...state, channels: action.payload, channel: action.payload.length ? action.payload[0].name : '' };
      return { ...state, channels: action.payload };
    case DEFAULT_CHANNEL_DATA:
      return { ...state, defaultChannelData: action.payload };
    default:
      return { ...state };
  }
};
