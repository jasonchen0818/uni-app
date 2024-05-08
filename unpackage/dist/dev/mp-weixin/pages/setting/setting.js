"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      avatar: common_vendor.index.getStorageSync("avatar"),
      infoFormData: {
        userName: "",
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
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  (_easycom_uni_icons2 + _easycom_uni_col2 + _easycom_uni_row2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_col + _easycom_uni_row)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.avatar,
    b: common_vendor.t($data.infoFormData.userName),
    c: common_vendor.p({
      type: "person",
      size: "20",
      color: "#c7c9ce"
    }),
    d: common_vendor.p({
      span: 12
    }),
    e: $data.infoFormData.roleId == 1
  }, $data.infoFormData.roleId == 1 ? {} : $data.infoFormData.roleId == 2 ? {} : $data.infoFormData.roleId == 3 ? {} : $data.infoFormData.roleId == 4 ? {} : {}, {
    f: $data.infoFormData.roleId == 2,
    g: $data.infoFormData.roleId == 3,
    h: $data.infoFormData.roleId == 4,
    i: common_vendor.p({
      type: "medal",
      size: "20",
      color: "#c7c9ce"
    }),
    j: common_vendor.p({
      span: 12
    }),
    k: common_vendor.p({
      type: "email",
      size: "20",
      color: "#f3a73f"
    }),
    l: common_vendor.t($data.infoFormData.account),
    m: common_vendor.p({
      type: "right",
      size: "22",
      color: "#969696"
    }),
    n: common_vendor.p({
      type: "phone",
      size: "20",
      color: "#18bc37"
    }),
    o: common_vendor.t($data.infoFormData.phoneNumber),
    p: common_vendor.p({
      type: "right",
      size: "22",
      color: "#969696"
    }),
    q: common_vendor.p({
      type: "shop",
      size: "20",
      color: "#e43d33"
    }),
    r: common_vendor.t($data.infoFormData.storeName),
    s: common_vendor.p({
      type: "right",
      size: "22",
      color: "#969696"
    }),
    t: common_vendor.p({
      type: "info",
      size: "20",
      color: "#94bcff"
    }),
    v: $data.infoFormData.status == 0
  }, $data.infoFormData.status == 0 ? {} : $data.infoFormData.status == 1 ? {} : {}, {
    w: $data.infoFormData.status == 1,
    x: common_vendor.p({
      type: "right",
      size: "22",
      color: "#969696"
    }),
    y: common_vendor.p({
      type: "scan",
      size: "20",
      color: "#f3a73f"
    }),
    z: common_vendor.p({
      type: "right",
      size: "22",
      color: "#969696"
    }),
    A: common_vendor.p({
      type: "gear",
      size: "20",
      color: "#94bcff"
    }),
    B: common_vendor.p({
      type: "right",
      size: "22",
      color: "#969696"
    }),
    C: common_vendor.p({
      type: "locked",
      size: "20",
      color: "#e43d33"
    }),
    D: common_vendor.p({
      type: "right",
      size: "22",
      color: "#969696"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huanglinna/IdeaProjects/AIbeatuify/uni-app/pages/setting/setting.vue"]]);
wx.createPage(MiniProgramPage);
