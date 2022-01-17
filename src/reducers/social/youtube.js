import {
  START_YOUTUBE_LIVE,
  STOP_YOUTUBE_LIVE,
  GET_YOUTUBE_LIVE,
} from "../../action/types";

//initialize dashboard state-
const INIT_STATE = {
  status: false,
};
//---------------------------

/**********************
 * Auth user reducers *
 **********************/
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case START_YOUTUBE_LIVE:
      return { ...state, status: action.payload };

    case STOP_YOUTUBE_LIVE:
      return { ...state, status: action.payload };

    case GET_YOUTUBE_LIVE:
      return { ...state, status: action.payload };
    // return { ...state };
    default:
      return { ...state };
  }
};
