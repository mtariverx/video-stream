/*********************
 * Auth user actions *
 *********************/
import {
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  // SIGNUP_USER,
  // SIGNUP_USER_FAILURE,
  // SIGNUP_USER_SUCCESS,
} from "../types";
import { login, loginWithTokenApi } from "../../api";
import { openAlert } from "../AlertModal";

import { getViewChanels, setMainPageTable, getOverlayLists } from "..";
import config from "../../config";
export const loginWithEmail =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_USER,
      });
      let result = await login({ email, password });
      if (result.msg) {
        dispatch(
          openAlert("Login Fail", "Please check your email and password")
        );
        dispatch({ type: LOGIN_USER_FAILURE });
        return false;
      } else {
        dispatch(getViewChanels());
        dispatch(setMainPageTable("program"));
        dispatch(getOverlayLists("active"));
        dispatch(getOverlayLists("waiting"));
        dispatch({ type: LOGIN_USER_SUCCESS, payload: result });
        return true;
      }
    } catch (error) {
      // console.log(error);
      dispatch({ type: LOGIN_USER_FAILURE });
      return false;
    }
  };

export const loginWithToken = () => async (dispatch, getState) => {
  // console.log("RefreshToken Request");
  try {
    dispatch({
      type: LOGIN_USER,
    });
    let state = getState();
    if (state.authUser.user) {
      let bodyFormData = new FormData();
      bodyFormData.set("clientId", config.clientId);
      bodyFormData.set("secret", config.secret);
      bodyFormData.set("refreshtoken", state.authUser.user.refresh_token);
      await loginWithTokenApi(bodyFormData).then((response) => {
        // console.log("RefreshToken Response: ", response);
        if (response.access_token) {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: {
              ...state.authUser.user,
              ...response,
            },
          });
          window.location.href = "/";
        } else {
          dispatch({ type: LOGIN_USER_FAILURE });
        }
      });
    } else {
      dispatch({ type: LOGIN_USER_FAILURE });
    }
    // let result = await ({ userName: email, password });
    // dispatch({ type: LOGIN_USER_SUCCESS, payload: result })
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAILURE });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};
