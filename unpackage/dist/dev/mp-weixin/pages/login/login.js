"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      loginFormData: {},
      //使用了v-model有自动填充，为数不多的好处
      msgType: "success",
      messageText: "这是一条成功提示"
    };
  },
  methods: {
    //下面是函数和接口的使用，函数你在template用什么名字这里些什么就行，const加不加都行
    //发送请求的标准格式在下面，因为没有二次封装，所以耦合很高
    //要自己读后端返回的code是不是200，底下的succes只是http的code是200而已
    //this.$baseUrl是全局变量，方便联调的时候换真的接口用的，定义在main.js中
    login() {
      console.log(this.loginFormData);
      common_vendor.index.request({
        url: this.$baseUrl + "/users/login",
        method: "POST",
        data: this.loginFormData,
        success: (res) => {
          if (res.data.code == 200) {
            this.msgType = "success";
            this.messageText = res.data.message;
            this.$refs.message.open();
            common_vendor.index.switchTab({
              url: "/pages/home/home"
            });
          } else {
            this.msgType = "error";
            this.messageText = res.data.message;
            this.$refs.message.open();
          }
        },
        fail: (err) => {
          this.msgType = "error";
          this.messageText = err;
          this.$refs.message.open();
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: $data.msgType,
      message: $data.messageText,
      duration: 2e3
    }),
    b: common_vendor.sr("message", "a7ffd516-0"),
    c: common_vendor.p({
      type: "message"
    }),
    d: common_vendor.o(($event) => $data.loginFormData.account = $event),
    e: common_vendor.p({
      placeholder: "请输入账号",
      modelValue: $data.loginFormData.account
    }),
    f: common_vendor.p({
      label: "账号"
    }),
    g: common_vendor.o(($event) => $data.loginFormData.password = $event),
    h: common_vendor.p({
      type: "password",
      placeholder: "请输入密码",
      modelValue: $data.loginFormData.password
    }),
    i: common_vendor.p({
      label: "密码"
    }),
    j: common_vendor.o((...args) => $options.login && $options.login(...args)),
    k: common_vendor.sr("loginForm", "a7ffd516-2"),
    l: common_vendor.p({
      modelValue: $data.loginFormData
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jason/Documents/大三下/软工实训/uni-app/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
