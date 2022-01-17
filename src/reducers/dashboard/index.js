import {
  OPEN_DASHBOARD,
  DOCK_DASHBOARD
} from '../../action/types';

//initialize dashboard state-
const INIT_STATE = {
  open: true,
  dock: true,
  sidebar_background:'bg-1.jpg'
};
//---------------------------

/**********************
 * Auth user reducers *
 **********************/
export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case OPEN_DASHBOARD:
      return { ...state, open: action.payload };

    case DOCK_DASHBOARD:
      return { ...state, dock: action.payload };

    default: return { ...state };
  }
}
