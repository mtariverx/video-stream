import axios from "axios";
import { NotificationManager } from "react-notifications";
import config from "../config";
import { configureStore } from "../store";

const store = configureStore().getState();
const requestUserInfo = () => {
  const { user } = store.authUser;
  return {
    userid: user.userID,
    access_token: user.access_token,
  };
};

export const setFacebookStatus = async ({ action, streamKey, channel }) => {
  try {
    if (streamKey) {
      streamKey = streamKey.replace(/\?/g, "~QZ~");
      streamKey = streamKey.replace(/&/g, "~AMP~");
      streamKey = streamKey.replace(/=/g, "~EQ~");
    } else {
      streamKey = "";
    }

    const request = {
      action,
      channel,
      streamKey,
      ...requestUserInfo(),
    };
    const result = await axios
      .post(`${config.apiUrl}/facebooklive`, request, config.apiTimeout)
      .then((response) => {
        return response;
      });
    return result;
  } catch (error) {
    console.log(error);
    NotificationManager.error("Please check your facebook stream key");
    return null;
  }
};

export const setYoutubeStatus = async ({ action, streamKey, channel }) => {
  try {
    const request = {
      action,
      channel,
      streamKey,
      ...requestUserInfo(),
    };
    const result = await axios
      .post(`${config.apiUrl}/youtubelive`, request, config.apiTimeout)
      .then((response) => {
        return response;
      });
    return result;
  } catch (error) {
    console.log(error);
    NotificationManager.error("Please check your youtube stream key");
    return null;
  }
};
