"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/index/index.js";
  "./pages/home/home.js";
  "./pages/guest/guest.js";
  "./pages/goods/goods.js";
  "./pages/sign_up/sign_up.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Jason/Documents/大三下/软工实训/uni-app/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.$baseUrl = "http://127.0.0.1:4523/m1/4177433-0-default";
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
