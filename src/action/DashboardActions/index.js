import {
  OPEN_DASHBOARD,
  DOCK_DASHBOARD
} from '../types';

/********************************
 * Setting sliderbar open state *
 ********************************/
export const setDashboardOpen = open => dispatch => {
  dispatch({
    type: OPEN_DASHBOARD,
    payload: open
  });
}


/********************************
 * Setting sliderbar dock state *
 ********************************/
export const setDashboardDock = dock => dispatch => {
  dispatch({
    type: DOCK_DASHBOARD,
    payload: dock
  });
}