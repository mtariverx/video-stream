import axios from "axios";
import qs from "querystring";

import config from "../config";
/**
 * login with email and password
 * @param {*} payload
 */
export const login = async (payload) => {
  const api = `${config.apiUrl}/login`;
  const sendRequest = {
    clientId: config.clientId,
    secret: config.secret,
    ...payload,
  };
  const response = await axios.post(api, qs.stringify(sendRequest));
  return response.data;
};

export const loginWithTokenApi = async (payload) => {
  const api = `${config.apiUrl}/getrefreshtoken/`;
  const response = await axios.post(api, payload).then((response) => {
    // console.log("RefreshToken API Response:", response.data);
    return response.data;
  });
  return response;
};
