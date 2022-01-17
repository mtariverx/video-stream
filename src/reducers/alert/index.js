import {
  OPEN_ALERT, CLOSE_ALERT
} from '../../action/types';

//initialize dashboard state-
const INIT_STATE = {
  open: false,
  title: '',
  content: '',
  onAction: null
};
//---------------------------

/**********************
 * Auth user reducers *
 **********************/
export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case OPEN_ALERT:
      return { ...state, ...action.payload, open: true };

    case CLOSE_ALERT:
      return { ...state, open: false };

    default: return { ...state };
  }
}
