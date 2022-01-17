import { OPEN_ALERT, CLOSE_ALERT } from "../types"

export const openAlert = (title, content, onAction) => dispatch => {
  dispatch({
    type: OPEN_ALERT,
    payload: {
      title, content, onAction
    }
  })
}
export const closeAlert = () => dispatch => {
  dispatch({
    type: CLOSE_ALERT
  })
}