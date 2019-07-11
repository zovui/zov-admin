import Qs from "querystring";
import axios from "axios";
import config from "@config";

const devMode = process.env.NODE_ENV !== "production";

axios.defaults.baseURL = devMode
  ? config.baseUrl.development
  : config.baseUrl.production;

axios.defaults.withCredentials = true;

axios.defaults.crossDomain = true;

axios.defaults.headers.common = {
  Accept: "application/json, text/plain, */*",
  "X-Requested-With": "XMLHttpRequest",
  "Cache-Control": "no-cache"
};

axios.defaults.paramsSerializer = function(params) {
  return Qs.stringify(params);
};

axios.defaults.transformRequest = [
  data => {
    for (let item in data) {
      if (typeof data[item] === "object") {
        data[item] = JSON.stringify(data[item]);
      }
    }
    return Qs.stringify(data);
  }
];

export default axios;
