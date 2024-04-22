"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      avatar: common_vendor.index.getStorageSync("avatar"),
      infoFormData: {
        name: "",
        account: "",
        storeName: "",
        roleId: null,
        phoneNumber: "",
        status: null
      }
    };
  },
  methods: {
    //这里使用的就是二次封装，不用自己找存在本地的token再写到header了
    //网络请求失败的判断写好了，但是如果后端给的code不是200，就自己在下面加弹出错误提示的逻辑
    //例：如果账号不存在的code是4001，就在下面判断code是4001后，上面加弹窗，然后打开弹窗
    //因为之后展示商品会同时获取大量图片，所以我写了一个第一次获取图片后缓存到本地的操作
    //第二次进入页面就不会再调用接口导致要等待图片加载了
    getAvatar() {
      if (this.avatar == null || this.avatar == "") {
        this.$request("/users/getImage", null, "GET").then((res) => {
          console.log("获取头像成功", res);
          this.avatar = res.avatar;
          common_vendor.index.setStorageSync("avatar", res.avatar);
        });
      }
    },
    getInfo() {
      this.$request("/users/getInfo", null, "GET").then((res) => {
        console.log(res);
        this.infoFormData = res;
        console.log(this.infoFormData);
      });
    }
  },
  mounted() {
    this.getAvatar();
    this.getInfo();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.avatar,
    b: common_vendor.t($data.infoFormData.account)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jason/Documents/大三下/软工实训/uni-app/pages/setting/setting.vue"]]);
wx.createPage(MiniProgramPage);
