"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      active: 0,
      list1: [{
        title: "填写账号密码"
      }, {
        title: "填写身份信息"
      }, {
        title: "填写门店信息"
      }]
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_steps2 + _easycom_uni_section2)();
}
const _easycom_uni_steps = () => "../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_steps + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      options: $data.list1,
      active: $data.active
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jason/Documents/大三下/软工实训/uni-app/pages/sign_up/sign_up.vue"]]);
wx.createPage(MiniProgramPage);
