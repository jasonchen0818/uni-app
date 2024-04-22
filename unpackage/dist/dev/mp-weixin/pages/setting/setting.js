"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      avatar: ""
    };
  },
  methods: {
    getAvatar() {
      common_vendor.index.request({
        url: this.$baseUrl + "/users/getImage",
        method: "GET",
        data: null,
        success: (res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.avatar = res.data.data.avatar;
          }
        }
      });
    }
  },
  mounted() {
    this.getAvatar();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.avatar
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jason/Documents/大三下/软工实训/uni-app/pages/setting/setting.vue"]]);
wx.createPage(MiniProgramPage);
