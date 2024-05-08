"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    }
  },
  methods: {
    click() {
      let data = { imgUrl: this.imgUrl, title: this.title, phone: this.phone };
      common_vendor.index.setStorageSync("guestName", data);
      common_vendor.index.navigateTo({
        url: "/pages/guest/info"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.imgUrl
  }, $props.imgUrl ? {
    b: $props.imgUrl
  } : {}, {
    c: common_vendor.t($props.title),
    d: common_vendor.o((...args) => $options.click && $options.click(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jason/Documents/大三下/软工实训/uni-app/components/my-list-item.vue"]]);
wx.createComponent(Component);
