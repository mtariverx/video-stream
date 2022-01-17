/****************
 * App reducers *
 ****************/
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authUserReducer from "./auth";
import dashboard from "./dashboard";
import mainPage from "./mainPage";
import facebookLive from "./social/facebook";
import youtubeLive from "./social/youtube";
import alert from "./alert";
import overlayStore from "./overlay";
import playSettings from "./playSettingsReducer";
import webrtcPlay from "./webrtcPlayReducer";

//Combine reducers-------------------
const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    authUser: authUserReducer,
    dashboard,
    mainPage,
    alert,
    overlayStore,
    facebookLive,
    youtubeLive,
    playSettings,
    webrtcPlay,
  });
//-----------------------------------

export default reducers;
