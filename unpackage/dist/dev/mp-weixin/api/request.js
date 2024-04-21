"use strict";
const common_vendor = require("../common/vendor.js");
const config_index = require("../config/index.js");
const NETWORK_ERROR = "网络请求异常,请稍后重试.....";
const service = common_vendor.axios.create({
  baseURL: config_index.config.baseApi
});
service.interceptors.request.use((req) => {
  return req;
});
service.interceptors.response.use((res) => {
  const { code, data, message } = res.data;
  if (code == 200) {
    return data;
  } else {
    return Promise.reject(message || NETWORK_ERROR);
  }
});
