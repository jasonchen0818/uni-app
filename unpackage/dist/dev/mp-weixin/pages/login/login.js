"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      loginFormData: {
        account: "admin",
        password: "admin"
      },
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
    //底下登录展示了没有header时登录的情况，不使用二次封装，二次封装的用法更简单，
    //可在setting中看我直接写好的request函数
    login() {
      common_vendor.index.request({
        url: this.$baseUrl + "/users/login",
        method: "POST",
        data: this.loginFormData,
        success: (res) => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            try {
              common_vendor.index.setStorageSync("token", res.data.data.token);
            } catch (err) {
              console.log(err);
            }
            this.msgType = "success";
            this.messageText = res.data.message;
            this.$refs.message.open();
            common_vendor.index.switchTab({
              url: "/pages/goods/goods"
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
    },
    sign_up() {
      common_vendor.index.navigateTo({
        url: "/pages/sign_up/sign_up"
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
    b: common_vendor.sr("message", "2dd61641-0"),
    c: common_vendor.p({
      type: "message"
    }),
    d: common_vendor.o(($event) => $data.loginFormData.account = $event),
    e: common_vendor.p({
      prefixIcon: "person",
      placeholder: "请输入账号",
      modelValue: $data.loginFormData.account
    }),
    f: common_vendor.o(($event) => $data.loginFormData.password = $event),
    g: common_vendor.p({
      type: "password",
      prefixIcon: "locked",
      placeholder: "请输入密码",
      modelValue: $data.loginFormData.password
    }),
    h: common_vendor.o((...args) => $options.login && $options.login(...args)),
    i: common_vendor.o((...args) => $options.sign_up && $options.sign_up(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huanglinna/IdeaProjects/AIbeatuify/uni-app/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
