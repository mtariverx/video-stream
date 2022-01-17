import {
  OVERLAYS_ACTIVE,
  OVERLAYS_WAITING,
  SET_OVERLAY,
  OPEN_EDIT_MODAL,
  INIT_OVERLAY,
} from "../../action/types";

//initialize dashboard state-
const INIT_STATE = {
  openEditModal: false,
  overlayActiveList: [],
  overlayWaitingList: [],
  overlay: {},
};
//---------------------------

/**********************
 * Auth user reducers *
 **********************/
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case OVERLAYS_ACTIVE:
      return { ...state, overlayActiveList: action.payload };

    case OVERLAYS_WAITING:
      return { ...state, overlayWaitingList: action.payload };

    case SET_OVERLAY:
      return { ...state, overlay: action.payload, openEditModal: true };

    case INIT_OVERLAY:
      return { ...state, overlay: action.payload };

    case OPEN_EDIT_MODAL:
      return { ...state, openEditModal: action.payload };

    default:
      return { ...state };
  }
};
