"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://127.0.0.1:4523/m1/4177433-0-default";
const header = {
  Authorization: "Bearer " + common_vendor.index.getStorageSync("token")
};
const request = (url = "", data = {}, method = "GET") => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + url,
      header,
      data,
      method,
      success: (res) => {
        if (res.data.code == 200) {
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
exports.request = request;
