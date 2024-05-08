"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      data: {}
    };
  },
  onLoad() {
    let data = common_vendor.index.getStorageSync("guestName");
    this.data = data;
    common_vendor.index.removeStorageSync("guestName");
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.data.imgUrl,
    b: common_vendor.t($data.data.title),
    c: common_vendor.t($data.data.phone),
    d: common_vendor.p({
      type: "right",
      size: "22",
      color: "#969696"
    }),
    e: common_vendor.p({
      type: "right",
      size: "22",
      color: "#969696"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jason/Documents/大三下/软工实训/uni-app/pages/guest/info.vue"]]);
wx.createPage(MiniProgramPage);
