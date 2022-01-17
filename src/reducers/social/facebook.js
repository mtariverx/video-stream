import {
  START_FACEBOOK_LIVE,
  STOP_FACEBOOK_LIVE,
  GET_FACEBOOK_LIVE,
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
    case START_FACEBOOK_LIVE:
      return { ...state, status: action.payload };

    case STOP_FACEBOOK_LIVE:
      return { ...state, status: action.payload };

    case GET_FACEBOOK_LIVE:
      return { ...state, status: action.payload };
    // return { ...state };
    default:
      return { ...state };
  }
};
