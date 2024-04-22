"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      signUpFormData: {},
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
  methods: {
    next() {
      this.active = this.active + 1;
    },
    back() {
      this.active = this.active - 1;
    }
  }
};
if (!Array) {
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_steps2 + _easycom_uni_section2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_steps = () => "../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_steps + _easycom_uni_section + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      options: $data.list1,
      active: $data.active
    }),
    b: $data.active == 0
  }, $data.active == 0 ? {
    c: common_vendor.p({
      title: "账号",
      type: "line"
    }),
    d: common_vendor.o(($event) => $data.signUpFormData.account = $event),
    e: common_vendor.p({
      prefixIcon: "person",
      placeholder: "请输入账号",
      modelValue: $data.signUpFormData.account
    }),
    f: common_vendor.p({
      title: "密码",
      type: "line"
    }),
    g: common_vendor.o(($event) => $data.signUpFormData.password = $event),
    h: common_vendor.p({
      type: "password",
      prefixIcon: "locked",
      placeholder: "请输入密码",
      modelValue: $data.signUpFormData.password
    }),
    i: common_vendor.o((...args) => $options.next && $options.next(...args)),
    j: common_vendor.sr("signUpForm", "8feeb846-2"),
    k: common_vendor.p({
      modelValue: $data.signUpFormData
    })
  } : {}, {
    l: $data.active == 1
  }, $data.active == 1 ? {
    m: common_vendor.p({
      title: "姓名",
      type: "line"
    }),
    n: common_vendor.o(($event) => $data.signUpFormData.name = $event),
    o: common_vendor.p({
      prefixIcon: "person",
      placeholder: "真实姓名",
      modelValue: $data.signUpFormData.name
    }),
    p: common_vendor.p({
      title: "性别",
      type: "line"
    }),
    q: common_vendor.o(($event) => $data.signUpFormData.gender = $event),
    r: common_vendor.p({
      type: "password",
      prefixIcon: "locked",
      placeholder: "性别",
      modelValue: $data.signUpFormData.gender
    }),
    s: common_vendor.p({
      title: "电话号码",
      type: "line"
    }),
    t: common_vendor.o(($event) => $data.signUpFormData.phone = $event),
    v: common_vendor.p({
      type: "password",
      prefixIcon: "locked",
      placeholder: "电话号码",
      modelValue: $data.signUpFormData.phone
    }),
    w: common_vendor.o((...args) => $options.back && $options.back(...args)),
    x: common_vendor.o((...args) => $options.next && $options.next(...args)),
    y: common_vendor.sr("signUpForm", "8feeb846-10"),
    z: common_vendor.p({
      modelValue: $data.signUpFormData
    })
  } : {}, {
    A: $data.active == 2
  }, $data.active == 2 ? {
    B: common_vendor.o((...args) => $options.back && $options.back(...args)),
    C: common_vendor.sr("signUpForm", "8feeb846-21"),
    D: common_vendor.p({
      modelValue: $data.signUpFormData
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jason/Documents/大三下/软工实训/uni-app/pages/sign_up/sign_up.vue"]]);
wx.createPage(MiniProgramPage);
