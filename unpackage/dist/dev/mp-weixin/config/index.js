"use strict";
const env = "development";
const EnvConfig = {
  development: {
    baseApi: "http://127.0.0.1:8080",
    mockApi: "http://127.0.0.1:4523/m1/4177433-0-default"
  }
  //   test: {
  //     baseApi: '//test.future.com/api',
  //     mockApi: '',
  //   },
  //   pro: {
  //     baseApi: '//future.com/api',
  //     mockApi: '',
  //   },
};
const config = {
  env,
  // mock的总开关,
  mock: true,
  ...EnvConfig[env]
};
exports.config = config;
