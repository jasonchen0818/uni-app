"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      categories: [],
      selectedCategory: null,
      goods: [],
      totalPrice: "0"
    };
  },
  mounted() {
    this.loadCategories();
    this.loadGoods();
  },
  methods: {
    loadCategories() {
      common_vendor.index.request({
        url: "http://127.0.0.1:4523/m2/4177433-0-default/171989370",
        method: "GET",
        success: (res) => {
          console.log(res);
          this.categories = res.data.categories;
        },
        fail: (err) => {
          console.error("加载分类数据失败", err);
        }
      });
    },
    loadGoods() {
      common_vendor.index.request({
        url: "http://127.0.0.1:4523/m1/4177433-0-default/goods/list",
        method: "GET",
        success: (res) => {
          console.log(res);
          this.goods = res.data.goods;
        },
        fail: (err) => {
          console.error("加载分类数据失败", err);
        },
        complete: () => {
          this.renderCategoriesAndGoods();
        }
      });
    },
    renderCategoriesAndGoods() {
      this.categories.forEach((category) => category.goods = []);
      this.goods.forEach((good) => {
        const category = this.categories.find((category2) => category2.id === good.category_id);
        if (category) {
          category.goods.push(good);
        }
      });
    },
    selectCategory(category) {
      this.categories.forEach((cat) => cat.hasBorderBottomRightRadius = false);
      this.selectedCategory = category;
      const selectedIndex = this.categories.findIndex((c) => c === category);
      if (selectedIndex > 0) {
        this.categories[selectedIndex - 1].hasBorderBottomRightRadius = true;
      }
    },
    addToCart(good) {
      console.log("添加商品到购物车:", good);
    }
  }
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
    a: common_vendor.p({
      size: "24",
      type: "search"
    }),
    b: common_vendor.f($data.categories, (category, index, i0) => {
      return {
        a: common_vendor.t(category.name),
        b: index,
        c: $data.selectedCategory === category ? 1 : "",
        d: category.hasBorderBottomRightRadius ? 1 : "",
        e: common_vendor.o(($event) => $options.selectCategory(category), index)
      };
    }),
    c: common_vendor.f($data.categories, (category, catIndex, i0) => {
      return {
        a: common_vendor.t(category.name),
        b: common_vendor.f(category.goods, (good, index, i1) => {
          return {
            a: good.image,
            b: common_vendor.t(good.title),
            c: common_vendor.t(good.tag),
            d: common_vendor.t(good.intro),
            e: common_vendor.t(good.price),
            f: index
          };
        }),
        c: catIndex
      };
    }),
    d: common_vendor.t($data.totalPrice)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huanglinna/IdeaProjects/AIbeatuify/uni-app/pages/goods/goods.vue"]]);
wx.createPage(MiniProgramPage);
