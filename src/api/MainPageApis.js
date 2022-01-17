import axios from "axios";
import config from "../config";
import { configureStore } from "../store";
import { NotificationManager } from "react-notifications";
const serverUrl = `${config.apiUrl}/acanstreamer`;
const overlayUrl = `${config.apiUrl}/acanoverlay`;

const store = configureStore().getState();
const requestUserInfo = () => {
  const { user } = store.authUser;
  return {
    userid: user.userID,
    access_token: user.access_token,
  };
};

export const getListsApi = (payload) => {
  const request = {
    ...payload,
    ...requestUserInfo(),
  };
  const response = axios
    .post(serverUrl, request, config.apiTimeout)
    .then((response) => {
      if (response.data.msg) {
        NotificationManager.error(response.data.msg);
        throw response.data.msg;
      } else {
        return response.data;
      }
    });
  return response;
};

export const getOverlayListsApi = (type, channel) => {
  const api = `${overlayUrl}`;
  const request = {
    action:
      type === "active" ? "listallactiveoverlays" : "listallwaitingoverlays",
    instruction: {},
    relativeTo: {
      scheduleStream: channel,
    },
    ...requestUserInfo(),
  };
  const response = axios
    .post(api, request, config.apiTimeout)
    .then((response) => {
      if (response.data.msg) {
        NotificationManager.error(response.data.msg);
        throw response.data.msg;
      } else {
        return response.data;
      }
    });
  return response;
};

export const addLiveApi = async (payload) => {
  const request = {
    ...payload,
    ...requestUserInfo(),
  };
  const response = await axios.post(serverUrl, request, config.apiTimeout);
  if (response.data.msg) {
    NotificationManager.error(response.data.msg);
    throw response.data.msg;
  } else {
    return response.data;
  }
};

export const addOverlayApi = async (payload, channel) => {
  const api = `${overlayUrl}`;
  const request = {
    action: "createoverlay",
    instruction: payload,
    relativeTo: {
      scheduleStream: channel,
    },
    ...requestUserInfo(),
  };
  let response = await axios.post(api, request, config.apiTimeout);
  if (response.data.msg) {
    NotificationManager.error(response.data.msg);
    throw response.data.msg;
  } else {
    return response.data;
  }
};
export const updateOverlayApi = async (payload, channel) => {
  const api = `${overlayUrl}`;
  const request = {
    action: "updateoverlay",
    id: payload.id,
    instruction: payload,
    relativeTo: channel,
    ...requestUserInfo(),
  };
  let response = await axios.post(api, request, config.apiTimeout);
  if (response.data.msg) {
    NotificationManager.error(response.data.msg);
    throw response.data.msg;
  } else {
    return response.data;
  }
};

export const removeOverlayApi = async (id, channel) => {
  const api = `${overlayUrl}`;
  const request = {
    action: "deletesingleoverlay",
    id,
    instruction: {},
    relativeTo: channel,
    ...requestUserInfo(),
  };
  let response = await axios.post(api, request, config.apiTimeout);
  if (response.data.msg) {
    NotificationManager.error(response.data.msg);
    throw response.data.msg;
  } else {
    return response.data;
  }
};

export const uploadImageApi = async (file) => {
  let data = new FormData();
  data.append("files", file, file.name);
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  await axios.post("/api/images", data, config);
};

/**
 *
 * @param {string} id
 * @param {Array} items
 */
export const removePlayList = async (id, items) => {
  const request = {
    action: "removeItems",
    schedulePlaylist: {
      id,
      items: items.map((item) => ({
        id: item.id,
      })),
    },
    ...requestUserInfo(),
  };
  const response = await axios.post(serverUrl, request, config.apiTimeout);
  if (response.data.msg) {
    NotificationManager.error(response.data.msg);
    throw response.data.msg;
  } else {
    return response.data;
  }
};
