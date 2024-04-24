"use strict";
const common_vendor = require("../../common/vendor.js");
const MyListItem = () => "../../components/my-list-item.js";
const _sfc_main = {
  components: {
    MyListItem
  },
  data() {
    return {
      list: [
        {
          letter: "A",
          data: [
            {
              imgUrl: "",
              title: "阿巴阿巴"
            },
            {
              imgUrl: "",
              title: "阿克苏"
            },
            {
              imgUrl: "",
              title: "阿里巴巴"
            },
            {
              imgUrl: "",
              title: "啊我的眼睛"
            }
          ]
        },
        {
          letter: "B",
          data: [
            {
              imgUrl: "",
              title: "八嘎"
            },
            {
              imgUrl: "",
              title: "霸道的力量"
            },
            {
              imgUrl: "",
              title: "北京彭于晏"
            },
            {
              imgUrl: "",
              title: "保山汉尼拔"
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _component_my_list_item = common_vendor.resolveComponent("my-list-item");
  (_easycom_uni_icons2 + _easycom_uni_search_bar2 + _component_my_list_item)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_search_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      color: "#999999",
      size: "18",
      type: "home"
    }),
    b: common_vendor.o(_ctx.search),
    c: common_vendor.o(_ctx.cancel),
    d: common_vendor.p({
      placeholder: "搜索客户姓名/电话",
      ["cancel-text"]: "取消"
    }),
    e: common_vendor.p({
      imgUrl: "./../static/image/customer-add-fill.png",
      title: "新增客户"
    }),
    f: common_vendor.p({
      imgUrl: "./../static/image/discount-fill.png",
      title: "标签"
    }),
    g: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: item.data.length
      }, item.data.length ? {
        b: common_vendor.t(item.letter)
      } : {}, {
        c: common_vendor.f(item.data, (item2, index2, i1) => {
          return {
            a: index2,
            b: "54b9c413-4-" + i0 + "-" + i1,
            c: common_vendor.p({
              imgUrl: "./../static/image/customer-add-fill.png",
              title: item2.title
            })
          };
        }),
        d: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Jason/Documents/大三下/软工实训/uni-app/pages/guest/guest.vue"]]);
wx.createPage(MiniProgramPage);
