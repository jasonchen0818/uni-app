"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      signUpFormData: {
        account: "",
        password: "",
        checkPassword: "",
        name: "",
        gender: "",
        phone: ""
      },
      active: 0,
      list1: [{
        title: "填写账号密码"
      }, {
        title: "填写身份信息"
      }, {
        title: "填写门店信息"
      }],
      msgType: "success",
      messageText: "这是一条成功提示"
    };
  },
  methods: {
    next() {
      if (this.signUpFormData.password != this.signUpFormData.checkPassword) {
        this.msgType = "error";
        this.messageText = "两次密码输入不一致！";
        this.signUpFormData.password = "";
        this.signUpFormData.checkPassword = "";
        this.$refs.message.open();
      } else {
        this.active = this.active + 1;
      }
    },
    back() {
      this.active = this.active - 1;
    }
  }
};
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_steps2 + _easycom_uni_section2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_steps = () => "../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_steps + _easycom_uni_section + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: $data.msgType,
      message: $data.messageText,
      duration: 2e3
    }),
    b: common_vendor.sr("message", "6a195ea9-0"),
    c: common_vendor.p({
      type: "message"
    }),
    d: common_vendor.p({
      options: $data.list1,
      active: $data.active
    }),
    e: $data.active == 0
  }, $data.active == 0 ? {
    f: common_vendor.p({
      title: "账号",
      type: "line"
    }),
    g: common_vendor.o(($event) => $data.signUpFormData.account = $event),
    h: common_vendor.p({
      prefixIcon: "person",
      placeholder: "请输入账号",
      modelValue: $data.signUpFormData.account
    }),
    i: common_vendor.p({
      title: "密码",
      type: "line"
    }),
    j: common_vendor.o(($event) => $data.signUpFormData.password = $event),
    k: common_vendor.p({
      type: "password",
      prefixIcon: "locked",
      placeholder: "请输入密码",
      modelValue: $data.signUpFormData.password
    }),
    l: common_vendor.p({
      title: "确认密码",
      type: "line"
    }),
    m: common_vendor.o(($event) => $data.signUpFormData.checkPassword = $event),
    n: common_vendor.p({
      type: "password",
      prefixIcon: "locked",
      placeholder: "确认密码",
      modelValue: $data.signUpFormData.checkPassword
    }),
    o: common_vendor.o((...args) => $options.next && $options.next(...args)),
    p: common_vendor.sr("signUpForm", "6a195ea9-4"),
    q: common_vendor.p({
      modelValue: $data.signUpFormData
    })
  } : {}, {
    r: $data.active == 1
  }, $data.active == 1 ? {
    s: common_vendor.p({
      title: "姓名",
      type: "line"
    }),
    t: common_vendor.o(($event) => $data.signUpFormData.name = $event),
    v: common_vendor.p({
      prefixIcon: "person",
      placeholder: "真实姓名",
      modelValue: $data.signUpFormData.name
    }),
    w: common_vendor.p({
      title: "性别",
      type: "line"
    }),
    x: common_vendor.o(($event) => $data.signUpFormData.gender = $event),
    y: common_vendor.p({
      prefixIcon: "person",
      placeholder: "性别",
      modelValue: $data.signUpFormData.gender
    }),
    z: common_vendor.p({
      title: "电话号码",
      type: "line"
    }),
    A: common_vendor.o(($event) => $data.signUpFormData.phone = $event),
    B: common_vendor.p({
      prefixIcon: "phone",
      placeholder: "电话号码",
      modelValue: $data.signUpFormData.phone
    }),
    C: common_vendor.o((...args) => $options.back && $options.back(...args)),
    D: common_vendor.o((...args) => $options.next && $options.next(...args)),
    E: common_vendor.sr("signUpForm", "6a195ea9-15"),
    F: common_vendor.p({
      modelValue: $data.signUpFormData
    })
  } : {}, {
    G: $data.active == 2
  }, $data.active == 2 ? {
    H: common_vendor.o((...args) => $options.back && $options.back(...args)),
    I: common_vendor.sr("signUpForm", "6a195ea9-26"),
    J: common_vendor.p({
      modelValue: $data.signUpFormData
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huanglinna/IdeaProjects/AIbeatuify/uni-app/pages/sign_up/sign_up.vue"]]);
wx.createPage(MiniProgramPage);
